---
title: "my memory system scored 25% on its own test"
tags: "mnemosyne"
readingTime: "4 min"
draft: true
---

I ran Mnemosyne through the BEAM benchmark expecting a flex. Conflict resolution scored 50%. The other one, EO, scored 25%.

Twenty-five. Percent. Ouch.

The thing is, conflict resolution was “implemented.” It was in the code. It had tests. It just didn’t actually work.

## so i went looking

Turns out the whole fact layer was a mess. Facts lived in eight different stores that overlapped. Nobody, including me, could say which one was the source of truth. That confusion already caused a real regression in production.

And that wasn’t even the worst part:

- The best features shipped turned off by default. So most people never saw them.
- Trust scores got calculated for every fact, then thrown away. Never shown in recall.
- Some of my own benchmark numbers didn’t agree with each other. Classic.

## the fix

One fact ledger instead of eight stores. A real conflict module that picks a winner. Trust scores in every recall payload. A migration so nothing gets lost.

I’m doing it in five steps, biggest win first: ledger, then conflicts. No big-bang rewrite. Those always catch fire.

Lesson: if you haven’t benchmarked it, you don’t know if it works. You just hope.
