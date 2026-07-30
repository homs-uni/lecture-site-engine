/**
 * Unit tests for analytics event property builders (no browser / PostHog required).
 */
import {
  buildBaseProps,
  buildSessionEndProps,
  classifyEngagement,
  clarityEventNameFor,
  computeReadingPaceRatio,
  computeReturnVisitMeta,
  contentIdsForType,
  countWords,
  detectSiteEnv,
  estimateReadSeconds,
} from './analytics.js';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

// --- detectSiteEnv -------------------------------------------------------
assert(detectSiteEnv('localhost') === 'local', 'localhost → local');
assert(detectSiteEnv('127.0.0.1') === 'local', '127.0.0.1 → local');
assert(detectSiteEnv('something.netlify.app') === 'sandbox', 'netlify → sandbox');
assert(detectSiteEnv('user.github.io') === 'production', 'github.io → production');

// --- contentIdsForType ---------------------------------------------------
assert(contentIdsForType('lecture', 'par9').lecture === 'par9', 'lecture id set');
assert(contentIdsForType('lecture', 'par9').dawrat === 'none', 'dawrat none on lecture');
assert(contentIdsForType('dawrat', 'exam1').dawrat === 'exam1', 'dawrat id set');
assert(contentIdsForType('note', 'par1').note === 'par1', 'note id set');

// --- buildBaseProps (home) -----------------------------------------------
const home = buildBaseProps({
  subjectName: 'قواعد بيانات ٢',
  storagePrefix: 'databases-2',
  page: '/databases-2/home',
  contentType: 'home',
  contentId: 'home',
  siteEnv: 'production',
});
assert(home.subject === 'قواعد بيانات ٢', 'home subject');
assert(home.storage_prefix === 'databases-2', 'home storage_prefix');
assert(home.page === '/databases-2/home', 'home page');
assert(home.content_type === 'home', 'home content_type');
assert(home.content_id === 'home', 'home content_id');
assert(home.lecture === 'none' && home.dawrat === 'none' && home.note === 'none', 'home ids none');
assert(home.site_env === 'production', 'home site_env');

// --- buildBaseProps (lecture) --------------------------------------------
const lec = buildBaseProps({
  subjectName: 'هندسة البرمجيات ٢',
  storagePrefix: 'software-engineering-2',
  page: '/software-engineering-2/lectures/par9',
  contentType: 'lecture',
  contentId: 'par9',
  siteEnv: 'production',
});
assert(lec.lecture === 'par9', 'lecture tag');
assert(lec.dawrat === 'none' && lec.note === 'none', 'other tags none');
assert(lec.content_type === 'lecture' && lec.content_id === 'par9', 'lecture content fields');

// --- buildSessionEndProps — all dimensions on one payload ----------------
const end = buildSessionEndProps(lec, { activeSeconds: 320, maxScrollPct: 75 });
assert(end.active_seconds === 320, 'active_seconds on session end');
assert(end.max_scroll_pct === 75, 'max_scroll_pct on session end');
assert(end.subject === 'هندسة البرمجيات ٢', 'session end keeps subject');
assert(end.content_id === 'par9', 'session end keeps content_id');
assert(end.page === '/software-engineering-2/lectures/par9', 'session end keeps page');
assert(end.content_type === 'lecture', 'session end keeps content_type');
assert(end.storage_prefix === 'software-engineering-2', 'session end keeps storage_prefix');

// Focus milestone payload shape (same base + focus_minutes)
const focus = { ...lec, focus_minutes: 5, active_seconds: 320 };
assert(focus.focus_minutes === 5 && focus.subject === lec.subject, 'focus milestone shape');

// --- Clarity event name mapping (backward compatible) --------------------
assert(
  clarityEventNameFor('scroll_milestone', { milestone_pct: 75 }) === 'scroll_75',
  'clarity scroll event',
);
assert(
  clarityEventNameFor('study_session_end', { content_type: 'lecture' }) === 'lecture_session_end',
  'clarity session end',
);
assert(
  clarityEventNameFor('focus_milestone', { content_type: 'dawrat', focus_minutes: 5 }) ===
    'dawrat_focus_5min',
  'clarity focus event',
);
assert(clarityEventNameFor('content_viewed', lec) === null, 'pageviews are tags-only on Clarity');
assert(clarityEventNameFor('hub_pageview', {}) === 'hub_pageview', 'hub pageview clarity event');
assert(clarityEventNameFor('mcq_answered', { is_correct: true }) === 'mcq_answered', 'ux events pass through');
assert(clarityEventNameFor('search_performed', {}) === 'search_performed', 'search event name');
assert(clarityEventNameFor('exam_finished', { exam_mode: 'exam' }) === 'exam_finished', 'exam finished name');

