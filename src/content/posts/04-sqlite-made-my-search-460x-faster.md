---
title: "sqlite made my search 460× faster"
tags: "sqlite · fts5"
readingTime: "3 min"
draft: true
---

Searching a million documents with `LIKE` is pain. You can feel it.

So I rebuilt it on SQLite FTS5. Same database. No search server. No cluster. No monthly bill.

## how

- A separate FTS5 table for the text.
- Triggers that keep it in sync on every insert, update and delete.
- Sanitizing user input in TypeScript first, because FTS5 has its own query syntax and raw input can break it.

Then I benchmarked it with better-sqlite3 on a 1M-document corpus.

Queries got 300 to 460 times faster.

SQLite is lowkey a monster. Most apps don’t need a search engine. They need one table and three triggers.
