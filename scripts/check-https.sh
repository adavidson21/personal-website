#!/usr/bin/env bash
# Guards against changes that would make browsers flag the site as "not secure".
# Runs as a pre-commit hook (.githooks/pre-commit) and in CI (.github/workflows/https-check.yml).
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

fail=0
err() { echo "  x $*"; fail=1; }

# Files that get served to the browser.
mapfile -t files < <(git ls-files '*.html' '*.css' '*.js' '*.svg' '*.json' '*.webmanifest' | grep -v '^\.github/' || true)

echo "Checking for insecure http:// references..."
for f in "${files[@]}"; do
  # XML namespace URIs (xmlns="http://www.w3.org/...") are identifiers, not requests.
  hits=$(grep -nI 'http://' "$f" | grep -vE 'xmlns(:[a-z]+)?="http://www\.w3\.org/' || true)
  if [ -n "$hits" ]; then
    while IFS= read -r line; do err "$f:$line"; done <<< "$hits"
  fi
done

echo "Checking every page's Content-Security-Policy..."
for f in $(git ls-files '*.html'); do
  csp=$(grep -o 'http-equiv="Content-Security-Policy" content="[^"]*"' "$f" || true)
  if [ -z "$csp" ]; then
    err "$f: missing Content-Security-Policy meta tag"
    continue
  fi
  echo "$csp" | grep -q "upgrade-insecure-requests" || err "$f: CSP must include upgrade-insecure-requests"
  echo "$csp" | grep -q "default-src 'self'"        || err "$f: CSP must include default-src 'self'"
  echo "$csp" | grep -qE "(^|[ ;'\"])http:"          && err "$f: CSP must not allow http: sources"
  echo "$csp" | grep -qE "(^|[ ;'\"])\*([ ;\"]|$)"   && err "$f: CSP must not allow * sources"
done

echo "Checking CNAME..."
if [ "$(tr -d '[:space:]' < CNAME 2>/dev/null)" != "alexisdavidson.org" ]; then
  err "CNAME must contain exactly alexisdavidson.org (changing it breaks the HTTPS certificate)"
fi

if [ "$fail" -ne 0 ]; then
  echo
  echo "HTTPS check failed. Use https:// or relative paths, and keep the CSP rules above."
  exit 1
fi
echo "HTTPS check passed."