// --- buildSessionEndProps — exit/engagement fields (optional, additive) --
const endWithExit = buildSessionEndProps(lec, {
  activeSeconds: 320,
  maxScrollPct: 75,
  exitScrollPct: 82,
  exitReason: 'tab_closed',
  interactionCount: 3,
  engagementLevel: 'studier',
});
assert(endWithExit.exit_scroll_pct === 82, 'exit_scroll_pct present');
assert(endWithExit.exit_reason === 'tab_closed', 'exit_reason present');
assert(endWithExit.interaction_count === 3, 'interaction_count present');
assert(endWithExit.engagement_level === 'studier', 'engagement_level present');

const endWithoutExit = buildSessionEndProps(lec, { activeSeconds: 10, maxScrollPct: 5 });
assert(!('exit_scroll_pct' in endWithoutExit), 'exit_scroll_pct omitted when absent');
assert(!('engagement_level' in endWithoutExit), 'engagement_level omitted when absent');

// --- classifyEngagement ---------------------------------------------------
assert(
  classifyEngagement({ activeSeconds: 5, maxScrollPct: 10, interactionCount: 0 }) === 'watcher',
  'short + shallow + no interaction => watcher',
);
assert(
  classifyEngagement({ activeSeconds: 60, maxScrollPct: 80, interactionCount: 0 }) === 'studier',
  'long focus + deep scroll => studier',
);
assert(
  classifyEngagement({ activeSeconds: 45, maxScrollPct: 5, interactionCount: 2 }) === 'studier',
  'long focus + interaction (shallow scroll ok) => studier',
);
assert(
  classifyEngagement({ activeSeconds: 5, maxScrollPct: 100, interactionCount: 5 }) === 'watcher',
  'too little active time never counts as studier, regardless of scroll/interaction',
);

// --- computeReturnVisitMeta ------------------------------------------------
const day = 24 * 60 * 60 * 1000;
const firstVisit = computeReturnVisitMeta(null, 1_000_000);
assert(firstVisit.visitCount === 1, 'first visit count is 1');
assert(firstVisit.isReturning === false, 'first visit is not returning');
assert(firstVisit.daysSinceFirstSeen === 0, 'first visit has 0 days since first seen');

const secondVisit = computeReturnVisitMeta(
  { firstSeenAt: 1_000_000, visitCount: 1 },
  1_000_000 + 3 * day,
);
assert(secondVisit.visitCount === 2, 'second visit increments count');
assert(secondVisit.isReturning === true, 'second visit is returning');
assert(secondVisit.daysSinceFirstSeen === 3, 'days since first seen computed correctly');
assert(secondVisit.firstSeenAt === 1_000_000, 'firstSeenAt preserved across visits');

// --- countWords -------------------------------------------------------------
assert(countWords('') === 0, 'empty string => 0 words');
assert(countWords('   ') === 0, 'whitespace-only => 0 words');
assert(countWords('واحد اثنين ثلاثة') === 3, 'arabic word count');
assert(countWords('one two three four') === 4, 'english word count');
assert(countWords('  extra   spaces   between  ') === 3, 'collapses extra whitespace');

// --- estimateReadSeconds ----------------------------------------------------
assert(estimateReadSeconds(0) === 0, 'no words => 0 expected seconds');
assert(estimateReadSeconds(130) === 60, '130 words at 130wpm => 60s');
assert(estimateReadSeconds(260) === 120, '260 words at 130wpm => 120s');

// --- computeReadingPaceRatio -------------------------------------------------
assert(
  computeReadingPaceRatio({ activeSeconds: 60, expectedReadSeconds: 60 }) === 1,
  'active time matching expected => ratio 1',
);
assert(
  computeReadingPaceRatio({ activeSeconds: 10, expectedReadSeconds: 100 }) === 0.1,
  'active time far below expected => low ratio (fly-by)',
);
assert(
  computeReadingPaceRatio({ activeSeconds: 60, expectedReadSeconds: 0 }) === 0,
  'unknown expected time => ratio 0 (cannot judge)',
);

// --- buildSessionEndProps — reading-time fields (optional, additive) --------
const endWithReading = buildSessionEndProps(lec, {
  activeSeconds: 90,
  maxScrollPct: 100,
  wordCount: 500,
  expectedReadSeconds: 231,
  readingPaceRatio: 0.39,
  meaningfulOpen: true,
});
assert(endWithReading.content_word_count === 500, 'content_word_count present');
assert(endWithReading.expected_read_seconds === 231, 'expected_read_seconds present');
assert(endWithReading.reading_pace_ratio === 0.39, 'reading_pace_ratio present');
assert(endWithReading.meaningful_open === true, 'meaningful_open present');

console.log('analytics.test.mjs: ok');
