/**
 * Study-content analytics — PostHog (queryable events) + Microsoft Clarity (heatmaps/recordings)
 *
 * Tracks per subject site (SPA):
 * - Virtual pages: /home, /lectures/{id}, /dawrat/{id}, /notes/{id}
 * - Focused minutes: visible tab + user activity (scroll/click/key), idle after 2 min
 * - Scroll milestones: 25 / 50 / 75 / 100 % of content scroll depth
 *
 * PostHog: every event carries full context as properties (HogQL-queryable).
 * Clarity: same signals as custom tags + events (session replay / filters UI).
 */

const IDLE_TIMEOUT_MS = 2 * 60 * 1000;
const SCROLL_MILESTONES = [25, 50, 75, 100];
const DEFAULT_POSTHOG_HOST = 'https://eu.i.posthog.com';

/** Minimum signals for a session to count as "studying" rather than "watching". */
const STUDIER_MIN_ACTIVE_SECONDS = 30;
const STUDIER_MIN_SCROLL_PCT = 40;
const RETURN_VISIT_STORAGE_KEY = 'sg_visit_meta_v1';

/**
 * Words/minute used to estimate expected reading time for Arabic/mixed academic text.
 * Deliberately conservative (slower than casual-reading averages) since lecture content
 * includes formulas, code, and diagrams that slow real reading down.
 */
const READING_WORDS_PER_MINUTE = 130;
/** A lecture is "meaningfully opened" (counts toward subject coverage) above this active time. */
const MEANINGFUL_OPEN_SECONDS = 60;

/** @type {{ subjectName: string, storagePrefix: string } | null} */
let context = null;

/** @type {StudySession | null} */
let activeSession = null;

/** @type {boolean} */
let posthogReady = false;

/** @type {((event: string, props?: Record<string, unknown>) => void) | null} */
let captureImpl = null;

/** Inject a capture sink (tests). Pass null to restore default. */
export function __setCaptureForTests(fn) {
  captureImpl = fn;
}

export function detectSiteEnv(hostname = typeof location !== 'undefined' ? location.hostname : '') {
  if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1') return 'local';
  if (hostname.includes('netlify')) return 'sandbox';
  return 'production';
}

/**
 * @param {'home' | 'lecture' | 'dawrat' | 'note'} contentType
 * @param {string} contentId
 */
export function contentIdsForType(contentType, contentId) {
  return {
    lecture: contentType === 'lecture' ? contentId : 'none',
    dawrat: contentType === 'dawrat' ? contentId : 'none',
    note: contentType === 'note' ? contentId : 'none',
  };
}

/**
 * @param {{
 *   subjectName?: string,
 *   storagePrefix?: string,
 *   page: string,
 *   contentType: string,
 *   contentId: string,
 *   siteEnv?: string,
 * }} opts
 */
export function buildBaseProps(opts) {
  const contentType = opts.contentType || 'home';
  const contentId = opts.contentId || 'home';
  const ids =
    contentType === 'lecture' || contentType === 'dawrat' || contentType === 'note'
      ? contentIdsForType(contentType, contentId)
      : { lecture: 'none', dawrat: 'none', note: 'none' };
  return {
    subject: opts.subjectName || '',
    storage_prefix: opts.storagePrefix || 'study-guide',
    site_env: opts.siteEnv || detectSiteEnv(),
    page: opts.page,
    content_type: contentType,
    content_id: contentId,
    ...ids,
  };
}

/**
 * @param {ReturnType<typeof buildBaseProps>} base
 * @param {{
 *   activeSeconds: number,
 *   maxScrollPct: number,
 *   exitScrollPct?: number,
 *   exitReason?: string,
 *   interactionCount?: number,
 *   engagementLevel?: string,
 *   wordCount?: number,
 *   expectedReadSeconds?: number,
 *   readingPaceRatio?: number,
 *   meaningfulOpen?: boolean,
 * }} session
 */
