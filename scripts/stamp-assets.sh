#!/usr/bin/env bash
# Adds a content hash to every site.css, site.js and theme.js link in the pages (site.css?v=1a2b3c4d).
# A changed file gets a new address, so browsers and installed copies of the site fetch it instead of
# reusing an old cached one. Run after rebuilding site.css or editing a script.
#   --check  only report pages whose stamps are out of date (used by CI and the pre-commit hook)
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

check=false
[[ "${1:-}" == "--check" ]] && check=true
stale=0

pages=$(git ls-files '*.html')
for asset in site.css site.js theme.js; do
  hash=$(sha256sum "$asset" | cut -c1-8)
  for page in $pages; do
    grep -q "$asset" "$page" || continue
    want=$(sed -E "s#(\"(\.\./)*${asset//./\\.})(\?v=[0-9a-f]*)?\"#\1?v=$hash\"#g" "$page")
    if [[ "$want" != "$(cat "$page")" ]]; then
      if $check; then echo "$page: $asset stamp is out of date"; stale=1
      else printf '%s\n' "$want" > "$page"; echo "Stamped $asset in $page"; fi
    fi
  done
done

if $check && (( stale )); then echo "Run scripts/stamp-assets.sh and commit the result."; exit 1; fi
