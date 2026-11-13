# Frontend Client (Next.js 14 App Router + Tailwind CSS)

## Overview
This frontend starter is structured for rapid component creation, exact screenshot cloning, and seamless connection with the backend Express API.

### Directory Structure
```text
frontend/
├── .env.local             # NEXT_PUBLIC_API_URL=http://localhost:5000
├── package.json           # Dependencies (Next.js 14, Tailwind, Lucide, Axios)
├── tsconfig.json          # TypeScript path aliases (@/* -> ./src/*)
├── tailwind.config.ts     # Tailwind theme and custom color extensions
├── postcss.config.mjs     # PostCSS configuration
└── src/
    ├── app/
    │   ├── globals.css    # Global stylesheet & CSS variables
    │   ├── layout.tsx     # Root layout with responsive Navbar and Footer
    │   └── page.tsx       # Landing page with live backend health status
    ├── components/
    │   ├── shared/
    │   │   ├── Navbar.tsx # Sticky responsive header with mobile hamburger
    │   │   └── Footer.tsx # Responsive footer
    │   └── ui/
    │       ├── Button.tsx # Reusable button with variants & loading state
    │       └── Card.tsx   # Modern card with hover effect
    ├── lib/
    │   └── utils.ts       # cn() helper using clsx and tailwind-merge
    └── services/
        └── api.ts         # Axios client with centralized interceptor
```

## Available Scripts
- `npm run dev`: Starts Next.js development server on `http://localhost:3000`
- `npm run build`: Generates production build
- `npm run start`: Runs compiled production build
- `npm run lint`: Runs ESLint
