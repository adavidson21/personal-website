#!/usr/bin/env bash
# Exports every tab and home screen icon from the two SVG sources.
#   favicon.svg        rounded tile: browser tabs, and the "any" icon in site.webmanifest
#   icon-maskable.svg  full-bleed square with the mark in the safe zone, for Android home screen shapes
# Needs rsvg-convert (librsvg) and ImageMagick's convert.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

for s in 16 32 48; do rsvg-convert -w $s -h $s favicon.svg -o "$tmp/$s.png"; done
convert "$tmp/16.png" "$tmp/32.png" "$tmp/48.png" favicon.ico

rsvg-convert -w 192 -h 192 favicon.svg -o icon-192.png
rsvg-convert -w 512 -h 512 favicon.svg -o icon-512.png
rsvg-convert -w 512 -h 512 icon-maskable.svg -o icon-maskable-512.png

# iOS rounds the corners itself, so the touch icon is the same tile without rx.
sed 's/ rx="14"//' favicon.svg > "$tmp/apple.svg"
rsvg-convert -w 180 -h 180 "$tmp/apple.svg" -o "$tmp/apple.png"
convert "$tmp/apple.png" -background '#7A1B36' -alpha remove -alpha off apple-touch-icon.png

echo "Icons exported."