export function buildSessionEndProps(base, session) {
  return {
    ...base,
    active_seconds: session.activeSeconds,
    max_scroll_pct: session.maxScrollPct,
    ...(session.exitScrollPct != null ? { exit_scroll_pct: session.exitScrollPct } : {}),
    ...(session.exitReason ? { exit_reason: session.exitReason } : {}),
    ...(session.interactionCount != null ? { interaction_count: session.interactionCount } : {}),
    ...(session.engagementLevel ? { engagement_level: session.engagementLevel } : {}),
    ...(session.wordCount != null ? { content_word_count: session.wordCount } : {}),
    ...(session.expectedReadSeconds != null ? { expected_read_seconds: session.expectedReadSeconds } : {}),
    ...(session.readingPaceRatio != null ? { reading_pace_ratio: session.readingPaceRatio } : {}),
    ...(session.meaningfulOpen != null ? { meaningful_open: session.meaningfulOpen } : {}),
  };
}

/**
 * Classify a content session as "studier" (meaningfully engaged) or "watcher"
 * (opened content but barely engaged with it).
 * Pure function — no globals — for easy testing and reuse.
 *
 * @param {{ activeSeconds: number, maxScrollPct: number, interactionCount: number }} signals
 * @returns {'studier' | 'watcher'}
 */
export function classifyEngagement({ activeSeconds, maxScrollPct, interactionCount }) {
  const hasEnoughFocus = (activeSeconds || 0) >= STUDIER_MIN_ACTIVE_SECONDS;
  const hasEnoughScroll = (maxScrollPct || 0) >= STUDIER_MIN_SCROLL_PCT;
  const hasInteracted = (interactionCount || 0) > 0;
  return hasEnoughFocus && (hasEnoughScroll || hasInteracted) ? 'studier' : 'watcher';
}

/**
 * Estimate expected reading time (seconds) for a block of content from its word count.
 * Pure function — used both live (word count measured from the rendered DOM) and in tests.
 *
 * @param {number} wordCount
 * @returns {number} expected reading time in seconds
 */
export function estimateReadSeconds(wordCount) {
  if (!wordCount || wordCount <= 0) return 0;
  return Math.round((wordCount / READING_WORDS_PER_MINUTE) * 60);
}

/**
 * Compare actual active time against expected reading time to sanity-check whether a
 * session looks like real reading (pace near or above expected) vs. a fly-by (active time
 * far below what the content would take to read).
 * Pure function — no globals.
 *
 * @param {{ activeSeconds: number, expectedReadSeconds: number }} signals
 * @returns {number} ratio of active time to expected read time (0 when expected is unknown)
 */
export function computeReadingPaceRatio({ activeSeconds, expectedReadSeconds }) {
  if (!expectedReadSeconds || expectedReadSeconds <= 0) return 0;
  return Math.round(((activeSeconds || 0) / expectedReadSeconds) * 100) / 100;
}

/**
 * Compute return-visit metadata from a stored first-seen timestamp + visit count.
 * Pure function operating on plain values (no localStorage access) for testability.
 *
 * @param {{ firstSeenAt: number | null, visitCount: number | null }} stored
 * @param {number} now
 * @returns {{ firstSeenAt: number, visitCount: number, daysSinceFirstSeen: number, isReturning: boolean }}
 */
export function computeReturnVisitMeta(stored, now) {
  const firstSeenAt = stored?.firstSeenAt || now;
  const visitCount = (stored?.visitCount || 0) + 1;
  const daysSinceFirstSeen = Math.max(0, Math.floor((now - firstSeenAt) / (24 * 60 * 60 * 1000)));
  return {
    firstSeenAt,
    visitCount,
    daysSinceFirstSeen,
    isReturning: visitCount > 1,
  };
}

/**
 * Map PostHog event names → Clarity custom event names (keeps existing Clarity filters working).
 * @param {string} event
 * @param {Record<string, unknown>} props
 */
export function clarityEventNameFor(event, props = {}) {
  const type = String(props.content_type || 'content');
  if (event === 'scroll_milestone') return `scroll_${props.milestone_pct}`;
  if (event === 'study_idle') return `${type}_idle`;
  if (event === 'study_session_end') return `${type}_session_end`;
  if (event === 'focus_milestone') return `${type}_focus_${props.focus_minutes}min`;
  if (event === 'hub_pageview' || event === 'hub_subject_click') return event;
  if (event === '$pageview' || event === 'content_viewed') return null;
  // UX events (mcq, search, exam, …) — same name in Clarity
  if (typeof event === 'string' && event && !event.startsWith('$')) return event;
  return null;
}

/**
 * Rough word count for mixed Arabic/English/number text. Splits on whitespace, which is a
 * reasonable approximation for both scripts since Arabic word-separation is space-based.
 * @param {string} text
 */
