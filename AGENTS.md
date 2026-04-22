# Project Context: YAANA Livings (yaanaPropertiesFinal)

This file is a concise, shared context for humans and AI agents working in this repository.

## Summary
This repo is a Next.js 14 (App Router) website for **YAANA Properties** — premium, safe ladies accommodation (PG / hostel-style shared living) in **Bengaluru, Karnataka**. It includes a public marketing site, a gated admin area, and API routes backed by a Postgres database via Prisma. Supabase is used for authentication.

## Tech Stack
- Framework: Next.js 14 (App Router), React 18, TypeScript
- Styling: TailwindCSS, Shadcn UI (Radix primitives)
- Animation: Framer Motion
- Data: Prisma + Postgres (with `@prisma/adapter-pg`)
- Auth: Supabase SSR (`@supabase/ssr`)

## Project Structure (High Level)
- `src/app/`: App Router pages, route groups, layouts, and API routes
- `src/components/`: Shared UI, sections, modals, layout elements
- `src/data/`: Static content (amenities, properties, contact)
- `src/lib/`: Shared utilities (Prisma, Supabase, SEO helpers, validators)
- `prisma/`: Prisma schema and migrations
- `public/`: Static assets (images under `public/assets/`)
- `scripts/`: Utilities (download images, seed DB)

## Routing Model
App Router with route groups:
- Public site: `src/app/(public)/...`
- Admin area: `src/app/(admin)/admin/...`
- API routes: `src/app/api/*/route.ts`

Key routes:
- `/` home: `src/app/page.tsx`
- `/blogs` and `/blogs/[slug]`: public blog pages
- `/rental` and `/property-details/[slug]`: public property pages
- `/life-at-yaana`: gallery + lifestyle page
- `/admin/*`: admin pages (login, dashboard, blogs, inquiries, visits)
- API endpoints:
  - `/api/admin/blogs` (admin CRUD)
  - `/api/inquiries`
  - `/api/visits`

## Auth and Middleware
Supabase auth is used to protect admin pages.
- Middleware: `src/middleware.ts`
  - Redirects unauthenticated requests to `/admin/login`
  - Redirects authenticated users away from `/admin/login` to `/admin/dashboard`
  - Matcher: `/admin/:path*`

## Data and Database
Prisma schema: `prisma/schema.prisma`
- Models: `Blog`, `Inquiry`, `Visit`
- Enums: `InquiryStatus`, `VisitStatus`

Prisma client setup: `src/lib/prisma.ts`
- Uses `DIRECT_URL` or `DATABASE_URL`
- Pooling via `@prisma/adapter-pg` + `pg`

Supabase auth clients:
- Browser: `src/lib/supabase/client.ts`
- Server: `src/lib/supabase/server.ts`

Validators:
- Zod schemas in `src/lib/validations.ts`

## API Endpoints
- `GET /api/admin/blogs`: admin blog list/details (`?id=`), auth required
- `POST /api/admin/blogs`: create blog (auth required)
- `PUT /api/admin/blogs`: update blog (auth required)
- `DELETE /api/admin/blogs`: delete blog by `?id=` (auth required)
- `GET/POST/PATCH/DELETE /api/inquiries`: CRUD for contact inquiries
- `GET/POST/PATCH/DELETE /api/visits`: CRUD for scheduled visits

## SEO and Metadata
- Global metadata in `src/app/layout.tsx` and `src/app/(public)/layout.tsx`
- Blog JSON-LD is generated in `src/app/(public)/blogs/[slug]/page.tsx`
- `robots.ts` and `sitemap.ts` under `src/app/`

## Images
Images are stored in `public/assets/`. `next.config.mjs` allows remote patterns:
- Any HTTPS host
- Supabase storage (`*.supabase.co`)

## Scripts and Commands
From `package.json`:
- `npm run dev` - dev server
- `npm run build` / `npm start` - production
- Prisma:
  - `npm run db:generate`
  - `npm run db:migrate:dev`
  - `npm run db:migrate`
  - `npm run db:push`
  - `npm run db:studio`
  - `npm run db:seed`
  - `npm run db:reset`

## Environment Variables (Expected)
Required for auth and DB:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL` (pooler)
- `DIRECT_URL` (direct connection for migrations)

Optional:
- `NEXT_PUBLIC_SITE_URL` or `VERCEL_URL` (used by `src/lib/site.ts`)

## Conventions and Practices
- Path alias: `@/*` maps to `src/*`
- App Router with route groups `(public)` and `(admin)`
- API routes handle validation with Zod and return JSON
- Prisma client is singleton in dev to avoid hot-reload connection storms
- Use `public/assets` for local imagery; `next/image` for optimization

## Where to Start
- Public pages: `src/app/(public)/`
- Admin pages: `src/app/(admin)/admin/`
- API handlers: `src/app/api/`
- DB schema: `prisma/schema.prisma`
