# Client Open Questions & Zero-Assumption Log

> **Zero-Assumption Policy**: AI agents must NEVER invent client requirements. Any missing, ambiguous, or contradictory specifications discovered during intake or execution must be recorded here.

---

## Active Questions

| ID | Topic / Feature | Question for Client | Impact on Development | Status | Resolution |
|---|---|---|---|---|---|
| `Q-001` | N5-to-N1 scope | Should higher JLPT levels be released sequentially after N5 is complete, or exposed in parallel as content is built? | Curriculum, roadmap, level unlocking, and task scheduling | `RESOLVED` | Developer chose separate level packages and a sequential N5 → N4 → N3 → N2 → N1 rollout; each level becomes available only after its content and quality gate pass. |
| `Q-002` | Learning languages | Should the existing Bangla + English + Japanese support remain the product-wide language set through N1? | Content model, translation work, onboarding, and UI | `OPEN` | Recommended: retain the current set; awaiting developer confirmation |
| `Q-003` | Learning content rights and audio | Which licensed sources may be used, or should the team create original JLPT-aligned lessons and practice material? If native pronunciation recordings are added, what authorized source should be used? | Curriculum authoring, native audio/assets, and exam content | `OPEN` | Do not reproduce restricted textbook or exam content. Browser-generated speech is the current frontend demo approach; native recordings are deferred until an authorized source is approved. |
| `Q-004` | Accounts and synchronization | Should guest/local-first learning remain the default, with accounts and cloud sync deferred until the core journey is complete? | Authentication, backend integration, data migration, and privacy | `OPEN` | Recommended: defer accounts/sync; awaiting developer confirmation |

---

## Resolved Questions Archive

| ID | Topic | Question | Final Resolution (Client Confirmed) | Date Resolved |
|---|---|---|---|---|
| - | - | - | - | - |
