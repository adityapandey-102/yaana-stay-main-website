# YAANA Livings - Production Best Practices Playbook

This document captures the practical patterns implemented in this project so you can reuse them in future builds.

## 1) Architecture Snapshot

- Framework: Next.js 14 App Router, TypeScript.
- Data layer: Prisma + Postgres.
- Auth: Supabase SSR auth for admin boundary.
- Storage: Supabase Storage for blog media.
- Rendering mix:
  - SSG: static content routes (property slugs from local constants).
  - Static + on-demand revalidation: blog routes and sitemap.
  - SSR/CSR: admin dashboard flows and user-session-sensitive screens.

Reference files:
- `src/lib/prisma.ts`
- `src/lib/blogs.ts`
- `src/app/(public)/blogs/page.tsx`
- `src/app/(public)/blogs/[slug]/page.tsx`
- `src/app/(public)/property-details/[slug]/page.tsx`
- `src/app/sitemap.ts`
- `src/app/api/admin/blogs/route.ts`
- `src/app/api/inquiries/route.ts`
- `src/app/api/visits/route.ts`
- `prisma/schema.prisma`

## 2) Best Practices Implemented

### 2.1 Cost Optimization

- Removed internal HTTP calls for server rendering paths; server components use direct server data layer (`src/lib/blogs.ts`) instead of `fetch('/api/...')`.
  - Benefit: avoids extra network hop, lower Vercel function duration, lower failure risk during build.
- Mixed rendering strategy (SSG + on-demand revalidation + dynamic where needed) reduces compute and DB load.
- Prisma uses pooled runtime connection (`DATABASE_URL`) first (`src/lib/prisma.ts`), reducing connection churn in serverless.

### 2.2 Performance Optimization

- Blog listing/detail use static generation with on-demand revalidation for low-latency cached responses.
- Blog detail prebuilds hot slugs (`generateStaticParams`, top 10 latest) for faster first hit on high-value pages.
- `next/image` improvements in critical areas (`sizes`, `priority` for LCP hero image).
- Query-level optimization:
  - Pagination with `skip/take`.
  - Bounded query params (`page >= 1`, `1 <= limit <= 50`) in list APIs.
  - Select only required columns for listing views.
  - Parallel DB calls for list + count via `Promise.all`.
- Prisma schema includes useful indexes for common filters/sorts.

### 2.3 SEO Optimization

- Metadata coverage on public blog routes (`title`, `description`, OpenGraph, Twitter).
- JSON-LD article schema on blog detail pages.
- Sitemap generation includes blog URLs with dynamic `lastModified` (`updatedAt ?? publishedAt ?? new Date()`).
- Sitemap is regenerated with mutation-triggered freshness after blog mutations.

### 2.4 Caching and Revalidation Correctness

- Public blogs:
  - `/blogs`: static output with on-demand revalidation.
  - `/blogs/[slug]`: static prebuild for hot slugs + on-demand revalidation.
- Property detail pages:
  - SSG with fixed static params + `dynamicParams = false`.
- Mutation-triggered cache invalidation on blog write paths:
  - `/`
  - `/blogs`
  - `/blogs/[new-slug]`
  - `/blogs/[old-slug]` (if slug changed)
  - `/sitemap.xml`
- Admin/sensitive APIs return `Cache-Control: no-store, no-cache, must-revalidate` on protected methods to avoid accidental CDN/proxy caching.

### 2.5 API Security Boundaries

- Public POST remains open for inquiry/visit lead capture.
- Admin-only methods (`GET`, `PATCH`, `DELETE`) enforce auth inside route handlers, not only middleware.
- This ensures direct API access is protected even if frontend/middleware assumptions fail.

### 2.6 Database Query and Schema Hygiene

- Blog indexes:
  - `@@index([slug])`
  - `@@index([published])`
  - `@@index([publishedAt])`
  - `@@index([published, publishedAt(sort: Desc)])`
- Inquiry/Visit indexes:
  - `@@index([status, createdAt])`
