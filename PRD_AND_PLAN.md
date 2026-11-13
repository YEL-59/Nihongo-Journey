# Product Requirements Document & Architecture Plan

> **Generated on:** [Date]  
> **Source Inputs:** `inputs/client_docs/`, `inputs/screenshots/`, `inputs/references.md`  
> **Status:** Architecture Approved / Ready for Execution

---

## 1. Executive Summary
Brief summary of the client's business, user goals, and primary problem solved.

---

## 2. Execution Strategy Selected
- **Mode:** `FRONTEND_FIRST` | `BOTH_FULLSTACK` | `BACKEND_FIRST`
- **Rationale:** [e.g. "Frontend-First selected to provide client immediate interactive preview at http://localhost:3000 for screenshot confirmation before database wiring."]

---

## 3. Requirements & Overrides
- **Initial Brief (PDF/Doc):** Summary of original requirements.
- **Telegram Chat Overrides:** Specific changes, color preference changes, or feature updates requested during the chat (Telegram strictly overrides earlier briefs).

---

## 4. Visual System & Architecture Flow Diagrams

### 4.1 High-Level System Architecture Diagram
```mermaid
graph TD
    subgraph ClientLayer ["Client Layer (Frontend - Port 3000)"]
        UserBrowser["User / Web Browser"]
        NextApp["Next.js 14 App Router"]
        UIComponents["Tailwind UI + Lucide Icons"]
        ApiClient["Axios / Fetch Client"]
        UserBrowser --> NextApp
        NextApp --> UIComponents
        NextApp --> ApiClient
    end

    subgraph ServerLayer ["Server Layer (Backend - Port 5000)"]
        ExpressApp["Express.js App Gateway"]
        AuthMiddleware["Auth & JWT Middleware"]
        Validator["Zod / Request Validation"]
        Controllers["Feature Controllers"]
        Services["Business Logic Services"]
        ApiClient -->|"HTTP / REST API"| ExpressApp
        ExpressApp --> AuthMiddleware
        AuthMiddleware --> Validator
        Validator --> Controllers
        Controllers --> Services
    end

    subgraph DataLayer ["Data & Persistence Layer"]
        MongooseODM["Mongoose ODM (Models)"]
        MongoDb[("MongoDB Database")]
        Services --> MongooseODM
        MongooseODM -->|"TCP / Wire Protocol"| MongoDb
    end
```

### 4.2 End-to-End User Journey & Process Flowchart
```mermaid
flowchart TD
    Start(["User Lands on Website"]) --> AuthCheck{"Is User Authenticated?"}
    AuthCheck -->|No| BrowseGuest["Browse Public Catalog / Landing Page"]
    AuthCheck -->|Yes| UserDashboard["Access Authenticated Dashboard"]
    
    BrowseGuest --> ActionGuest{"Performs Action (e.g. Checkout / Bookmark)"}
    ActionGuest -->|Requires Login| AuthModal["Open Auth Modal / Login Form"]
    AuthModal --> LoginSuccess["JWT Token Stored in Cookie/Storage"]
    LoginSuccess --> UserDashboard

    UserDashboard --> FeatureFlow["Execute Core Feature (Create, Update, Order)"]
    FeatureFlow --> ValidateInput{"Form Validation OK?"}
    ValidateInput -->|Validation Error| ShowError["Display Inline Error Alert"]
    ShowError --> FeatureFlow
    ValidateInput -->|Valid| SubmitApi["POST/PUT Request to Express API"]
    SubmitApi --> ProcessLogic["Backend Processing & DB Transaction"]
    ProcessLogic --> SuccessResp["Success 200/201 Response"]
    SuccessResp --> UpdateUI["UI Optimistic / Re-fetch & Toast Notification"]
```

### 4.3 API Request-Response Lifecycle Flow
```mermaid
sequenceDiagram
    autonumber
    actor Client as Next.js Client
    participant Express as Express Gateway
    participant Guard as Auth & Validate Guard
    participant Controller as Feature Controller
    participant Service as Business Service
    participant DB as MongoDB (Mongoose)

    Client->>Express: POST /api/v1/resource (with Bearer Token)
    Express->>Guard: Verify JWT & Validate Request Body
    alt Invalid Token or Payload
        Guard-->>Client: 401 Unauthorized / 400 Bad Request
    else Valid Request
        Guard->>Controller: Forward Clean Payload
        Controller->>Service: Call Business Operation
        Service->>DB: Mongoose Query / Mutation
        DB-->>Service: Return Document / State
        Service-->>Controller: Return Business Result
        Controller-->>Client: 200/201 sendResponse(res, { success: true, data })
    end
```

---

## 5. Database Plan & Schemas (Backend Mongoose)