export function countWords(text) {
  if (!text) return 0;
  const trimmed = String(text).trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function virtualPath(segment) {
  const prefix = context?.storagePrefix || 'study-guide';
  const base = `/${prefix}`;
  if (!segment || segment === 'home') return `${base}/home`;
  return `${base}/${segment.replace(/^\//, '')}`;
}

function readMeta(name) {
  if (typeof document === 'undefined') return '';
  const el = document.querySelector(`meta[name="${name}"]`);
  return (el?.getAttribute('content') || '').trim();
}

function posthogAvailable() {
  return typeof window !== 'undefined' && typeof window.posthog?.capture === 'function';
}

function clarityAvailable() {
  return typeof window !== 'undefined' && typeof window.clarity === 'function';
}

function clarityCall(...args) {
  if (!clarityAvailable()) return;
  try {
    window.clarity(...args);
  } catch {
    /* ignore */
  }
}

function claritySet(key, value) {
  if (value == null || value === '') return;
  clarityCall('set', key, String(value));
}

/** Push tags + mapped event to Clarity (best-effort; never throws). */
function mirrorToClarity(event, props = {}) {
  const tagKeys = [
    'subject',
    'content_type',
    'content_id',
    'lecture',
    'dawrat',
    'note',
    'active_seconds',
    'max_scroll_pct',
    'site_env',
    'storage_prefix',
    'subject_id',
    'year',
  ];
  for (const key of tagKeys) {
    if (props[key] != null && props[key] !== '') claritySet(key, props[key]);
  }
  // Booleans / numbers commonly used on UX events
  for (const key of [
    'is_correct', 'completed', 'has_results', 'enabled', 'is_subsection',
    'query_len', 'result_count', 'question_count', 'correct_count', 'wrong_count',
    'percent', 'elapsed_seconds', 'subject_percent', 'rank',
  ]) {
    if (props[key] != null && props[key] !== '') claritySet(key, props[key]);
  }
  if (props.page) clarityCall('set', 'page', String(props.page));

  const clarityEvent = clarityEventNameFor(event, props);
  if (clarityEvent) clarityCall('event', clarityEvent);
}

function capture(event, props = {}) {
  if (captureImpl) {
    try {
      captureImpl(event, props);
    } catch {
      /* ignore */
    }
    return;
  }
  try {
    if (posthogAvailable()) window.posthog.capture(event, props);
  } catch {
    /* ignore analytics errors */
  }
  mirrorToClarity(event, props);
}

function currentBase(page, contentType, contentId) {
  return buildBaseProps({
    subjectName: context?.subjectName || '',
    storagePrefix: context?.storagePrefix || 'study-guide',
    page,
    contentType,
    contentId,
  });
}

function loadPosthogSnippet(apiKey, apiHost) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      resolve(false);
      return;
    }
    if (window.posthog?.__loaded || window.posthog?.capture) {
      resolve(true);
      return;
    }

    /* PostHog array.js stub loader (official snippet, condensed) */
    (function (t, e) {
      if (e.__SV) return;
      window.posthog = e;
      e._i = [];
      e.init = function (i, s, a) {
        function g(u, n) {
          const o = n.split('.');
          if (o.length === 2) {
            u = u[o[0]];
            n = o[1];
          }
          u[n] = function () {
            u.push([n].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }
        const p = t.createElement('script');
        p.type = 'text/javascript';
        p.async = true;
        p.src = `${s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com')}/static/array.js`;
        p.onerror = () => reject(new Error('PostHog script failed to load'));
        const r = t.getElementsByTagName('script')[0];
        r.parentNode.insertBefore(p, r);
        const u = a !== undefined ? (e[a] = []) : ((a = 'posthog'), e);
        u.people = u.people || [];
        u.toString = function (t2) {
          let x = 'posthog';
          if (a !== 'posthog') x += `.${a}`;
          if (!t2) x += ' (stub)';
          return x;
        };
        u.people.toString = function () {
          return `${u.toString(1)}.people (stub)`;
        };
        const methods =
          'init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getSurveys getActiveMatchingSurveys identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id captureException set_config on'.split(
            ' ',
          );
        for (let n = 0; n < methods.length; n++) g(u, methods[n]);
        e._i.push([i, s, a]);
      };
      e.__SV = 1;
    })(document, window.posthog || []);

    try {
      window.posthog.init(apiKey, {
        api_host: apiHost,
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        persistence: 'localStorage+cookie',
        session_recording: { maskAllInputs: true },
        capture_exceptions: true,
        capture_dead_clicks: true,
        rageclick: true,
        loaded: () => resolve(true),
      });
      // Fallback if loaded callback is slow / already ready
      setTimeout(() => resolve(true), 1500);
    } catch (err) {
      reject(err);
    }
  });
}

