'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowLeft, ImagePlus, Globe, FileText, CheckCircle2, Circle } from 'lucide-react'

const RichTextEditor = dynamic(() => import('@/components/editor/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="h-64 border border-slate-200 rounded-xl animate-pulse bg-slate-50" />,
})

type Blog = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  featuredImageUrl?: string | null
  metaTitle: string | null
  metaDescription: string | null
  published: boolean
}

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const inputClass = "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-white placeholder:text-slate-300"
const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-sm font-semibold text-slate-700 mb-5 pb-3 border-b border-slate-100">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

export default function BlogForm({ blog }: { blog?: Blog }) {
  const [title, setTitle] = useState(blog?.title || '')
  const [slug, setSlug] = useState(blog?.slug || '')
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '')
  const [content, setContent] = useState(blog?.content || '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(blog?.featuredImageUrl || '')
  const [metaTitle, setMetaTitle] = useState(blog?.metaTitle || '')
  const [metaDescription, setMetaDescription] = useState(blog?.metaDescription || '')
  const [published, setPublished] = useState(blog?.published || false)
  const [error, setError] = useState('')
  const [imageError, setImageError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function generateSlug(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  }

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!blog) setSlug(generateSlug(value))
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setImageError('')
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setImageError('Image size must be less than 5MB')
        e.target.value = ''
        return
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setImageError('Only JPEG, PNG, and WebP images are allowed')
        e.target.value = ''
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!blog && !imageFile) {
      setError('A featured image is required for new blogs.')
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('slug', slug)
    formData.append('excerpt', excerpt)
    formData.append('content', content)
    formData.append('metaTitle', metaTitle || title)
    formData.append('metaDescription', metaDescription || excerpt)
    formData.append('published', published.toString())
    formData.append('publishedAt', published ? new Date().toISOString() : '')
    if (blog) formData.append('id', blog.id)
    if (imageFile) formData.append('image', imageFile)

    try {
      const response = await fetch('/api/admin/blogs', {
        method: blog ? 'PUT' : 'POST',
        body: formData,
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Failed to save blog')
      router.push('/admin/blogs', { scroll: false })
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/blogs"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Blogs</span>
              </Link>
              <span className="text-slate-300">|</span>
              <h1 className="text-base font-semibold text-slate-900">{blog ? 'Edit Blog' : 'New Blog'}</h1>
            </div>

            {/* Publish toggle + save — desktop */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPublished(!published)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  published
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                {published ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                {published ? 'Published' : 'Draft'}
              </button>
              <button
                form="blog-form"
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Saving...' : blog ? 'Update Blog' : 'Create Blog'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">

          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              <span className="mt-0.5">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column — main content */}
            <div className="lg:col-span-2 space-y-6">

              {/* Core fields */}
              <Section title="Post Details">
                <div>
                  <label className={labelClass}>Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter blog title"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    className={inputClass + ' font-mono'}
                  />
                  <p className="mt-1.5 text-xs text-slate-400">
                    URL: <span className="font-mono">/blogs/{slug || 'your-slug'}</span>
                  </p>
                </div>
                <div>
                  <label className={labelClass}>Excerpt</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    placeholder="A short summary shown in blog listings…"
                    className={inputClass + ' resize-none'}
                  />
                </div>
              </Section>

              {/* Content editor */}
              <Section title="Content *">
                <RichTextEditor value={content} onChange={setContent} />
              </Section>

              {/* SEO */}
              <Section title="SEO & Meta">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span>These fields help search engines understand your post.</span>
                </div>
                <div>
                  <label className={labelClass}>Meta Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={title || 'Will use title if empty'}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Meta Description</label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder={excerpt || 'Will use excerpt if empty'}
                    rows={2}
                    className={inputClass + ' resize-none'}
                  />
                </div>
              </Section>
            </div>

            {/* Right column — sidebar */}
            <div className="space-y-6">

              {/* Publish (mobile) */}
              <div className="lg:hidden bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <h2 className="text-sm font-semibold text-slate-700 mb-4 pb-3 border-b border-slate-100">Publish</h2>
                <button
                  type="button"
                  onClick={() => setPublished(!published)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all mb-3 ${
                    published
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  {published ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  {published ? 'Published' : 'Draft'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Saving...' : blog ? 'Update Blog' : 'Create Blog'}
                </button>
              </div>

              {/* Featured image */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <h2 className="text-sm font-semibold text-slate-700 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <ImagePlus className="w-4 h-4 text-slate-400" />
                  Featured Image {!blog && <span className="text-red-400">*</span>}
                </h2>

                {imagePreview ? (
                  <div className="mb-4">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-100">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => { setImagePreview(''); setImageFile(null) }}
                      className="mt-2 text-xs text-slate-400 hover:text-red-500 transition-colors"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-all mb-3">
                    <ImagePlus className="w-8 h-8 text-slate-300 mb-2" />
                    <span className="text-xs text-slate-400">Click to upload image</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}

                {!imagePreview && (
                  <label className="flex items-center justify-center w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors">
                    <span>Choose file</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}

                {imageError && <p className="mt-2 text-xs text-red-500">{imageError}</p>}
                <p className="mt-2 text-xs text-slate-400">Max 5MB · JPEG, PNG, WebP</p>
              </div>

              {/* Status indicator — desktop */}
              <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <h2 className="text-sm font-semibold text-slate-700 mb-3 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  Status
                </h2>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setPublished(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all ${
                      !published
                        ? 'bg-amber-50 text-amber-700 border-amber-200 font-medium'
                        : 'text-slate-400 border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <Circle className="w-4 h-4" /> Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => setPublished(true)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all ${
                      published
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium'
                        : 'text-slate-400 border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" /> Published
                  </button>
                </div>
              </div>

              {/* Cancel */}
              <Link
                href="/admin/blogs"
                className="block text-center px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}