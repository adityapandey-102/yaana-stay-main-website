'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import BlogForm from '../BlogForm'

export default function NewBlogPage() {
  const [ready, setReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/admin/login')
        return
      }
      setReady(true)
    }

    checkAuth()
  }, [router])

  if (!ready) {
    return (
      <div className="bg-white rounded-2xl  h-[100vh] border-slate-200 p-16 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-7 h-7 border-2 border-slate-200 border-t-slate-700 rounded-full animate-spin" />
              <p className="text-sm text-slate-400">Loading blogs...</p>
            </div>
          </div>
    )
  }

  return <BlogForm />
}

