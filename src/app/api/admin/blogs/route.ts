import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { logError } from '@/lib/logging'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey)

const STORAGE_BUCKET = 'yaana'
const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
}

function getPublicUrl(storagePath: string): string {
  const { data } = supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(storagePath)
  return data.publicUrl
}

async function requireAdminAuth() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

function revalidateBlogPaths(slug: string, oldSlug?: string) {
  revalidateTag('blogs')
  revalidatePath('/blogs')
  revalidatePath('/')
  if (oldSlug && oldSlug !== slug) {
    revalidatePath(`/blogs/${oldSlug}`)
  }
  revalidatePath(`/blogs/${slug}`)
  revalidatePath('/sitemap.xml')
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdminAuth()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE_HEADERS })
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)
    const q = searchParams.get('q') || ''
    const id = searchParams.get('id')
    const skip = (page - 1) * limit

    if (id) {
      const blog = await prisma.blog.findUnique({ where: { id } })
      if (!blog) {
        return NextResponse.json({ blog: null }, { headers: NO_STORE_HEADERS })
      }

      return NextResponse.json(
        {
          blog: {
            ...blog,
            featuredImageUrl: blog.featuredImage ? getPublicUrl(blog.featuredImage) : null,
          },
        },
        { headers: NO_STORE_HEADERS }
      )
    }

    const where: any = {}
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
        take: limit,
        orderBy: { createdAt: 'desc' },
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

    const blogsWithUrls = blogs.map((blog) => ({
      ...blog,
      featuredImageUrl: blog.featuredImage ? getPublicUrl(blog.featuredImage) : null,
    }))

    return NextResponse.json(
      {
        blogs: blogsWithUrls,
        meta: {
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page,
          limit,
        },
      },
      { headers: NO_STORE_HEADERS }
    )
  } catch (error: any) {
    logError('Admin blogs GET failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500, headers: NO_STORE_HEADERS })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdminAuth()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE_HEADERS })
    }

    const formData = await request.formData()
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const metaTitle = formData.get('metaTitle') as string
    const metaDescription = formData.get('metaDescription') as string
    const published = formData.get('published') === 'true'
    const publishedAt = formData.get('publishedAt') as string
    const file = formData.get('image') as File | null

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Title, slug, and content are required' }, { status: 400, headers: NO_STORE_HEADERS })
    }

    if (!file) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400, headers: NO_STORE_HEADERS })
    }

    const existingBlog = await prisma.blog.findUnique({ where: { slug } })
    if (existingBlog) {
      return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 400, headers: NO_STORE_HEADERS })
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${slug}-${Date.now()}.${fileExt}`
    const storagePath = `blogs/${fileName}`
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500, headers: NO_STORE_HEADERS })
    }

    let blog
    try {
      blog = await prisma.blog.create({
        data: {
          title,
          slug,
          excerpt: excerpt || null,
          content,
          featuredImage: storagePath,
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || excerpt || null,
          published,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
        },
      })
    } catch (prismaError: any) {
      logError('Admin blog create failed:', prismaError)
      await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([storagePath])
      return NextResponse.json({ error: prismaError.message || 'Failed to create blog' }, { status: 500, headers: NO_STORE_HEADERS })
    }

    revalidateBlogPaths(slug)

    return NextResponse.json(
      {
        data: {
          ...blog,
          featuredImageUrl: getPublicUrl(storagePath),
        },
      },
      { status: 201, headers: NO_STORE_HEADERS }
    )
  } catch (error: any) {
    logError('Admin blogs POST failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500, headers: NO_STORE_HEADERS })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAdminAuth()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE_HEADERS })
    }

    const formData = await request.formData()
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const metaTitle = formData.get('metaTitle') as string
    const metaDescription = formData.get('metaDescription') as string
    const published = formData.get('published') === 'true'
    const publishedAt = formData.get('publishedAt') as string
    const file = formData.get('image') as File | null

    if (!id || !title || !slug || !content) {
      return NextResponse.json({ error: 'ID, title, slug, and content are required' }, { status: 400, headers: NO_STORE_HEADERS })
    }

    const existingBlog = await prisma.blog.findUnique({ where: { id } })
    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404, headers: NO_STORE_HEADERS })
    }

    const slugConflict = await prisma.blog.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    })
    if (slugConflict) {
      return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 400, headers: NO_STORE_HEADERS })
    }

    const oldSlug = existingBlog.slug
    let storagePath = existingBlog.featuredImage
    let oldStoragePath: string | null = null

    if (file) {
      if (existingBlog.featuredImage) {
        oldStoragePath = existingBlog.featuredImage
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${slug}-${Date.now()}.${fileExt}`
      storagePath = `blogs/${fileName}`
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const { error: uploadError } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .upload(storagePath, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (uploadError) {
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500, headers: NO_STORE_HEADERS })
      }
    }

    let blog
    try {
      blog = await prisma.blog.update({
        where: { id },
        data: {
          title,
          slug,
          excerpt: excerpt || null,
          content,
          featuredImage: storagePath,
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || excerpt || null,
          published,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
        },
      })
    } catch (prismaError: any) {
      logError('Admin blog update failed:', prismaError)
      if (file && storagePath && storagePath !== existingBlog.featuredImage) {
        await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([storagePath])
      }
      return NextResponse.json({ error: prismaError.message || 'Failed to update blog' }, { status: 500, headers: NO_STORE_HEADERS })
    }

    if (oldStoragePath && file) {
      await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([oldStoragePath])
    }

    revalidateBlogPaths(blog.slug, oldSlug)

    return NextResponse.json(
      {
        data: {
          ...blog,
          featuredImageUrl: storagePath ? getPublicUrl(storagePath) : null,
        },
      },
      { headers: NO_STORE_HEADERS }
    )
  } catch (error: any) {
    logError('Admin blogs PUT failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500, headers: NO_STORE_HEADERS })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAdminAuth()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE_HEADERS })
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400, headers: NO_STORE_HEADERS })
    }

    const blog = await prisma.blog.findUnique({ where: { id } })
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404, headers: NO_STORE_HEADERS })
    }

    await prisma.blog.delete({ where: { id } })

    if (blog.featuredImage) {
      const { error: storageError } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .remove([blog.featuredImage])
      if (storageError) {
        logError('Image cleanup failed for blog:', { id: blog.id, message: storageError.message })
      }
    }

    revalidateBlogPaths(blog.slug)

    return NextResponse.json({ data: { success: true } }, { headers: NO_STORE_HEADERS })
  } catch (error: any) {
    logError('Admin blogs DELETE failed:', error)
    return NextResponse.json({ error: error.message || 'Failed to delete blog' }, { status: 500, headers: NO_STORE_HEADERS })
  }
}