- Pattern: index by common WHERE + ORDER BY paths to reduce scan cost.

## 3) Rendering Strategy Matrix (Current)

- `/` (home): static/public marketing behavior with server data sections.
- `/blogs`: static list page + on-demand revalidation.
- `/blogs/[slug]`: static detail + hot slug prebuild + on-demand revalidation.
- `/property-details/[slug]`: SSG only (no runtime fallback due to `dynamicParams = false`).
- `/admin/*`: session-sensitive, dynamic/admin UX.

Guideline reused in future:
- SSG: immutable/static datasets.
- Static + on-demand revalidation: public content updated by CMS/admin actions.
- SSR: user-specific, auth-sensitive, or truly real-time.
- CSR: interaction-heavy dashboard widgets where SEO is not required.

## 4) Scalability Assessment

Current architecture is suitable for small-to-mid production scale with good cache behavior:

- Strong points:
  - Public traffic mostly served from static + on-demand cache.
  - Database pressure reduced via indexing, pagination, and direct server data layer.
  - Connection pooler-first Prisma config for serverless.
  - Explicit mutation revalidation prevents stale SEO/public pages.

- Likely practical scale envelope (without major redesign):
  - High read traffic on public pages (because of static caching + CDN headers).
  - Moderate write/admin load.
  - DB will remain the main bottleneck if traffic grows without read replicas/query offloading.

- Next scaling milestones (when needed):
  - Add cursor pagination for very large tables.
  - Add observability + slow query tracking.
  - Move heavy search/filter to dedicated search infra if content grows significantly.
  - Add queue/background jobs for heavy media processing.

## 5) Reusable Execution Plan for New Projects (Step-by-Step)

1. Classify every route by data volatility and SEO requirement.
2. Assign rendering mode per route: SSG, ISR, SSR, or CSR.
3. Create server-only data access layer (no server-side internal API fetch loops).
4. Define cache policy per route (revalidate interval or no-store).
5. Define cache invalidation matrix per mutation (all affected routes + sitemap/feeds).
6. Implement auth boundaries inside route handlers (not just middleware).
7. Add DB indexes for every frequent filter/sort/pagination path.
8. Optimize list endpoints: pagination, selective fields, parallel count/list.
9. Add metadata, OpenGraph, Twitter, and JSON-LD for SEO pages.
10. Generate sitemap/robots with mutation-triggered freshness and complete static URL coverage.
11. Add `.env.example` with safe placeholders and clear required/optional sections.
12. Validate with build + production-like smoke tests before deployment.

## 6) Cache Invalidation Checklist Template

For each content mutation (create/update/delete):

- Revalidate collection page (`/blogs`).
- Revalidate dependent landing page (`/`).
- Revalidate detail page (`/blogs/[slug]`).
- If slug changed, revalidate old slug and new slug.
- Revalidate sitemap (`/sitemap.xml`).

Rule: never ship a mutation endpoint until invalidation list is explicit and tested.

## 7) Practical Guardrails to Keep

- Never call internal API routes from server components during build-time rendering.
- Keep admin API responses non-cacheable (`no-store`).
- Prefer pooled DB URL in runtime; keep direct URL for migrations only.
- Keep comments only where behavior is non-obvious (SSG boundaries, cache invalidation, auth boundaries).

## 8) Current Gaps / Watch List

- There are some encoding artifacts in a few UI strings (display text quality issue, not architecture-critical).
- As data volume grows, consider cursor-based pagination and query profiling.
- Add request rate limiting and audit logs if admin/security requirements increase.

## 9) Definition of Done for Production Hardening

- `next build` succeeds without prerender network failures.
- Public SEO pages are cached and refresh correctly after mutations.
- Admin-protected APIs reject unauthenticated reads/updates/deletes.
- Sitemap freshness reflects content updates.
- DB indexes align with real query patterns.
- Environment variable contract is documented and committed via `.env.example`.

---

Use this file as a baseline for future projects. Re-apply the same sequence first, then only add complexity when scale/requirements justify it.
