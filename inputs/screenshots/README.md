# 📸 Screenshots Dropzone: Exact-Clone & Image Matching Guide

Drop client UI screenshots, wireframes, or reference website captures here to produce a **pixel-accurate Next.js frontend clone**.

---

## 1. Supported Formats & File Naming

- **Formats**: `.png`, `.jpg`, `.jpeg`, `.webp`
- **Recommended Naming** (makes it easy for AI to order tasks):
  - `01-home.png` / `landingpage.png` (Hero, sections, categories)
  - `02-catalog.png` / `shop.png` (Product grids, faceted filter sidebar)
  - `03-details.png` / `product-page.png` (Tabs, specs matrix, gallery)
  - `04-configurator.png` / `modal.png` (Interactive steps, customization)
  - `05-cart.png` / `checkout.png` (Drawers, forms, invoice breakdown)

---

## 2. The Zero-Placeholder Mandate

When screenshots are provided:
1. **The AI will NEVER output generic placeholder boxes, broken image links, or dummy text.**
2. **Asset Generation**: The AI identifies every hero banner, product item, material finish, cross-section, or hardware detail in your screenshot and generates high-definition, photorealistic image assets placed in `frontend/public/images/`.
3. **Exact Visual Styling**:
   - Background & card surface hex colors
   - Typography weights and hierarchy
   - Card border radius (`rounded-xl`, `rounded-2xl`) and drop shadows
   - Hover animations and responsive drawers

---

## 3. How to Trigger 1-Click Exact Clone

After dropping your screenshots here, simply paste **Option C** from `PROMPT_SHORTCUT.md`:

```markdown
I have placed client UI screenshots in `inputs/screenshots/`.
Execute FRONTEND_FIRST with Screenshot Exact Clone Protocol:
1. Deconstruct all visual elements (colors, typography, spacing, shadows).
2. Generate all realistic image assets into `frontend/public/images/` (Zero Placeholders).
3. Build the responsive Next.js pages to match the screenshots with 100% visual fidelity.
```
