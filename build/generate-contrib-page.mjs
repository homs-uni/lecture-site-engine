#!/usr/bin/env node
/**
 * Generate dist/contrib/index.html — Fork + PR (no Collaborator / Write needed on public repo).
 */
import { existsSync } from 'node:fs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { listAllSubjectDirs, parseSubjectBrief, scaffoldSubjects } from './lib/scaffold-subject.mjs';
import { ENGINE_ROOT } from './lib/subject-paths.mjs';

const REPO = (process.env.GITHUB_REPOSITORY || 'Shahd-Abbara/lecture-site-engine');
const MAIN_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GH = `https://github.com/${REPO}`;

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** @param {string} subjectRel */
async function subjectTitle(subjectRel) {
  const briefPath = path.join(ENGINE_ROOT, 'subjects', subjectRel, 'subject-brief.yaml');
  if (existsSync(briefPath)) {
    try {
      const brief = parseSubjectBrief(await readFile(briefPath, 'utf8'));
      if (brief.name_ar) return brief.name_ar;
    } catch { /* ignore */ }
  }
  const manifestPath = path.join(ENGINE_ROOT, 'subjects', subjectRel, 'lectures/manifest.json');
  if (existsSync(manifestPath)) {
    try {
      const m = JSON.parse(await readFile(manifestPath, 'utf8'));
      return m.settings?.subjectName || m.title || subjectRel;
    } catch { /* ignore */ }
  }
  return subjectRel;
}

/** @param {string} subjectRel */
function lecturePath(subjectRel) {
  return `subjects/${subjectRel}/lectures`;
}

