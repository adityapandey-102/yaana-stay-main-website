import Link from 'next/link'
import { Metadata } from 'next'
import Image from 'next/image'
import { getBlogList } from '@/lib/blogs'
import { logError } from '@/lib/logging'
import { LavenderWallpaper } from '@/components/decor/LavenderWallpaper'

export const metadata: Metadata = {
  title: 'Blogs | YAANA',
  description: 'Insights from YAANA — updates, tips, and stories from our community.',
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: 'Blogs | YAANA',
    description: 'Insights from YAANA — updates, tips, and stories from our community.',
    url: '/blogs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blogs | YAANA',
    description: 'Insights from YAANA — updates, tips, and stories from our community.',
  },
}

type Blog = Awaited<ReturnType<typeof getBlogList>>[number]

function normalizeImageSrc(src?: string | null) {
  if (!src) return null
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
    return src
  }
  return `/${src}`
}

function getBlogImageSrc(blog: { featuredImage?: string | null; featuredImageUrl?: string | null }) {
  return blog.featuredImageUrl || normalizeImageSrc(blog.featuredImage)
}

export default async function BlogsPage() {
  let blogs: Blog[] = []
  try {
    blogs = await getBlogList(12)
  } catch (error) {
    logError('Failed to fetch blogs:', error)
    blogs = []
  }

  return (
    <>
      {/* ================= HERO ================= */}

      <section className="relative py-20 md:py-28 bg-yaana-nearblack-- bg-gradient-to-br   from-purple-200 via-purple-400   to-yaana-dark-lavender/70 overflow-hidden">
        <div className="absolute inset-0">
          <LavenderWallpaper />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-white-- uppercase tracking-tight">
            Insights from  YAANA
          </h1>
          <p className="text-white/90-- mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
            A curated space for updates, insights, and the latest from YAANA.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/rental"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-yaana-nearblack transition hover:bg-white/90"
            >
              Explore Properties
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white-- transition hover:bg-white/10"
            >
              Book a Visit
            </Link>
          </div>
        </div>
      </section>

      {/* ================= BLOG LIST ================= */}
      <section className="relative py-16 overflow-hidden">
        {/* Decorative corners FULL WIDTH */}
        <LavenderWallpaper />

        {/* Centered content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          {blogs.length === 0 ? (
            <p className="text-center text-yaana-charcoal-light">
              No blogs published yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: any) => (
                <article
                  key={blog.id}
                  className="bg-white rounded-card shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-lavender-100 overflow-hidden">
                    {getBlogImageSrc(blog) ? (
                      <Image
                        src={getBlogImageSrc(blog)!}
                        alt={blog.title}
                        fill
                        className="object-cover transition duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs font-semibold uppercase text-yaana-charcoal/60">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg md:text-xl font-semibold mb-3 leading-snug">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="hover:text-lavender-700 transition"
                      >
                        {blog.title}
                      </Link>
                    </h3>

                    {blog.excerpt && (
                      <p className="text-sm text-yaana-charcoal-light mb-6 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between">
                      <time className="text-xs text-yaana-charcoal-light">
                        {blog.publishedAt &&
                          new Date(blog.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                      </time>

                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="text-white bg-black px-4 py-2 text-xs font-medium rounded-btn hover:shadow-md transition"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