async function ensurePosthog() {
  if (posthogReady) return true;
  const key = readMeta('posthog-key');
  if (!key || key.startsWith('__POSTHOG')) return false;
  const host = readMeta('posthog-host') || DEFAULT_POSTHOG_HOST;
  try {
    await loadPosthogSnippet(key, host);
    posthogReady = true;
    installGlobalErrorHandlers();
    return true;
  } catch {
    return false;
  }
}

let globalErrorHandlersInstalled = false;

/** Best-effort: forward uncaught errors / rejections to PostHog error tracking. */
function installGlobalErrorHandlers() {
  if (globalErrorHandlersInstalled || typeof window === 'undefined') return;
  globalErrorHandlersInstalled = true;

  window.addEventListener('error', (event) => {
    if (!posthogAvailable() || typeof window.posthog.captureException !== 'function') return;
    try {
      const err = event?.error instanceof Error ? event.error : new Error(String(event?.message || 'Unknown error'));
      window.posthog.captureException(err, { ...getActiveContextProps(), source: 'window_onerror' });
    } catch {
      /* ignore */
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (!posthogAvailable() || typeof window.posthog.captureException !== 'function') return;
    try {
      const reason = event?.reason instanceof Error ? event.reason : new Error(String(event?.reason || 'Unhandled rejection'));
      window.posthog.captureException(reason, { ...getActiveContextProps(), source: 'unhandled_rejection' });
    } catch {
      /* ignore */
    }
  });
}

function registerSuperProps() {
  if (!posthogAvailable()) return;
  try {
    window.posthog.register({
      subject: context?.subjectName || '',
      storage_prefix: context?.storagePrefix || 'study-guide',
      site_env: detectSiteEnv(),
    });
  } catch {
    /* ignore */
  }
}

/** Read/update first-seen + visit-count in localStorage; returns computed meta or null. */
function trackReturnVisit() {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const now = Date.now();
    const raw = window.localStorage.getItem(RETURN_VISIT_STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) : null;
    const meta = computeReturnVisitMeta(stored, now);
    window.localStorage.setItem(
      RETURN_VISIT_STORAGE_KEY,
      JSON.stringify({ firstSeenAt: meta.firstSeenAt, visitCount: meta.visitCount, lastSeenAt: now }),
    );
    return meta;
  } catch {
    return null;
  }
}

/** Register return-visit super properties + person properties on PostHog (best-effort). */
function registerReturnVisitProps(meta) {
  if (!meta || !posthogAvailable()) return;
  try {
    window.posthog.register({
      is_returning_visitor: meta.isReturning,
      visit_count: meta.visitCount,
      days_since_first_seen: meta.daysSinceFirstSeen,
    });
    if (typeof window.posthog.setPersonProperties === 'function') {
      window.posthog.setPersonProperties({
        visit_count: meta.visitCount,
        days_since_first_seen: meta.daysSinceFirstSeen,
        is_returning_visitor: meta.isReturning,
      });
    }
  } catch {
    /* ignore */
  }
}

class StudySession {
  /**
   * @param {'lecture' | 'dawrat' | 'note'} contentType
   * @param {string} contentId
   * @param {string} pageSegment
   */
  constructor(contentType, contentId, pageSegment) {
    this.contentType = contentType;
    this.contentId = contentId;
    this.page = virtualPath(pageSegment);
    this.activeMs = 0;
    this.lastTickAt = null;
    this.isVisible = document.visibilityState === 'visible';
    this.isIdle = false;
    this.idleTimer = null;
    /** @type {Set<number>} */
    this.milestonesHit = new Set();
    this.scrollRoot = null;
    this.interactionCount = 0;
    this.ended = false;
    this.wordCount = 0;

    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    this.onActivity = this.onActivity.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onPageHide = this.onPageHide.bind(this);
    this.onInteraction = this.onInteraction.bind(this);
  }

  baseProps() {
    return currentBase(this.page, this.contentType, this.contentId);
  }