async function main() {
  await scaffoldSubjects();

  // Only subjects with lectures/ on disk (same paths committed to main).
  const subjectRels = (await listAllSubjectDirs()).filter(s =>
    existsSync(path.join(ENGINE_ROOT, 'subjects', s, 'lectures')),
  );

  /** @type {{ year: number, id: string, title: string, path: string }[]} */
  const subjects = await Promise.all(subjectRels.map(async id => {
    const year = Number(id.match(/^year-(\d)/)?.[1] || 0);
    return {
      year,
      id,
      title: await subjectTitle(id),
      path: lecturePath(id),
    };
  }));

  subjects.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title, 'ar'));

  const years = [...new Set(subjects.map(s => s.year))].filter(Boolean).sort((a, b) => a - b);
  const subjectsJson = JSON.stringify(subjects).replace(/</g, '\\u003c');

  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>رفع محاضرة — طريقة سهلة</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'IBM Plex Sans Arabic', sans-serif; margin: 0; padding: 2rem 1.5rem; background: #f0f4f8; color: #1a1a1a; line-height: 1.6; }
    .wrap { max-width: 520px; margin: 0 auto; }
    h1 { font-size: 1.5rem; margin: 0 0 0.5rem; }
    .lead { color: #555; margin: 0 0 1.5rem; font-size: 0.95rem; }
    .panel { background: #fff; border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1rem; border: 1px solid #dde3ea; }
    .field { margin-bottom: 1rem; }
    .field:last-child { margin-bottom: 0; }
    .field label { display: block; font-weight: 600; margin-bottom: 0.35rem; font-size: 0.9rem; color: #333; }
    .field select { width: 100%; padding: 0.6rem 0.75rem; border-radius: 8px; border: 1px solid #c5d0dc; font-family: inherit; font-size: 1rem; background: #fff; }
    .field select:disabled { background: #f5f7fa; color: #888; }
    .card { display: none; background: #fff; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; border: 1px solid #dde3ea; }
    .card.is-visible { display: block; }
    .card__title { font-size: 1.05rem; margin: 0 0 0.35rem; color: #1e5a8a; }
    .card__path { font-size: 0.78rem; color: #666; font-family: monospace; margin: 0 0 1rem; word-break: break-all; }
    .actions { display: flex; flex-direction: column; gap: 0.5rem; }
    .btn { display: block; text-align: center; padding: 0.65rem 0.85rem; border-radius: 8px; font-size: 0.95rem; text-decoration: none; background: #e8eef4; color: #1a1a1a; border: 1px solid #c5d0dc; }
    .btn:hover { background: #dce6f0; }
    .btn--primary { background: #1e5a8a; color: #fff; border-color: #1e5a8a; font-weight: 600; }
    .btn--primary:hover { background: #164a72; }
    .btn--ghost { background: transparent; font-size: 0.88rem; }
    .btn.is-disabled { pointer-events: none; opacity: 0.45; }
    .steps { background: #fff; border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1rem; border: 1px solid #dde3ea; font-size: 0.9rem; }
    .steps ol { margin: 0.5rem 0 0; padding-right: 1.25rem; }
    .steps li { margin-bottom: 0.35rem; }
    .naming { margin-top: 0.75rem; padding: 0.75rem; background: #f5f8fb; border-radius: 8px; font-size: 0.85rem; color: #444; }
    .naming code { background: #e8eef4; padding: 0.1rem 0.35rem; border-radius: 4px; }
    .back { display: inline-block; margin-bottom: 1rem; color: #1e5a8a; text-decoration: none; }
    .note { font-size: 0.85rem; color: #666; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #dde3ea; }
    .note--ok { background: #eef8f0; border: 1px solid #b8dcc0; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1rem; color: #1f4d2a; font-size: 0.88rem; }
    .note--warn { background: #fff8e6; border: 1px solid #e6d9a8; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1rem; color: #5c4a00; font-size: 0.88rem; }
    .field input[type=text] { width: 100%; padding: 0.6rem 0.75rem; border-radius: 8px; border: 1px solid #c5d0dc; font-family: inherit; font-size: 1rem; }
    .upload-url { display: block; margin-top: 0.5rem; font-size: 0.75rem; color: #666; font-family: monospace; word-break: break-all; }
    .empty { color: #888; text-align: center; padding: 1rem; }
  </style>
</head>
<body>
  <div class="wrap">
    <a class="back" href="../">← الصفحة الرئيسية</a>
    <h1>📤 رفع محاضرة</h1>
    <p class="lead">ارفع ملف <code>.md</code> جاهز (drag &amp; drop) — مو محرّر نص.</p>

    <div class="note--warn">
      <strong>subject-brief.yaml ≠ جاهز للرفع</strong><br>
      وجود <code>subject-brief.yaml</code> يعني المادة مُعرَّفة فقط. الرفع لازم يكون داخل
      <code>subjects/…/lectures/</code> — هاد المجلد لازم يكون على <code>main</code> (مو بس الـ brief).
    </div>

    <div class="note--warn">
      <strong>ليش 404 على Fork أو Upload؟</strong><br>
      • ما عملت <strong>Fork</strong> بعد → اضغط ① أولاً<br>
      • <strong>username غلط</strong> → لازم نفس الاسم بصفحة GitHub تبعك (بدون @)<br>
      • Fork قديم → افتح نسختك واضغط <strong>Sync fork</strong><br>
      • استخدم ② <strong>تحقق من Fork</strong> — إذا فتح 404 = المشكلة بالاسم أو ما عملت Fork
    </div>

    <div class="note--ok">
      مسجّل دخول على <a href="https://github.com/login" target="_blank" rel="noopener">GitHub</a> قبل ما تبلّش.
    </div>

    <div class="panel">
      <div class="field">
        <label for="yearSelect">١ — السنة الدراسية</label>
        <select id="yearSelect" aria-label="السنة الدراسية">
          <option value="">— اختر السنة —</option>
          ${years.map(y => `<option value="${y}">السنة ${y}</option>`).join('\n          ')}
        </select>
      </div>
      <div class="field">
        <label for="subjectSelect">٢ — المادة</label>
        <select id="subjectSelect" disabled aria-label="المادة">
          <option value="">— اختر المادة —</option>
        </select>
      </div>
      <div class="field">
        <label for="ghUser">٣ — اسمك على GitHub (username)</label>
        <input type="text" id="ghUser" placeholder="مثال: ahmad-dev" autocomplete="username" spellcheck="false">
        <p class="hint" style="font-size:0.8rem;color:#888;margin:0.35rem 0 0">
          بعد Fork — من صفحة GitHub تبعك: <code>github.com/<strong>USERNAME</strong></code> (مو الاسم المعروض)
        </p>
      </div>
    </div>

    <article class="card" id="subjectCard" aria-live="polite">
      <h2 class="card__title" id="cardTitle"></h2>
      <p class="card__path" id="cardPath"></p>
      <div class="actions">
        <a class="btn btn--primary is-disabled" id="btnFork" href="#" target="_blank" rel="noopener">① Fork المستودع</a>
        <a class="btn is-disabled" id="btnVerify" href="#" target="_blank" rel="noopener">② تحقق من Fork (لازم ما يعطي 404)</a>
        <a class="btn btn--primary is-disabled" id="btnFolderFork" href="#" target="_blank" rel="noopener">③ افتح مجلد lectures على نسختك</a>
        <a class="btn is-disabled" id="btnUpload" href="#" target="_blank" rel="noopener">④ Upload files مباشرة</a>
        <a class="btn is-disabled" id="btnPr" href="#" target="_blank" rel="noopener">⑤ Open Pull Request</a>
        <a class="btn btn--ghost is-disabled" id="btnFolder" href="#" target="_blank" rel="noopener">📁 المجلد على main</a>
      </div>
      <p class="upload-url" id="uploadUrlHint" hidden></p>
      <p class="upload-url" id="forkHint" style="color:#5c4a00;margin-top:0.5rem" hidden>
        على صفحة مجلد <code>lectures/</code>: <strong>Add file</strong> → <strong>Upload files</strong> → اسحب <code>parN.md</code>
      </p>
    </article>

    <div class="steps">
      <strong>الخطوات:</strong>
      <ol>
        <li>① <strong>Fork</strong> — انتظر لحد ما تفتح صفحة <code>github.com/اسمك/lecture-site-engine</code></li>
        <li>اكتب <strong>username</strong> أعلاه (من الرابط — مو الاسم العربي)</li>
        <li>② <strong>تحقق من Fork</strong> — إذا 404 راجع الخطوة 1 والاسم</li>
        <li>③ افتح مجلد <code>lectures/</code> على <strong>نسختك</strong> → Add file → Upload files</li>
        <li>Commit → <strong>Propose changes / start pull request</strong></li>
        <li>⑤ <strong>Open Pull Request</strong> نحو <code>main</code></li>
      </ol>
      <div class="naming">
        <strong>تسمية الملف:</strong><br>
        <code>parN.md</code> · <code>par1-sec1.md</code> · <code>par5-sec3.md</code>
      </div>
      <p class="note" style="border-top:none;padding-top:0.75rem;margin-top:0.75rem;font-size:0.85rem">
        بدل رفع ملف؟ <a id="btnPaste" href="#" target="_blank" rel="noopener">الصق نص في محرّر GitHub</a> (أقل راحة)
      </p>
    </div>

    ${subjects.length ? '' : '<p class="empty">لا توجد مواد بعد.</p>'}

    <p class="note">
      لا تحتاج تعديل <code>manifest.json</code> — يُزامَن تلقائياً عند الـ PR.
    </p>
  </div>
  <script>
    const GH = ${JSON.stringify(GH)};
    const MAIN_BRANCH = ${JSON.stringify(MAIN_BRANCH)};
    const SUBJECTS = ${subjectsJson};

    const REPO_NAME = ${JSON.stringify(REPO.split('/')[1])};

    const yearSelect = document.getElementById('yearSelect');
    const subjectSelect = document.getElementById('subjectSelect');
    const ghUserInput = document.getElementById('ghUser');
    const card = document.getElementById('subjectCard');
    const cardTitle = document.getElementById('cardTitle');
    const cardPath = document.getElementById('cardPath');
    const btnFork = document.getElementById('btnFork');
    const btnVerify = document.getElementById('btnVerify');
    const btnFolderFork = document.getElementById('btnFolderFork');
    const btnUpload = document.getElementById('btnUpload');
    const btnPr = document.getElementById('btnPr');
    const btnFolder = document.getElementById('btnFolder');
    const btnPaste = document.getElementById('btnPaste');
    const uploadUrlHint = document.getElementById('uploadUrlHint');
    const forkHint = document.getElementById('forkHint');

    const savedUser = localStorage.getItem('contrib-gh-user');
    if (savedUser) ghUserInput.value = savedUser;

    function encPath(folder) {
      return folder.split('/').map(encodeURIComponent).join('/');
    }

    function ghUser() {
      return ghUserInput.value.trim().replace(/^@/, '');
    }

    function contribUrls(s) {
      const user = ghUser();
      const enc = encPath(s.path);
      const forkBase = user
        ? 'https://github.com/' + encodeURIComponent(user) + '/' + REPO_NAME
        : null;
      return {
        fork: GH + '/fork',
        verifyFork: forkBase || '#',
        folderFork: forkBase
          ? forkBase + '/tree/' + encodeURIComponent(MAIN_BRANCH) + '/' + enc
          : '#',
        upload: forkBase
          ? forkBase + '/upload/' + encodeURIComponent(MAIN_BRANCH) + '/' + enc
          : '#',
        paste: GH + '/new/' + encodeURIComponent(MAIN_BRANCH) + '/' + encPath(s.path + '/parN.md'),
        openPr: GH + '/compare/' + encodeURIComponent(MAIN_BRANCH) + '?expand=1',
        folder: GH + '/tree/' + encodeURIComponent(MAIN_BRANCH) + '/' + enc,
      };
    }

    function refreshSubject() {
      const s = SUBJECTS.find(x => x.id === subjectSelect.value);
      if (!s) { hideCard(); return; }
      const urls = contribUrls(s);
      const user = ghUser();
      const hasUser = !!user;
      cardTitle.textContent = s.title;
      cardPath.textContent = s.path + '/';
      setBtn(btnFork, urls.fork, true);
      setBtn(btnVerify, urls.verifyFork, hasUser);
      setBtn(btnFolderFork, urls.folderFork, hasUser);
      setBtn(btnUpload, urls.upload, hasUser);
      setBtn(btnPr, urls.openPr, hasUser);
      setBtn(btnFolder, urls.folder, true);
      setBtn(btnPaste, urls.paste, true);
      if (hasUser) {
        localStorage.setItem('contrib-gh-user', user);
        uploadUrlHint.hidden = false;
        uploadUrlHint.textContent = 'نسختك: github.com/' + user + '/' + REPO_NAME;
        forkHint.hidden = false;
      } else {
        uploadUrlHint.hidden = false;
        uploadUrlHint.textContent = '↑ اكتب GitHub username بعد Fork';
        forkHint.hidden = true;
      }
      card.classList.add('is-visible');
    }

    function setBtn(btn, href, on) {
      btn.href = href || '#';
      btn.classList.toggle('is-disabled', !on);
    }

    function hideCard() {
      card.classList.remove('is-visible');
      setBtn(btnFork, '#', false);
      setBtn(btnVerify, '#', false);
      setBtn(btnFolderFork, '#', false);
      setBtn(btnUpload, '#', false);
      setBtn(btnPr, '#', false);
      setBtn(btnFolder, '#', false);
      setBtn(btnPaste, '#', false);
      uploadUrlHint.hidden = true;
      forkHint.hidden = true;
    }

    ghUserInput.addEventListener('input', () => {
      if (subjectSelect.value) refreshSubject();
    });

    yearSelect.addEventListener('change', () => {
      const y = Number(yearSelect.value);
      subjectSelect.innerHTML = '<option value="">— اختر المادة —</option>';
      hideCard();
      if (!y) {
        subjectSelect.disabled = true;
        return;
      }
      const list = SUBJECTS.filter(s => s.year === y);
      for (const s of list) {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.title;
        subjectSelect.appendChild(opt);
      }
      subjectSelect.disabled = list.length === 0;
    });

    subjectSelect.addEventListener('change', () => {
      if (SUBJECTS.find(x => x.id === subjectSelect.value)) refreshSubject();
      else hideCard();
    });

    if (!SUBJECTS.length) {
      yearSelect.disabled = true;
    }
  </script>
</body>
</html>`;

  const outDir = path.join(ENGINE_ROOT, 'dist', 'contrib');
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
  console.log(`✓ dist/contrib/index.html (${subjects.length} subject(s), ${years.length} year(s))`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
