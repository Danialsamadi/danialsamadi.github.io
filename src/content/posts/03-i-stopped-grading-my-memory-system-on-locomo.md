---
title: "i stopped grading my memory system on locomo"
tags: "evals"
readingTime: "3 min"
draft: true
---

Benchmarks feel objective. Until you check the answer key.

LoCoMo is a popular test for long-term memory. About 6.4% of its answer key is wrong. And its judge is lenient.

So you can score well by being wrong in the right way. Wild.

## what i use instead

- LongMemEval as the main benchmark. MIT licensed, solid.
- BEAM, MemoryAgentBench and ConvoMem on the radar for later.
My harness downloads the dataset, ingests it, scores with an LLM judge and dumps JSONL traces so I can see exactly where things went sideways.

Starting small: the LongMemEval-S oracle set, 50 questions. Then scale up.

And for Synapse I care about more than accuracy. Speed and cost are the whole pitch, so those get measured too.
