#!/usr/bin/env node
// Generate static/_redirects from redirects.json.
//
// Cloudflare's _redirects matches the source path EXACTLY (including the
// trailing slash), so each rule is emitted in BOTH forms (/x and /x/), and
// every splat (/x/*) also gets a bare-path entry (/x). This lets the source
// list stay single-form (one line per rule) while the deployed file covers
// both. Runs automatically via `yarn build`; or run `yarn build-redirects`.
// The output is gitignored — every deploy regenerates it from redirects.json.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcPath = join(root, 'redirects.json')
const outPath = join(root, 'static', '_redirects')

let data
try {
  data = JSON.parse(readFileSync(srcPath, 'utf8'))
} catch (err) {
  console.error(`build-redirects: cannot read/parse ${srcPath}\n  ${err.message}`)
  process.exit(1)
}
const rules = data.redirects
if (!Array.isArray(rules) || rules.length === 0) {
  console.error('build-redirects: redirects.json must contain a non-empty "redirects" array')
  process.exit(1)
}

const exact = []
const splatBares = []
const splats = []
for (const r of rules) {
  if (!r || typeof r.from !== 'string' || typeof r.to !== 'string') {
    console.error(`build-redirects: every rule needs string "from" and "to": ${JSON.stringify(r)}`)
    process.exit(1)
  }
  const status = String(r.status ?? 301)
  if (r.from.includes('*')) {
    const bare = r.from.replace(/\/\*+$/, '') // /helium-tokens/* -> /helium-tokens
    splatBares.push([bare, r.to, status])
    splats.push([r.from, r.to, status, r.note])
  } else {
    const ns = r.from.replace(/\/+$/, '') // normalize: emit both /x and /x/
    exact.push([ns, r.to, status, r.note], [ns + '/', r.to, status])
  }
}

const all = [...exact, ...splatBares, ...splats]
const sw = Math.max(...all.map(([s]) => s.length)) + 2
const dw = Math.max(...all.map(([, d]) => d.length)) + 2
const fmt = ([s, d, st, note]) => (note ? `# ${note}\n` : '') + `${s.padEnd(sw)}${d.padEnd(dw)}${st}`

const header = `# Cloudflare Pages redirects  —  GENERATED FILE, DO NOT EDIT BY HAND
# ---------------------------------------------------------------------------
# Source of truth: redirects.json  (edit there, then rebuild).
# Regenerated automatically by "yarn build"; or run "yarn build-redirects".
#
# Served by Cloudflare Pages — Docusaurus copies static/ to the build root.
#
# Trailing slashes: Cloudflare matches the source path EXACTLY, so each rule
# is emitted in BOTH forms (/x and /x/), and every splat also gets a bare-path
# entry. Rules default to 301.
#
# NOT INCLUDED — the developer.helium.com -> docs.helium.com cross-domain
#   redirect lives as a zone-level Redirect Rule in Cloudflare (_redirects
#   matches on path, not host).
# ---------------------------------------------------------------------------
`

const out = [
  header,
  '# --- Exact redirects (listed in both slash forms) --------------------------',
  ...exact.map(fmt),
  '',
  '# --- Bare-path entries for the splat rules below ---------------------------',
  ...splatBares.map(fmt),
  '',
  '# --- Splat redirects (dynamic; must stay after the static rules) -----------',
  ...splats.map(fmt),
  '',
].join('\n')

writeFileSync(outPath, out)
console.log(
  `build-redirects: wrote ${exact.length + splatBares.length + splats.length} lines ` +
    `to static/_redirects from ${rules.length} source rules`,
)
