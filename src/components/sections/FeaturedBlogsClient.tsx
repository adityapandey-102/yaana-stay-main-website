"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionFade } from "@/components/ui/section-fade";
import { CalendarDays } from "lucide-react";
import { LavenderWallpaper } from "../decor/LavenderWallpaper";

type FeaturedBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  featuredImageUrl?: string | null;
  publishedAt?: string | null;
};

type Props = {
  blogs: FeaturedBlog[];
};

export function FeaturedBlogsClient({ blogs }: Props) {
  if (!blogs.length) return null;

  const getImageSrc = (blog: FeaturedBlog) => {
    if (blog.featuredImageUrl) return blog.featuredImageUrl;
    if (!blog.featuredImage) return null;
    if (
      blog.featuredImage.startsWith("http://") ||
      blog.featuredImage.startsWith("https://") ||
      blog.featuredImage.startsWith("/")
    ) {
      return blog.featuredImage;
    }
    return `/${blog.featuredImage}`;
  };

  return (
    <>
    <section className="relative overflow-hidden py-20 lg:py-28">
      <LavenderWallpaper />
      
      <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yaana-nearblack mb-6 tracking-tight">
            Insights from  YAANA
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-yaana-charcoal leading-relaxed">
            A curated space for updates, insights, and the latest from YAANA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="group rounded-card border border-lavender-200 overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full block"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-lavender-100 flex items-center justify-center text-yaana-charcoal/70 text-xs font-semibold uppercase">
                {getImageSrc(blog) ? (
                  <Image
                    src={getImageSrc(blog)!}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <div className="p-4 flex flex-col h-full justify-between">
                <div>
                  {blog.publishedAt && (
                    <div className="flex items-center gap-1 text-xs text-yaana-charcoal/60 mb-2">
                      <CalendarDays className="w-3 h-3" />
                      <span>
                        {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}

                  <h3 className="font-serif font-semibold text-base text-yaana-nearblack mb-2 leading-tight line-clamp-2">
                    {blog.title}
                  </h3>

                  {blog.excerpt && (
                    <p className="text-sm text-yaana-charcoal/80 line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>
                  )}
                </div>

                <div className="w-full text-center bg-yaana-nearblack text-white rounded-md py-2 text-xs font-semibold uppercase tracking-wider group-hover:bg-lavender-600 transition-colors">
                  Read More
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SectionFade>
    </section>
    </>
  );
}
