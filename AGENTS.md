<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Codex ↔ Claude round trip (since 2026-10-12)

Follow `docs/agent-handoff/HANDOFF_PROTOCOL.md`. Write each work order to `docs/agent-handoff/orders/<ID>.md`
(ID `GUI-HANDOFF-YYYYMMDD-NN`). When reviewing, write the verdict to `docs/agent-handoff/reviews/<ID>.md` with the
sections 판정 · 근거 · 재작업 필요 · 다음 작업지시. Never PASS without verification.
