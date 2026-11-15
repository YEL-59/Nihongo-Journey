# Client Open Questions & Zero-Assumption Log

> **Zero-Assumption Policy**: AI agents must NEVER invent client requirements. Any missing, ambiguous, or contradictory specifications discovered during intake or execution must be recorded here.

---

## Active Questions

| ID | Topic / Feature | Question for Client | Impact on Development | Status | Resolution |
|---|---|---|---|---|---|
| `Q-001` | N5-to-N1 scope | Should higher JLPT levels be released sequentially after N5 is complete, or exposed in parallel as content is built? | Curriculum, roadmap, level unlocking, and task scheduling | `RESOLVED` | Developer chose separate level packages and a sequential N5 → N4 → N3 → N2 → N1 rollout; each level becomes available only after its content and quality gate pass. |
| `Q-002` | Learning languages | Should the existing Bangla + English + Japanese support remain the product-wide language set through N1? | Content model, translation work, onboarding, and UI | `RESOLVED` | Developer confirmed the N5–N1 goal and asked to retain the existing Bangla, English, and Japanese experience. |
| `Q-003` | Learning content rights and audio | Which licensed sources may be used, or should the team create original JLPT-aligned lessons and practice material? If native pronunciation recordings are added, what authorized source should be used? | Curriculum authoring, native audio/assets, and exam content | `OPEN` | For the requested new levels, author original JLPT-aligned content and do not reproduce restricted textbook or official exam material. Browser speech is the current demo; native recordings remain deferred until an authorized source is selected. |
| `Q-004` | Accounts and synchronization | Should guest/local-first learning remain the default, with accounts and cloud sync deferred until the core journey is complete? | Authentication, backend integration, data migration, and privacy | `OPEN` | Recommended: defer accounts/sync; awaiting developer confirmation |

---

## Resolved Questions Archive

| ID | Topic | Question | Final Resolution (Client Confirmed) | Date Resolved |
|---|---|---|---|---|
| - | - | - | - | - |

## Security follow-up (2026-11-15)
- The starter template's `init`, `backend/init`, `frontend/init` and the original `frontend/postcss.config.mjs` (commit `a0c313d`) contained a hidden obfuscated script that ran on every `npm run dev/build/start`. The working tree is clean and the `node init` script prefixes are removed, but the files are still in git history and on the GitHub remote.
- 2026-11-15 (push): the remote branch tip `52d71e1` was a rewritten copy of local commit `d08ff6e` (same author, message and time, but committer timezone `-0800` instead of `+0600`, and absent from the local reflog) that changed the hidden payload in the init files and `frontend/postcss.config.mjs`. Something other than the developer's normal git workflow pushed to GitHub with the developer's credentials. It was merged with `-s ours` so the pushed tree is clean; the payload is still in history.
- Developer decisions needed: (1) rotate credentials that were reachable from this machine; (2) whether to rewrite git history / force-push to remove the infected commit content; (3) do not reuse the EasyTemplate source for other projects until it is inspected.
