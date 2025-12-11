# Online Store (Next.js)

CURRENTLY UNDERGOING UPGRADES!

JS Frameworks 1 CA at Noroff Vocational School built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**, **Zustand** for cart state, **React Hook Form** + **Zod** for forms/validation, and **sonner** for toasts. Deployed on **Vercel**.

 - Production: [JS2 Frameworks](https://jsfw-2025-v1-stein-jsframeworks.vercel.app/)
 - Preview deployments: auto-created per commit/branch in Vercel.

## Table of Contents

 * [Features](#features)
 * [Tech Stack](#tech-stack)
 * [Project Update](#project-update)
 * [Getting Started](#getting-started)
 * [Scripts](#scripts)
 * [Configuration](#configuration)
 * [Project Structure](#project-structure)
 * [Deployment (Vercel)](#deployment-(vercel))
 * [Common Warnings & Quick Fixes](#common-warnings-&-quick-fixes)
 * [Troubleshooting](#troubleshooting)
 * [License](#license)


### Features

* Home page with product grid (```/```)
* Product detail page (```/product/[id]```)
* Cart with global state (Zustand) (```/cart```) — uses ```next/image```
* Checkout success page (```/checkout/success```)
* Contact form with React Hook Form + Zod + sonner toasts (```/contact```)
* Optimized images via ```next/image```


### Project Update
The following updates have been done to project (11.12.2025)
```
  - Restructured folders. 
  - Merged clean-setup branch into main. 
  - Updated product cards. 
   - Added star icons to product card. 
  - Updated color palette.
  - Added Footer to the page. 
```

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
 ```bash
 npm ci
 npm run dev
 # http:localhost:3000
 ```

 On Windows, if dev crashes with Turbopack, use Webpack for dev: 

 ```bash

 npm run dev:webpack

 ```

### Scripts

```json
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

```css

@import "tailwindcss";

/* Your own CSS below */
:root {
  color-scheme: dark;           
  --background: #131111;       
  --foreground: #ededed;    
}

body {
  background: var(--background);
  color: var(--foreground);
}

```

```postcss.config.mjs```

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

```
With v4 you **do not** use `@tailwind base/components/utilities`. Don't mix v3 directives with v4.



**Next.js (remote images)**

`next.config.ts`

```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.noroff.dev" },
      // add more domains if needed
    ],
  },
}

export default nextConfig
```

**Layout & Header**

`src/app/layout.tsx`

```tsx

import "./globals.css"
import ToastProvider from "@/components/ToastProvider"
import Header from "@/components/Header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ToastProvider />
        <Header />
        {children}
      </body>
    </html>
  )
}

```

`src/components/ToastProvider.tsx`

```tsx

"use client"
import { Toaster } from "sonner"
export default function ToastProvider() {
  return <Toaster position="top-right" richColors />
}

```



## Project Structure

```lua

jsfw-2025-v1-stein-jsframeworks/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ globals.css
│  └─ components/
│     ├─ Header.tsx
│     ├─ HeaderCartBadge.tsx
│     └─ ToastProvider.tsx
├─ public/
├─ next.config.ts
├─ postcss.config.mjs
└─ tsconfig.json

```


## Deployment (Vercel)

```yaml

---

## Deployment
- **Root Directory:** `online-store/online-store-next`
- **Build command:** `npm run build` (Turbopack). If it fails, fallback: `npm run build:webpack`
- **Production domain** points to the latest **Production Deployment**.  
  Use **“Promote to Production”** on a working preview to make it live.

---

## Common Warnings & Quick Fixes

**`no-img-element`** → use `next/image` (e.g., in `/cart/page.tsx`):
```tsx
import Image from "next/image"
<Image
  src={item.imageUrl || "/placeholder.png"}
  alt={item.title}
  width={80}
  height={80}
  className="h-20 w-20 rounded object-cover"
/>

```
> [!NOTE]
> Remember to whitelist image domains in `next.config.ts`.

* If you must keep <img>, silence on that line:

```tsx

{/* eslint-disable-next-line @next/next/no-img-element */}
<img ... />

```

## Troubleshooting

**Turbopack crashes on Windows (dev server)** 

* Use Webpack dev:

```bash

npm run dev:webpack

```

**Images not showing** 

* Add domains to `next.config.ts > images.remotePatterns` and redeploy.



## License

Code is licensed under the **MIT License**.

© 2025 Stein Arild Gansmoe. 

**Assets:** Product images, logos, and other media are © their respective owners and are **not** covered by the MIT license unless stated otherwise.  
**Fonts:** If bundled, fonts may carry their own licenses (e.g. SIL Open Font License).  
**Third-party:** This project uses open-source libraries under permissive licenses (e.g. MIT). Refer to each library’s repository for details.






