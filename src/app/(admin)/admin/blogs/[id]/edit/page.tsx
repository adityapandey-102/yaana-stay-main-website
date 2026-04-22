'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import BlogForm from '../../BlogForm'
import { logError } from '@/lib/logging'

type Blog = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  metaTitle: string | null
  metaDescription: string | null
  published: boolean
}

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      setLoading(true)
      // const supabase = createClient()
      // const {
      //   data: { user },
      // } = await supabase.auth.getUser()

      // if (!user) {
      //   router.push('/admin/login')
      //   return
      // }

      try {
        const res = await fetch(`/api/admin/blogs?id=${encodeURIComponent(params.id)}`)
        if (res.status === 401) {
          router.push('/admin/login')
          return
        }
        const data = await res.json()
        if (!data.blog) {
          router.push('/admin/blogs')
          return
        }
        setBlog(data.blog)
      } catch (error) {
        logError('Failed to fetch blog:', error)
        router.push('/admin/blogs')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [params.id, router])

  if (loading) {
  // if (true) {
    return (
      <div className="bg-white rounded-2xl border h-[100vh] border-slate-200 p-16 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-7 h-7 border-2 border-slate-200 border-t-slate-700 rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading blogs...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return null
  }

  return <BlogForm blog={blog} />
}
