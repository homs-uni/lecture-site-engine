import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const BUILD_ID_META_RE = /<meta\s+name="site-build-id"\s+content="[^"]*"\s*\/?>/i;

/**
 * Inject build id into index.html for runtime cache busting + SW registration.
 * @param {string} outDir
 * @param {string} buildId
 */
export async function patchBuildMeta(outDir, buildId) {
  const indexPath = path.join(outDir, 'index.html');
  if (!existsSync(indexPath) || !buildId) return;

  const tag = `<meta name="site-build-id" content="${buildId}">`;
  let html = await readFile(indexPath, 'utf8');

  if (BUILD_ID_META_RE.test(html)) {
    html = html.replace(BUILD_ID_META_RE, tag);
  } else {
    html = html.replace(/<meta name="viewport"[^>]*>/i, match => `${match}\n  ${tag}`);
  }

  await writeFile(indexPath, html);
}
