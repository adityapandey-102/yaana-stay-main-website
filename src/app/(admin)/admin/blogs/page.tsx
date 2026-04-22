"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { logError } from '@/lib/logging'
import { ArrowLeft, Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'

type Blog = {
  id: string
  title: string
  slug: string
  published: boolean
  createdAt: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<Blog | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch('/api/admin/blogs')
        if (res.status === 401) {
          router.push('/admin/login')
          return
        }
        const data = await res.json()
        setBlogs(Array.isArray(data.blogs) ? data.blogs : [])
      } catch (error) {
        logError('Failed to fetch blogs:', error)
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [router])

  async function handleDelete(blog: Blog) {
    setDeletingId(blog.id)
    setConfirmDelete(null)
    try {
      const res = await fetch(`/api/admin/blogs?id=${encodeURIComponent(blog.id)}`, { method: 'DELETE' })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        alert(data?.error || 'Failed to delete blog')
        return
      }
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id))
    } catch (error) {
      logError('Failed to delete blog:', error)
      alert('Failed to delete blog')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Blog</h3>
            <p className="text-slate-500 text-sm mb-1">Are you sure you want to delete:</p>
            <p className="text-slate-800 font-medium text-sm mb-6 bg-slate-50 rounded-lg px-3 py-2">{confirmDelete.title}</p>
            <p className="text-xs text-red-500 mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <span className="text-slate-300">|</span>
              <h1 className="text-base font-semibold text-slate-900">Blogs</h1>
              {!loading && (
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                  {blogs.length} total
                </span>
              )}
            </div>
            <Link
              href="/admin/blogs/new"
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create Blog</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-7 h-7 border-2 border-slate-200 border-t-slate-700 rounded-full animate-spin" />
              <p className="text-sm text-slate-400">Loading blogs...</p>
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Pencil className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-slate-700 font-medium mb-1">No blogs yet</p>
            <p className="text-slate-400 text-sm mb-5">Get started by creating your first blog post.</p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create your first blog
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-slate-100">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Title</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Slug</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Created</th>
                    <th className="px-5 py-3.5 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 max-w-xs">
                        <p className="text-sm font-medium text-slate-900 break-words leading-snug">{blog.title}</p>
                      </td>
                      <td className="px-5 py-4 max-w-[180px]">
                        <p className="text-xs text-slate-400 font-mono break-all">{blog.slug}</p>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          blog.published
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/blogs/${blog.id}/edit`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            Edit
                          </Link>
                          {blog.published && (
                            <Link
                              href={`/blogs/${blog.slug}`}
                              target="_blank"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              View
                            </Link>
                          )}
                          <button
                            onClick={() => setConfirmDelete(blog)}
                            disabled={deletingId === blog.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-40 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            {deletingId === blog.id ? 'Deleting…' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-sm font-semibold text-slate-900 leading-snug">{blog.title}</p>
                    <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${
                      blog.published
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mb-1 break-all">{blog.slug}</p>
                  <p className="text-xs text-slate-400 mb-4">{new Date(blog.createdAt).toLocaleDateString()}</p>
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <Link
                      href={`/admin/blogs/${blog.id}/edit`}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </Link>
                    {blog.published && (
                      <Link
                        href={`/blogs/${blog.slug}`}
                        target="_blank"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> View
                      </Link>
                    )}
                    <button
                      onClick={() => setConfirmDelete(blog)}
                      disabled={deletingId === blog.id}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 disabled:opacity-40 transition-colors border border-red-100 ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {deletingId === blog.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}