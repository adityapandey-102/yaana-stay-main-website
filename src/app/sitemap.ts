import { MetadataRoute } from 'next'
import { getAllPublishedBlogs } from '@/lib/blogs'
import { RENTAL_PROPERTIES } from '@/data/properties'
import { logError } from '@/lib/logging'
import { getBaseUrl } from '@/lib/site'

const SITE_URL = getBaseUrl()
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs: Awaited<ReturnType<typeof getAllPublishedBlogs>> = []
  try {
    blogs = await getAllPublishedBlogs()
  } catch (error) {
    logError('Sitemap blog fetch failed:', error)
    blogs = []
  }
  const propertyRoutes = RENTAL_PROPERTIES.map(
    (property) => `/property-details/${property.slug}`
  )
  const staticRoutes = [
    '/',
    '/about',
    '/rental',
    '/blogs',
    '/contact',
    '/life-at-yaana',
    '/privacy',
    '/terms',
    ...propertyRoutes,
  ]

  const blogUrls: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    // Prefer content timestamps for better SEO freshness signaling.
    lastModified: blog.updatedAt ?? blog.publishedAt ?? new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/blogs' ? 0.8 : 0.7,
  }))

  return [...staticUrls, ...blogUrls]
}