### 5.1 Visual Entity Relationship Diagram (ERD / ERP Diagram)
```mermaid
erDiagram
    USER ||--o{ ORDER : "places"
    USER ||--o{ PROFILE : "has"
    USER {
        ObjectId _id PK
        string name
        string email UK
        string password
        string role "admin | user"
        boolean isActive
        date createdAt
        date updatedAt
    }

    PROFILE {
        ObjectId _id PK
        ObjectId userId FK
        string avatar
        string phone
        string address
        date updatedAt
    }

    CATEGORY ||--o{ PRODUCT : "contains"
    CATEGORY {
        ObjectId _id PK
        string name UK
        string slug UK
        string description
    }

    PRODUCT ||--o{ ORDER_ITEM : "included_in"
    PRODUCT {
        ObjectId _id PK
        ObjectId categoryId FK
        string title
        number price
        number stock
        string[] images
        boolean isAvailable
    }

    ORDER ||--|{ ORDER_ITEM : "contains"
    ORDER {
        ObjectId _id PK
        ObjectId userId FK
        number totalAmount
        string status "pending | paid | shipped | cancelled"
        string paymentStatus "unpaid | paid | refunded"
        date createdAt
    }

    ORDER_ITEM {
        ObjectId _id PK
        ObjectId orderId FK
        ObjectId productId FK
        number quantity
        number unitPrice
        number subtotal
    }
```

### 5.2 MongoDB Architectural Strategy
- **Embedding vs Referencing**:
  - Small, tightly bounded 1-to-few subdocuments (e.g. shipping address, order items snapshot) are embedded directly in the parent document.
  - Large or unbound 1-to-many collections (e.g. Users, Orders, Products, Categories) use referenced ObjectIds (`ref: 'ModelName'`).
- **Indexing Strategy**:
  - Unique index on `email`, `slug`.
  - Compound indexes on query hotpaths (e.g. `{ userId: 1, createdAt: -1 }`, `{ categoryId: 1, isAvailable: 1 }`).
- **Audit & Soft Deletes**:
  - `timestamps: true` (automatically creates `createdAt` and `updatedAt`).
  - `isDeleted: { type: Boolean, default: false }` for safe soft deletion without data loss.

### 5.3 Detailed Mongoose Schemas & Interface Specifications

#### Collection 1: `users`
- **TypeScript Interface:**
```typescript
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
```
- **Field Specification Table:**
| Field Name | Type | Required | Unique | Default | Index | Description / Validation |
|---|---|---|---|---|---|---|
| `name` | `String` | Yes | No | - | No | Full user name (min 2, max 100) |
| `email` | `String` | Yes | Yes | - | Yes | Lowercase, valid email regex |
| `password` | `String` | Yes | No | - | No | Bcrypt hashed string (hidden by default) |
| `role` | `String` | Yes | No | `'user'` | Yes | Enum: `['user', 'admin']` |
| `isActive` | `Boolean` | No | No | `true` | No | Account status flag |
| `isDeleted` | `Boolean` | No | No | `false` | Yes | Soft-delete flag for queries |

---

## 6. API Endpoints Contract (Backend)

| Method | Endpoint | Request Body | Response Payload | Auth Required | Description |
|---|---|---|---|---|---|
| `POST` | `/api/v1/auth/register` | `{ name, email, password }` | `{ user, token }` | No | User registration |
| `POST` | `/api/v1/auth/login` | `{ email, password }` | `{ user, token }` | No | User authentication |
| `GET` | `/api/v1/items` | Query: `?page=1&limit=10` | `[ items... ]` | No | Paginated item listing |
| `GET` | `/api/v1/items/:id` | - | `{ item }` | No | Single item detail |
| `POST` | `/api/v1/items` | `{ title, ... }` | `{ createdItem }` | Bearer Admin | Create new item |
| `PUT` | `/api/v1/items/:id` | `{ ...partial }` | `{ updatedItem }` | Bearer Admin | Update item |
| `DELETE`| `/api/v1/items/:id` | - | `{ success: true }` | Bearer Admin | Soft delete item |

---

## 7. Frontend Pages & Components (Screenshot Mapping)
- **Screenshots Analyzed:**
  - `screenshot-1.png`: Layout, primary colors, component hierarchy.
  - `screenshot-2.png`: Specific card / grid designs.
- **Responsive Breakpoints:**
  - Mobile (`<640px`): Drawer menu, single-column.
  - Tablet (`640px-1024px`): 2-column cards.
  - Desktop (`>1024px`): Full multi-column view.
- **Design Tokens Extracted:**
  - Primary Color: `#...`
  - Secondary Color: `#...`
  - Background Dark/Light: `#...`
  - Radius & Shadows: `rounded-xl`, `shadow-lg`

---

## 8. Verification & Testing Criteria
- TypeScript compilation checks (`npm run build` in backend, 0 errors)
- Next.js build verification (`npm run build` in frontend, 0 errors)
- 6-State UI Verification (Default, Loading Skeleton, Empty, Error, Responsive, Hover/Focus)