  begin() {
    const props = this.baseProps();
    capture('$pageview', props);
    capture('content_viewed', props);

    this.resumeTicking();
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    document.addEventListener('click', this.onInteraction, { passive: true });
    document.addEventListener('keydown', this.onInteraction, { passive: true });
    document.addEventListener('touchstart', this.onActivity, { passive: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('pagehide', this.onPageHide);
    this.resetIdleTimer();
    requestAnimationFrame(() => this.checkScrollMilestones());
  }

  /** Real content interaction: click / keydown within the session, or an explicit UX event. */
  onInteraction() {
    this.interactionCount += 1;
    this.onActivity();
  }

  /** Called by trackUxEvent for meaningful UX actions (mcq, toc, search, …) tied to this session. */
  noteMeaningfulInteraction() {
    this.interactionCount += 1;
  }

  /** Call after lecture HTML is in #content */
  attachContentRoot() {
    this.scrollRoot = document.getElementById('content');
    this.wordCount = countWords(this.scrollRoot?.textContent || '');
    requestAnimationFrame(() => this.checkScrollMilestones());
  }

  onVisibilityChange() {
    const visible = document.visibilityState === 'visible';
    if (visible && !this.isVisible) {
      this.isVisible = true;
      if (!this.isIdle) this.resumeTicking();
      this.resetIdleTimer();
    } else if (!visible && this.isVisible) {
      this.isVisible = false;
      this.pauseTicking();
      clearTimeout(this.idleTimer);
    }
  }

  onActivity() {
    if (this.isIdle) {
      this.isIdle = false;
      if (this.isVisible) this.resumeTicking();
    }
    this.resetIdleTimer();
  }

  onScroll() {
    this.onActivity();
    this.checkScrollMilestones();
  }

  resetIdleTimer() {
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      this.isIdle = true;
      this.pauseTicking();
      capture('study_idle', {
        ...this.baseProps(),
        idle_after_seconds: Math.round(IDLE_TIMEOUT_MS / 1000),
      });
    }, IDLE_TIMEOUT_MS);
  }

  resumeTicking() {
    if (!this.isVisible || this.isIdle) return;
    if (this.lastTickAt == null) this.lastTickAt = Date.now();
  }

  pauseTicking() {
    if (this.lastTickAt == null) return;
    this.activeMs += Date.now() - this.lastTickAt;
    this.lastTickAt = null;
  }

  getActiveSeconds() {
    let total = this.activeMs;
    if (this.lastTickAt != null && this.isVisible && !this.isIdle) {
      total += Date.now() - this.lastTickAt;
    }
    return Math.max(0, Math.round(total / 1000));
  }

  checkScrollMilestones() {
    const depth = this.readScrollDepth();
    if (depth <= 0) return;

    for (const milestone of SCROLL_MILESTONES) {
      if (depth < milestone || this.milestonesHit.has(milestone)) continue;
      this.milestonesHit.add(milestone);
      capture('scroll_milestone', {
        ...this.baseProps(),
        milestone_pct: milestone,
      });
    }
  }

  readScrollDepth() {
    const doc = document.documentElement;
    const scrollHeight = Math.max(
      doc.scrollHeight,
      document.body?.scrollHeight || 0,
      this.scrollRoot?.scrollHeight || 0,
    );
    const viewport = window.innerHeight || doc.clientHeight;
    const maxScroll = scrollHeight - viewport;
    if (maxScroll <= 0) return 100;
    const y = window.scrollY || doc.scrollTop || 0;
    return Math.min(100, Math.round((y / maxScroll) * 100));
  }

  onPageHide() {
    this.end('tab_closed');
  }

