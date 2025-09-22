# Online Store (Next.js)

JS Frameworks 1 CA at Noroff Vocational School built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**, **Zustand** for cart state, **React Hook Form** + **Zod** for forms/validation, and **sonner** for toasts. Deployed on **Vercel**.

 - Production: https://jsfw-2025-v1-stein-jsframeworks.vercel.app/
 - Preview deployments: auto-created per commit/branch in Vercel.

## Table of Contents

 * Features
 * Tech Stack
 * Getting Started
 * Scripts
 * Configuration
 * Project Structure
 * Deployment (Vercel)
 * Common Warnings & Quick Fixes
 * Troubleshooting
 * License


### Features

* Home page with product grid (```/```)
* Product detail page (```/product/[id]```)
* Cart with global state (Zustand) (```/cart```) — uses ```next/image```
* Checkout success page (```/checkout/success```)
* Contact form with React Hook Form + Zod + sonner toasts (```/contact```)
* Optimized images via ```next/image```


### Tech Stack

* **Framework:** Next.js 15 (App Router), React 19, TypeScript
* **UI:** Tailwind CSS v4 (via ```@tailwindcss/postcss```)
* **State / Forms:** Zustand, React Hook Form, Zod
* **Feedback:** sonner (Toaster)
* **Testing:** Vitest, Testing Library
* **Hosting:** Vercel


### Getting Started

Requirements

 * Node.js LTS (recommended > 20)
 * npm

 Install & run
 ```
 npm ci
 npm run dev
 # http:localhost:3000
 ```

 On Windows, if dev crashes with Turbopack, use Webpack for dev: 

 ```
 npm run dev:webpack

 ```

### Scripts

```
{
  "scripts": {
    "dev": "next dev",
    "dev:webpack": "set NEXT_DISABLE_TURBOPACK=1&& next dev",
    "build": "next build --turbopack",
    "build:webpack": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test-watch": "vitest --watch"
  }
}
```


### Configuration

**Tailwind v4**
```src/app/global.css```
```

@import "tailwindcss";

/* Your own CSS below */
:root { --background:#ffffff; --foreground:#171717; }
@media (prefers-color-scheme: dark) {
  :root { --background:#0a0a0a; --foreground:#ededed; }
}
body { background:var(--background); color:var(--foreground); }

```

```postcss.config.mjs```

```
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

```


