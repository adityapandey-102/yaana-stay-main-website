import { Prisma } from '@prisma/client'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey)

const STORAGE_BUCKET = 'yaana'

function getPublicUrl(storagePath: string): string {
  const { data } = supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(storagePath)
  return data.publicUrl
}

export async function getBlogs({
  page = 1,
  limit = 10,
  q = '',
}: {
  page?: number
  limit?: number
  q?: string
}) {
  return getPaginatedBlogs(page, limit, q)
}

export const getBlogList = unstable_cache(
  async (limit = 12, q = '') => {
    const safeLimit = Math.min(limit, 50)
    const where: Prisma.BlogWhereInput = { published: true }

    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { slug: { contains: q, mode: 'insensitive' } },
        { excerpt: { contains: q, mode: 'insensitive' } },
      ]
    }

    const blogs = await prisma.blog.findMany({
      where,
      take: safeLimit,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        published: true,
        publishedAt: true,
        createdAt: true,
      },
    })

    return blogs.map((blog) => ({
      ...blog,
      featuredImageUrl: blog.featuredImage ? getPublicUrl(blog.featuredImage) : null,
    }))
  },
  ['blogs:list'],
  { tags: ['blogs'] }
)

export const getPaginatedBlogs = unstable_cache(
  async (page = 1, limit = 10, q = '') => {
    const safeLimit = Math.min(limit, 50)
    const skip = (page - 1) * safeLimit
    const where: Prisma.BlogWhereInput = { published: true }

    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { slug: { contains: q, mode: 'insensitive' } },
        { excerpt: { contains: q, mode: 'insensitive' } },
      ]
    }

    const [blogs, totalCount] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: safeLimit,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          featuredImage: true,
          published: true,
          publishedAt: true,
          createdAt: true,
        },
      }),
      prisma.blog.count({ where }),
    ])

    const blogsWithImageUrls = blogs.map((blog) => ({
      ...blog,
      featuredImageUrl: blog.featuredImage ? getPublicUrl(blog.featuredImage) : null,
    }))

    return {
      blogs: blogsWithImageUrls,
      meta: {
        totalCount,
        totalPages: Math.ceil(totalCount / safeLimit),
        currentPage: page,
        limit: safeLimit,
      },
    }
  },
  ['blogs:paginated'],
  { tags: ['blogs'] }
)

const getBlogBySlugCached = unstable_cache(
  async (slug: string) => {
    const blog = await prisma.blog.findFirst({
      where: {
        published: true,
        slug,
      },
    })

    if (!blog) {
      return null
    }

    return {
      ...blog,
      featuredImageUrl: blog.featuredImage ? getPublicUrl(blog.featuredImage) : null,
    }
  },
  ['blogs:by-slug'],
  { tags: ['blogs'] }
)

export async function getBlogBySlug(slug: string) {
  return getBlogBySlugCached(slug)
}

export const getAllPublishedBlogs = unstable_cache(
  async () =>
    prisma.blog.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        updatedAt: true,
        publishedAt: true,
      },
    }),
  ['blogs:published-all'],
  { tags: ['blogs'] }
)