  /**
   * @param {'navigated_away' | 'tab_closed' | 'idle_timeout'} [reason]
   */
  end(reason = 'navigated_away') {
    if (this.ended) return;
    this.ended = true;

    const exitReason = this.isIdle ? 'idle_timeout' : reason;
    const exitScrollPct = this.readScrollDepth();

    this.pauseTicking();
    clearTimeout(this.idleTimer);

    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    document.removeEventListener('click', this.onInteraction);
    document.removeEventListener('keydown', this.onInteraction);
    document.removeEventListener('touchstart', this.onActivity);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('pagehide', this.onPageHide);

    const seconds = this.getActiveSeconds();
    const maxScroll = this.milestonesHit.size
      ? Math.max(...this.milestonesHit)
      : 0;
    const engagementLevel = classifyEngagement({
      activeSeconds: seconds,
      maxScrollPct: maxScroll,
      interactionCount: this.interactionCount,
    });
    const expectedReadSeconds = estimateReadSeconds(this.wordCount);
    const readingPaceRatio = computeReadingPaceRatio({
      activeSeconds: seconds,
      expectedReadSeconds,
    });
    const meaningfulOpen = seconds >= MEANINGFUL_OPEN_SECONDS;

    const endProps = buildSessionEndProps(this.baseProps(), {
      activeSeconds: seconds,
      maxScrollPct: maxScroll,
      exitScrollPct,
      exitReason,
      interactionCount: this.interactionCount,
      engagementLevel,
      wordCount: this.wordCount,
      expectedReadSeconds,
      readingPaceRatio,
      meaningfulOpen,
    });
    capture('study_session_end', endProps);

    for (const minutes of [1, 5, 15]) {
      if (seconds >= minutes * 60) {
        capture('focus_milestone', {
          ...this.baseProps(),
          focus_minutes: minutes,
          active_seconds: seconds,
        });
      }
    }
  }
}

function endActiveSession() {
  if (!activeSession) return;
  activeSession.end();
  activeSession = null;
}

/**
 * @param {{ subjectName?: string, storagePrefix?: string }} options
 */
export function initAnalytics(options = {}) {
  context = {
    subjectName: options.subjectName || '',
    storagePrefix: options.storagePrefix || 'study-guide',
  };
  window.addEventListener('pagehide', endActiveSession);

  const visitMeta = trackReturnVisit();

  ensurePosthog().then((ok) => {
    if (ok) {
      registerSuperProps();
      registerReturnVisitProps(visitMeta);
    }
  });
}

export function trackHomeView() {
  endActiveSession();
  const page = virtualPath('home');
  const props = currentBase(page, 'home', 'home');
  capture('$pageview', props);
  capture('content_viewed', props);
}

/**
 * @param {{ lec: { id: string } }} item
 */
export function trackLectureView(item) {
  if (!item?.lec?.id) return;
  endActiveSession();
  activeSession = new StudySession('lecture', item.lec.id, `lectures/${item.lec.id}`);
  activeSession.begin();
}

/** @param {{ exam: { id: string } }} item */
export function trackDawratView(item) {
  if (!item?.exam?.id) return;
  endActiveSession();
  activeSession = new StudySession('dawrat', item.exam.id, `dawrat/${item.exam.id}`);
  activeSession.begin();
}

/** @param {{ lec: { id: string } }} item */
export function trackNoteView(item) {
  if (!item?.lec?.id) return;
  endActiveSession();
  activeSession = new StudySession('note', item.lec.id, `notes/${item.lec.id}`);
  activeSession.begin();
}

export function trackLectureContentReady() {
  activeSession?.attachContentRoot();
}

export function updateAnalyticsContext(patch) {
  context = { ...(context || { subjectName: '', storagePrefix: 'study-guide' }), ...patch };
  registerSuperProps();
}

/** Props for the current study context (active session or home). */
export function getActiveContextProps() {
  if (activeSession) return activeSession.baseProps();
  return currentBase(virtualPath('home'), 'home', 'home');
}

/** UX events that indicate real studying, not just passive viewing. */
const MEANINGFUL_UX_EVENTS = new Set([
  'mcq_answered',
  'toc_navigated',
  'jump_to_summary',
  'expand_original_toggled',
  'search_performed',
  'search_result_clicked',
  'lecture_progress_toggled',
  'exam_started',
  'exam_finished',
]);

/**
 * Fire a UX event with full study context merged in.
 * @param {string} event
 * @param {Record<string, unknown>} [extra]
 */
export function trackUxEvent(event, extra = {}) {
  if (MEANINGFUL_UX_EVENTS.has(event)) activeSession?.noteMeaningfulInteraction();
  capture(event, { ...getActiveContextProps(), ...extra });
}

/**
 * @param {{ qid?: string, isCorrect: boolean, source?: string, pickedKey?: string, cardId?: string }} detail
 */
export function trackMcqAnswered(detail) {
  trackUxEvent('mcq_answered', {
    qid: detail.qid || detail.cardId || '',
    is_correct: !!detail.isCorrect,
    source: detail.source || 'lecture',
    picked_key: detail.pickedKey || '',
  });
}

