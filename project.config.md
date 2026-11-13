# ⚙️ Project Configuration: EasyTemplate (MERN AI Framework)

> **Version**: 1.0  
> **Architecture**: Lightweight MERN Stack + Next.js App Router  
> **Execution Engine**: Plan-First, Context-Isolated, Zero-Docker AI Protocol  

---

## 1. Project Information & Metadata

- **Project Name**: EasyTemplate MERN Application
- **Project Domain**: Full-Stack Web Application (Freelance / Client MVP)
- **Status**: `TEMPLATE_READY`
- **Language Preference**: `EN` (English)
- **Client Brief Source**: `inputs/client_docs/requirements.md` & `inputs/client_docs/telegram_chat.txt`
- **Client Modifications / Updates**: `inputs/client_docs/updates.md`
- **UI Screenshots**: `inputs/screenshots/`
- **Reference Websites**: `inputs/references.md`

---

## 2. Global Settings & Language Control
- Run `npm run settings` in terminal anytime to interactively:
  - Press `1` to toggle language between English (`en`) and বাংলা (`bn`).
  - Press `2` to change execution strategy (`FRONTEND_FIRST`, `BOTH_FULLSTACK`, `BACKEND_FIRST`).
  - Press `3` to view client modification instructions.
  - Or manually configure root `settings.json`.
- **AI Behavior Rule**:
  - When language is set to `EN`: All conversation responses, build status messages, task completion reports, session handoff cards, and next-day resume prompt suggestions MUST be in **English**.
  - When language is set to `BN`: All responses and cards are displayed in **Bangla**.

---

## 2. Execution Strategy / Mode Selection

Choose one of the following execution modes based on client requirements:

| Strategy | Mode Key | When to Use | Typical Task Order |
|---|---|---|---|
| **Frontend-First** *(Client Demo Mode)* | `FRONTEND_FIRST` | When the client wants to see and approve the UI/screens quickly before backend work starts. | Tokens/Navbar → Page Views (Mock Data) → Backend Models/APIs → Wiring |
| **Both / Full-Stack** *(Default MERN)* | `BOTH_FULLSTACK` | Standard full-stack workflow with live database models, APIs, and synchronized frontend views. | Backend Schemas → Express Endpoints → Frontend UI → Full Integration |
| **Backend-First** *(API-First)* | `BACKEND_FIRST` | When complex business logic, auth, or integrations are the primary uncertainty. | Schemas → APIs & Middleware → Testing → Frontend Implementation |

- **Active Strategy**: `FRONTEND_FIRST`

---

## 3. Technology Stack Specification

| Layer | Technology | Version / Configuration | Directory |
|---|---|---|---|
| **Backend Runtime** | Node.js + Express | Express 4.x + TypeScript | `backend/` |
| **Database** | MongoDB | Mongoose 8.x ODM | `backend/` |
| **Frontend Framework** | Next.js 14 | App Router + TypeScript | `frontend/` |
| **Styling** | Tailwind CSS | PostCSS + Autoprefixer | `frontend/` |
| **Iconography** | Lucide React | Modern SVG icons | `frontend/` |
| **HTTP Client** | Axios / Fetch | Standardized API client | `frontend/src/services/` |
| **Concurrency** | concurrently | Runs both frontend & backend concurrently | Root |
| **DevOps / Container** | **NONE** | Zero-Docker policy (Native local execution) | N/A |

---

## 4. Network & Environment Configuration

| Service | Local URL | Port | Environment File | Key Variables |
|---|---|---|---|---|
| **Backend API** | `http://localhost:5000` | `5000` | `backend/.env` | `PORT=5000`<br>`DB_URL=mongodb://127.0.0.1:27017/easytemplate`<br>`NODE_ENV=development` |
| **Frontend Web** | `http://localhost:3000` | `3000` | `frontend/.env.local` | `NEXT_PUBLIC_API_URL=http://localhost:5000` |
| **API Base Path** | `http://localhost:5000/api` | - | - | Standard REST routes |

---

## 5. Brand Design Tokens (Default / Customizable per Client)

> When the client provides UI screenshots in `inputs/screenshots/`, update this section with the extracted design tokens:

- **Primary Color**: `#3B82F6` (Electric Blue / Tech Accent)
- **Secondary Color**: `#10B981` (Emerald / Success Accent)
- **Dark Neutral**: `#0F172A` (Slate 900 - Dark mode background)
- **Light Neutral**: `#F8FAFC` (Slate 50 - Light mode background)
- **Card Background (Dark)**: `#1E293B` (Slate 800)
- **Card Background (Light)**: `#FFFFFF` (White)
- **Typography Hierarchy**: Inter / Plus Jakarta Sans / System Sans-Serif
- **Border Radius**: `rounded-xl` (12px) for cards, `rounded-lg` (8px) for buttons/inputs

---

## 6. Standardized API Response Contract

Every backend endpoint must return responses adhering to this envelope:

### Success Response (200 / 201)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Resource fetched or created successfully",
  "data": {}
}
```

### Error Response (400 / 404 / 500)
```json
{
  "success": false,
  "message": "Detailed error explanation",
  "errorSources": [
    {
      "path": "field_name",
      "message": "Validation rule failed"
    }
  ]
}
```
