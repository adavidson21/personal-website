---
title: Your note title
summary: One sentence that makes someone want to read it.
label: Topic label
date: 2026-11-12
draft: true
---

Files that start with an underscore are skipped, so this one never publishes. Copy it to
`_notes/your-note-name.md` (lowercase, dashes), write in Markdown, and run `npm run build`.

## A section heading

Plain Markdown works: **bold**, *italics*, [links](https://alexisdavidson.org), lists, quotes,
`code`, and images saved in `images/notes/`.

> A pull quote gets the gold bar.

Front matter:

- `title`, `summary`, `label`, `date` (YYYY-MM-DD) are required.
- `draft: true` keeps it off the site while you work on it. The file is still public in the GitHub repo.
- `updated: 2026-12-01` adds an "Updated" line after you revise a published note.
