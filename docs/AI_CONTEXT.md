# AI + Human Context (YAANA Livings)

This file is optimized for:

- LLM assistants generating code safely in this repo
- Human developers onboarding quickly

## 1) Product Summary

YAANA is a marketing + admin web app for **premium, safe ladies accommodation** (PG / hostel-style shared living) in **Bengaluru, Karnataka**.

- Public site: branding, properties, blogs, lead forms (inquiries + visits).
- Admin site: manage blogs, inquiries, and visits.
- APIs: app-native route handlers under `src/app/api/*`.

## 2) Tech and Runtime

- Next.js 14 App Router
- React 18 + TypeScript
- Tailwind CSS
- Prisma + Postgres (`@prisma/adapter-pg`)
- Supabase auth (`@supabase/ssr`) + storage

Important runtime rule:

- Prisma runtime should prefer pooled `DATABASE_URL`.
- `DIRECT_URL` is for migrations/tooling.

## 3) Folder Map

- `src/app/(public)/...` public routes
- `src/app/(admin)/admin/...` admin UI routes
- `src/app/api/*/route.ts` API handlers
- `src/lib/blogs.ts` server-only blog read layer for public pages/sitemap
- `src/lib/prisma.ts` Prisma client singleton
- `src/lib/supabase/*` Supabase browser/server clients
- `prisma/schema.prisma` DB schema + indexes

## 4) Data Models

From Prisma:

- `Blog`
  - public content with publish state + SEO fields
- `Inquiry`
  - contact lead
- `Visit`
  - scheduled property visit

Key indexes:

- Blog: `slug`, `published`, `publishedAt`, `(published, publishedAt DESC)`
- Inquiry: `(status, createdAt)`
- Visit: `(status, createdAt)`

Search scaling note:

- Blog `contains`/`ILIKE` search should be upgraded to `pg_trgm` + GIN indexes when content volume grows.

## 5) Auth and Security Boundaries

- Middleware protects `/admin/*` routes.
- API security is also enforced in handlers (do not rely only on middleware).

Current policy:

- `POST /api/inquiries` is public.
- `POST /api/visits` is public.
- `GET/PATCH/DELETE` for inquiries + visits require authenticated admin session.
- Blog writes (`POST/PUT/DELETE`) require authenticated session.
- Admin-sensitive API responses use `Cache-Control: no-store, no-cache, must-revalidate`.

## 6) Caching and Revalidation

Public rendering strategy:

- `/blogs`: static + on-demand invalidation
- `/blogs/[slug]`: static params + on-demand invalidation for content changes
- `/property-details/[slug]`: static params + `dynamicParams = false`
- `/sitemap.xml`: on-demand invalidation after blog mutations
- Public blog reads are wrapped with `unstable_cache` in `src/lib/blogs.ts` and tagged with `blogs`.

Blog mutation invalidation contract:

- Revalidate `/`
- Revalidate `/blogs`
- Revalidate `/blogs/[new-slug]`
- Revalidate `/blogs/[old-slug]` when slug changes
- Revalidate `/sitemap.xml`

Do not remove this contract.

## 7) API Contract Notes

### Admin Blogs (`/api/admin/blogs`)

- `GET` admin-only list (and `id` lookup)
- `POST` create (multipart, image required)
- `PUT` update (multipart, optional image)
- `DELETE` by query `id`
- all responses are `no-store`

### Inquiries (`/api/inquiries`)

- `GET` admin-only list with paging/filter
- `POST` public create
- `PATCH` admin-only status update
- `DELETE` admin-only delete by `id`

### Visits (`/api/visits`)

- same access pattern as inquiries

## 8) Development Workflow

Standard:

```bash
npm install
npm run db:generate
npm run db:migrate:dev
npm run dev
```

Build:

```bash
npm run build
npm start
```

## 9) Common Failure Modes

1. Build-time internal fetch failures:
   - Avoid fetching own API from server components during build.
   - Prefer server data functions (`src/lib/blogs.ts`) over `fetch(baseUrl + /api/...)`.

2. Stale public content:
   - Ensure blog mutation revalidation paths are preserved.

3. Admin data leakage:
   - Never relax auth checks on inquiries/visits admin methods.
   - Keep `no-store` cache headers on admin-sensitive responses.
   - Keep public and admin blog APIs separate.

4. Fast Refresh hook error in dev:
   - Usually stale HMR state. Restart dev server and clear `.next`.

## 10) Safe Change Guidelines

When editing:

- Prefer extending existing utility/data layers over duplicating query logic.
- Keep public and admin concerns separated.
- Keep API contracts backward compatible for admin UI calls.
- Validate with:
  - `npm run build`
  - quick auth-path checks for protected APIs

## 11) Related Docs

- Main README: `README.md`
- OpenAPI spec: `docs/openapi.yaml`
- Agent instructions/context: `AGENTS.md`
