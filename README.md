#  YAANA Livings Web App

Production website and admin dashboard for ** YAANA Livings** built with Next.js App Router, Prisma, Postgres, and Supabase auth.

## Overview

This repository contains:

- Public marketing website (`/`, `/about`, `/rental`, `/blogs`, etc.)
- Admin dashboard (`/admin/*`) for blogs, inquiries, and visits
- API routes under `src/app/api/*`
- Postgres data layer via Prisma
- Supabase auth and storage integration

## Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Prisma + Postgres (`@prisma/adapter-pg`, `pg`)
- Supabase SSR auth (`@supabase/ssr`)
- Supabase Storage for blog images
- Framer Motion for UI animation

## High-Level Architecture

- Route groups:
  - Public: `src/app/(public)/...`
  - Admin: `src/app/(admin)/admin/...`
- Root routes:
  - `src/app/page.tsx` -> home (`/`)
  - `src/app/sitemap.ts` -> sitemap (`/sitemap.xml`)
  - `src/app/robots.ts` -> robots (`/robots.txt`)
- APIs:
  - `src/app/api/admin/blogs/route.ts`
  - `src/app/api/inquiries/route.ts`
  - `src/app/api/visits/route.ts`
  - `src/app/api/auth/*`
- Shared server data layer:
  - `src/lib/blogs.ts` (public blog reads for pages/sitemap)

## Rendering and Caching Strategy

- Static/SSG pages for stable public content.
- Blog and sitemap freshness is driven by on-demand invalidation (`revalidatePath` + `revalidateTag`) from admin blog mutations.
- `/property-details/[slug]` is full SSG with static params + `dynamicParams = false`.
- Admin-sensitive APIs use:
  - `Cache-Control: no-store, no-cache, must-revalidate`
- Public blog read helpers in `src/lib/blogs.ts` use `unstable_cache` with the `blogs` tag.

## Runtime Strategy

Why Prisma must run on Node runtime:

- Prisma uses Node database drivers and pooling (`pg`, `@prisma/adapter-pg`) and must not run on Edge.

Why Edge can interfere with static generation and ISR:

- Edge runtime on a page/layout disables static generation for that route.
- For content pages that depend on static rendering + on-demand invalidation, avoid Edge runtime.

When Edge is safe:

- Lightweight handlers that only read request data/headers and return a response without DB access.

Current runtime architecture:

- Public pages: static rendering with on-demand revalidation where needed.
- API routes with DB access (blogs admin/public reads via Prisma, inquiries, visits): Node runtime/default Node.
- Middleware: Edge runtime (default), kept lightweight.
- No pages use Edge runtime.

Examples:

```ts
// SAFE edge example
export const runtime = 'edge'
```

```ts
// NOT SAFE: page using prisma or revalidate
export const runtime = 'edge' // invalid for Prisma/revalidate pages
```

## Security Model

- Middleware (`src/middleware.ts`) protects `/admin/*`.
- API-level auth checks are enforced in route handlers for sensitive methods.
- `POST /api/inquiries` and `POST /api/visits` are intentionally public.

## Database

Prisma schema: `prisma/schema.prisma`

Models:

- `Blog`
- `Inquiry`
- `Visit`

Important indexes include:

- Blog: `slug`, `published`, `publishedAt`, `(published, publishedAt DESC)`
- Inquiry: `(status, createdAt)`
- Visit: `(status, createdAt)`

Text search recommendation:

- If `title/slug/excerpt` search volume grows, add Postgres `pg_trgm` GIN indexes via SQL migration.

## Environment Variables

Required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (storage/admin operations)
- `DATABASE_URL` (pooled runtime connection, preferred)
- `DIRECT_URL` (direct DB connection for migrations)

Optional:

- `NEXT_PUBLIC_SITE_URL`
- `VERCEL_URL`

## Local Development

1. Install dependencies

```bash
npm install
```

2. Set env values in `.env.local`

3. Generate Prisma client

```bash
npm run db:generate
```

4. Run migrations (dev)

```bash
npm run db:migrate:dev
```

5. Start dev server

```bash
npm run dev
```

## Build and Run

```bash
npm run build
npm start
```

## Tests and Perf Checks

```bash
npm test
npm run perf:index-check
```

## Performance Checklist

- Keep public reads in server data utilities (`src/lib/blogs.ts`) instead of internal HTTP fetches.
- Use `unstable_cache` for stable repeated reads and invalidate with `revalidateTag`.
- Prefer on-demand invalidation for CMS/admin-managed content.
- Use `runtime = 'edge'` only for lightweight handlers with no DB logic.
- Keep Prisma-backed routes on Node runtime.

### Fetch Caching Example

```ts
const blogs = await getBlogList(12)
```

### API Cache Header Example

```ts
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  },
})
```

### On-Demand Revalidation Example

```ts
import { revalidatePath, revalidateTag } from 'next/cache'

revalidateTag('blogs')
revalidatePath('/blogs')
revalidatePath('/blogs/my-slug')
revalidatePath('/sitemap.xml')
```

## Performance and SEO Strategy

### Rendering Strategy

- `SSG`: use for static marketing pages that rarely change.
- `ISR`: use when data updates periodically but must still be cacheable.
- `SSR/dynamic`: use only when request-time personalization/auth is required.
- Current practical strategy:
  - Public content pages are static/SSG-first.
  - Blog freshness comes from admin-triggered `revalidatePath` + `revalidateTag`.
  - DB-backed API routes run on Node runtime.

### Vercel Caching and Cost Optimization

- Put CDN cache headers on truly public API reads:
  - `public, s-maxage=3600, stale-while-revalidate=86400`
- Keep admin and mutable responses as:
  - `no-store, no-cache, must-revalidate`
- Use bounded pagination (`page >= 1`, `1 <= limit <= 50`) to avoid expensive large scans.
- Cache repeated stable reads with `unstable_cache` and invalidate via tags/paths on mutation.

### Metadata and SEO Best Practices (Next.js Metadata API)

- Ensure every indexable page has:
  - `title`
  - `description`
  - canonical URL via `alternates.canonical`
  - Open Graph metadata
- Use `metadataBase` in root layout so relative canonical/OG URLs resolve correctly.
- Keep sitemap complete for all important static routes plus dynamic content URLs.

### Before / After Metadata Example

Before:

```ts
export const metadata = {
  title: 'Gallery | yaanalivings',
  description: 'Photo gallery',
}
```

After:

```ts
export const metadata = {
  title: 'Gallery | yaanalivings',
  description: 'Photo gallery',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery | yaanalivings',
    description: 'Photo gallery',
    url: '/gallery',
  },
}
```

### Before / After Cache Header Example

Before:

```ts
return NextResponse.json(data)
```

After:

```ts
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  },
})
```

### Minimizing Client Bundle and Repetitive API Calls

- Lazy-load heavy editor/tooling components in admin flows.
- Keep data-heavy queries on the server where possible.
- Avoid repeated client fetches for the same resource unless user action or cache invalidation requires it.
- Prefer pagination and narrow `select` projections for DB queries.

## Prisma Commands

- `npm run db:generate`
- `npm run db:migrate:dev`
- `npm run db:migrate`
- `npm run db:push`
- `npm run db:studio`
- `npm run db:seed`
- `npm run db:reset`

## API Documentation

OpenAPI spec is included at:

- `docs/openapi.yaml`

You can import this file into Swagger Editor or Postman.

## AI + Team Context

Detailed project context optimized for both humans and LLM agents:

- `docs/AI_CONTEXT.md`
