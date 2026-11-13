# 📄 Client Documents & Chat Export Dropzone

Drop your client requirement files, project briefs, and chat exports here.

---

## 1. Supported Telegram & Chat Export Formats

Telegram exports are supported in **all native formats** (no manual conversion needed):
- **`.html` (Recommended)**: Telegram Desktop's default export (`messages.html`, `telegram_chat.html`). HTML is 100% supported—it preserves exact sender names, timestamps, and replies cleanly!
- **`.txt`**: Plain text chat exports (`telegram_chat.txt`).
- **`.json`**: Structured chat exports (`result.json`).

> 💡 **Tip**: When you export chat from Telegram Desktop (`Export chat history`), it generates `messages.html`. Simply drop `messages.html` right here! The AI directly parses the HTML.

---

## 2. Supported Briefs & Requirements Formats

- **`requirements.md`**: Paste text from client PDFs, Word documents, Fiverr/Upwork briefs, or email threads.
- **`.pdf` / `.docx` text**: Extracted text or summary notes.

---

## 3. Conflict Resolution Hierarchy

If requirements conflict across different client documents:
```text
Client Prompt / Instructions > Telegram Chat (HTML/TXT) > Initial Brief / PDF
```
Telegram chat messages strictly override older statements in PDF documents.
