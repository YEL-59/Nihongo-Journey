# Backend Server (TypeScript + Express + Mongoose)

## Architecture Overview
This backend service is structured for high maintainability, rapid feature extension, and type safety.

### Folder Structure
```text
backend/
├── .env                  # Environment configurations (PORT, DB_URL)
├── .gitignore            # Ignored files (node_modules, dist, .env)
├── .prettierrc           # Formatting standards
├── eslint.config.mjs     # ESLint flat config with TypeScript parser
├── package.json          # Dependencies & npm scripts
├── tsconfig.json         # TypeScript compiler options
├── dist/                 # Transpiled JavaScript production output
└── src/
    ├── app.ts            # Express application setup & middleware (cors, json)
    ├── server.ts         # MongoDB connection & HTTP server listener
    └── config/
        └── index.ts      # Centralized environment variable loader
```

## Available Scripts
- `npm run start:dev`: Starts the server in development mode using `ts-node-dev` with hot reload.
- `npm run build`: Compiles TypeScript files into the `./dist` folder.
- `npm run start:prod`: Runs the compiled production server from `./dist/server.js`.
- `npm run lint`: Analyzes codebase with ESLint.
- `npm run prettier`: Auto-formats all TypeScript source files.

## Environment Variables (.env)
```env
PORT=5000
DB_URL=mongodb://127.0.0.1:27017/easytemplate
NODE_ENV=development
```