/** Practice exam view opened (setup / mistakes bank). */
export function trackExamModeOpened(mode = 'exam') {
  endActiveSession();
  const page = virtualPath(`exam/${mode}`);
  const props = currentBase(page, 'exam', mode);
  capture('$pageview', props);
  capture('content_viewed', props);
  capture('exam_mode_opened', { ...props, exam_mode: mode });
}

/**
 * @param {{ mode: string, questionCount: number, lectureCount: number }} info
 */
export function trackExamStarted(info) {
  trackUxEvent('exam_started', {
    content_type: 'exam',
    content_id: info.mode || 'exam',
    exam_mode: info.mode || 'exam',
    question_count: Number(info.questionCount) || 0,
    lecture_count: Number(info.lectureCount) || 0,
  });
}

/**
 * @param {{
 *   mode: string,
 *   total: number,
 *   correctCount: number,
 *   wrongCount: number,
 *   unansweredCount: number,
 *   percent: number,
 *   elapsedSeconds: number,
 * }} info
 */
export function trackExamFinished(info) {
  trackUxEvent('exam_finished', {
    content_type: 'exam',
    content_id: info.mode || 'exam',
    exam_mode: info.mode || 'exam',
    question_count: Number(info.total) || 0,
    correct_count: Number(info.correctCount) || 0,
    wrong_count: Number(info.wrongCount) || 0,
    unanswered_count: Number(info.unansweredCount) || 0,
    percent: Number(info.percent) || 0,
    elapsed_seconds: Number(info.elapsedSeconds) || 0,
  });
}

/**
 * @param {{ lectureId: string, completed: boolean, source?: string, subjectPercent?: number }} info
 */
export function trackLectureProgressToggled(info) {
  trackUxEvent('lecture_progress_toggled', {
    lecture: info.lectureId,
    content_id: info.lectureId,
    content_type: 'lecture',
    completed: !!info.completed,
    source: info.source || 'unknown',
    subject_percent: Number(info.subjectPercent) || 0,
  });
}

/**
 * @param {{ queryLen: number, resultCount: number }} info
 */
export function trackSearchPerformed(info) {
  const resultCount = Number(info.resultCount) || 0;
  trackUxEvent('search_performed', {
    query_len: Number(info.queryLen) || 0,
    result_count: resultCount,
    has_results: resultCount > 0,
  });
}

/**
 * @param {{ lecId: string, entryId?: string, entryKind?: string, rank?: number, queryLen?: number }} info
 */
export function trackSearchResultClicked(info) {
  trackUxEvent('search_result_clicked', {
    lec_id: info.lecId || '',
    entry_id: info.entryId || '',
    entry_kind: info.entryKind || '',
    rank: Number(info.rank) || 0,
    query_len: Number(info.queryLen) || 0,
  });
}

/** @param {{ trigger?: string }} [info] */
export function trackSearchOpened(info = {}) {
  trackUxEvent('search_opened', { trigger: info.trigger || 'unknown' });
}

/**
 * @param {{ targetId: string, partType?: string, isSubsection?: boolean }} info
 */
export function trackTocNavigated(info) {
  trackUxEvent('toc_navigated', {
    target_id: info.targetId || '',
    part_type: info.partType || '',
    is_subsection: !!info.isSubsection,
  });
}

/** @param {{ targetId?: string, lectureId?: string, trigger?: string }} info */
export function trackJumpToSummary(info) {
  trackUxEvent('jump_to_summary', {
    target_id: info.targetId || '',
    lecture: info.lectureId || '',
    trigger: info.trigger || 'button',
  });
}

/** @param {{ enabled: boolean, source?: string }} info */
export function trackExpandOriginalToggled(info) {
  trackUxEvent('expand_original_toggled', {
    enabled: !!info.enabled,
    source: info.source || 'toolbar',
  });
}

/** @param {{ theme: string }} info */
export function trackThemeChanged(info) {
  trackUxEvent('theme_changed', { theme: info.theme === 'light' ? 'light' : 'dark' });
}

/**
 * @param {{ failureKind: string, contentType?: string, message?: string }} info
 */
export function trackContentLoadFailed(info) {
  trackUxEvent('content_load_failed', {
    failure_kind: info.failureKind || 'unknown',
    content_type: info.contentType || getActiveContextProps().content_type,
    message: String(info.message || '').slice(0, 120),
  });
}
