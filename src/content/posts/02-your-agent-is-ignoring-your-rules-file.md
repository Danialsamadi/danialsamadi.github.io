---
title: "your agent is ignoring your rules file"
tags: "synapse · mcp"
readingTime: "4 min"
draft: true
---

I wanted one simple thing: before an agent answers anything, it checks memory first. Every time.

Sounds easy. It is not.

I tested it across Claude Code, Claude Desktop, ChatGPT, Codex, Cursor, Windsurf, Gemini CLI and VS Code Copilot. Rules files. Custom instructions. Nicely worded system prompts.

All of them are suggestions. The model follows them when it feels like it. That’s probabilistic, not guaranteed.

## what actually works

Only two things forced the memory call every single time:

- Forcing the tool with `tool_choice` at the API level.
- Claude Code’s `UserPromptSubmit` hook, which injects memory before the model even starts.

So Synapse rolls out in four stages: a small tool surface with distinct names, `tool_choice` forcing on the first turn, hooks that inject memory as context, and rules files as the fallback. Rules files come last on purpose.

If it has to happen every time, don’t ask nicely. Wire it in.
