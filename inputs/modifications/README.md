# 🔄 Client Modifications & Revision Dropzone

This directory is the dedicated dropzone for all client revisions, update briefs, chat exports, and modification screenshots.

---

## 📁 Meaningful Folder Architecture

```text
inputs/modifications/
├── update_notes/            # Single all-in-one markdown briefs & change requests
│   └── updates.md           # The primary update file (what to add, change, remove)
│
├── telegram_chats/          # Exported chat histories containing client revision requests
│   ├── messages.html        # Telegram Desktop HTML export (100% natively supported)
│   └── telegram_chat.txt    # Text export of client messages
│
└── screenshots/             # Screenshots and visual references for modifications
    ├── ui_tweaks/           # Color, button, alignment, spacing or layout changes
    ├── new_sections/        # Brand new sections, pages, cards or modals requested
    └── bug_fixes/           # Screenshots pointing out bugs or display errors to fix
```

---

## ⚡ How to Use:
1. **Got a list of changes?** -> Fill or paste them into `inputs/modifications/update_notes/updates.md`.
2. **Got a Telegram chat?** -> Drop `messages.html` or `telegram_chat.txt` into `inputs/modifications/telegram_chats/`.
3. **Got new images/screenshots?** -> Drop them into `inputs/modifications/screenshots/ui_tweaks/`, `new_sections/`, or `bug_fixes/`.
4. **Trigger AI**: Paste the 1-Click Modification Prompt from `PROMPT_SHORTCUT.md` into AI Chat!

