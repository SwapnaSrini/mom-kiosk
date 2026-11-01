# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Mom Kiosk: a local community app where parents give away baby items for free, with planned Polls and Events sections. It is two separate npm projects: a React frontend at the repo root and an Express API in `server/`. Each has its own `package.json` and `node_modules`.

## Commands

Frontend (repo root):
- `npm run dev`: Vite dev server
- `npm run build`: type-check (`tsc -b`), then Vite production build
- `npm run lint`: ESLint (flat config in `eslint.config.js`)
- `npm run preview`: serve the production build

Backend (`cd server`):
- `npm run dev`: run `src/index.ts` with `tsx watch` on http://localhost:3000

There is no test framework in either project yet.

## Architecture

**Frontend** (React 19, TypeScript, Vite, react-router-dom v7):
- `src/App.tsx` sets up `BrowserRouter`. `Header`, `WelcomeMessage` and `Tabs` render on every route, above `<Routes>`. The routes are `/products`, `/products/:id`, `/polls` and `/events`. `/` has no route.
- `Tabs` navigates with `NavLink`s. Navigation used to be driven by tab state; that code is still in the file, commented out.
- Product data is static. `src/data/ProductData.tsx` exports a hard-coded `products` array typed by `src/models/Product.tsx`. `ProductsList` and `ProductsDetails` import that array directly. The details page finds a product by converting both the route `:id` and `product.id` (a string) to numbers.
- Images are `placehold.co` URLs. `thumbnailUrl` is used on cards and `imageUrls[]` feeds `ProductImageCarousel` on the details page.
- Pages are under `src/pages/<Feature>/` and shared components under `src/components/`. Each component imports its own plain `.css` file. The project uses no CSS framework and no CSS modules.

**Backend** (`server/src/index.ts`, Express 5):
- One file holding a REST API for `/api/items` (list, get by id, create, delete), backed by an in-memory array. Data is lost on restart; a real DB is planned.
- The backend's `Item` type (`id: number`, `title`, `description`, `createdAt`) does not match the frontend's `Product` model. The frontend does not call the API yet, and Vite has no dev proxy.
- `server/tsconfig.json` is strict and also enables `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` and `verbatimModuleSyntax`. Because of `verbatimModuleSyntax`, import types with `import { type X }`.

## Conventions

- Prettier (`.prettierrc`): no semicolons, single quotes, 2-space indent. VS Code formats on save and runs ESLint fix-all on save (`.vscode/settings.json`). Older frontend files still use double quotes and inconsistent indentation; they have not been reformatted yet.
- Import types from the frontend models with `import type`.
