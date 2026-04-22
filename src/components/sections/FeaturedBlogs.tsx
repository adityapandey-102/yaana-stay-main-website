import { FeaturedBlogsClient } from "@/components/sections/FeaturedBlogsClient";
import { getBlogList } from "@/lib/blogs";
import { logError } from "@/lib/logging";

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  featuredImageUrl?: string | null;
  publishedAt?: string | null;
};

async function getFeaturedBlogs(): Promise<Blog[]> {
  try {
    const blogs = await getBlogList(4);
    return blogs.map((blog) => ({
      ...blog,
      publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : null,
    }));
  } catch (error) {
    logError("Failed to fetch featured blogs:", error);
    return [];
  }
}

export async function FeaturedBlogs() {
  const blogs = await getFeaturedBlogs();
  return <FeaturedBlogsClient blogs={blogs} />;
}
