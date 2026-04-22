'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { logError } from '@/lib/logging'
import { User, LogOut, BookOpen, MessageSquare, MapPin, LayoutDashboard, ChevronRight } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (!storedUsername) {
      router.push('/admin/login')
      return
    }
    setUsername(storedUsername)
    setLoading(false)
  }, [router])

  async function handleSignOut() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      logError('Sign out error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
          <p className="text-sm text-slate-500 tracking-wide">Loading...</p>
        </div>
      </div>
    )
  }

  const navItems = [
    {
      href: '/admin/blogs',
      icon: BookOpen,
      title: 'Blogs',
      description: 'Create, edit, and publish blog posts',
      accent: 'bg-violet-50 text-violet-600 group-hover:bg-violet-100',
      border: 'hover:border-violet-200',
    },
    {
      href: '/admin/inquiries',
      icon: MessageSquare,
      title: 'Inquiries',
      description: 'View and respond to customer messages',
      accent: 'bg-sky-50 text-sky-600 group-hover:bg-sky-100',
      border: 'hover:border-sky-200',
    },
    {
      href: '/admin/visits',
      icon: MapPin,
      title: 'Visits',
      description: 'Track and manage customer visits',
      accent: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100',
      border: 'hover:border-emerald-200',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                <span className="text-white text-xs font-bold tracking-wider">Y</span>
              </div>
              <span className="text-slate-900 font-semibold text-base tracking-wide">YAANA</span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* User pill */}
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-full pl-1 pr-3 py-1">
                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700">{username}</span>
              </div>

              {/* Logout button */}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors duration-150"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <LayoutDashboard className="w-4 h-4" />
            <span>Admin Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Welcome back, <span className="font-medium text-slate-700">{username}</span>. Manage your content below.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {navItems.map(({ href, icon: Icon, title, description, accent, border }) => (
            <Link
              key={href}
              href={href}
              className={`group flex flex-col bg-white border border-slate-200 ${border} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200`}
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200 ${accent}`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h2 className="text-base font-semibold text-slate-900 mb-1">{title}</h2>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
              </div>

              {/* CTA */}
              <div className="mt-5 flex items-center gap-1 text-sm font-medium text-slate-400 group-hover:text-slate-700 transition-colors duration-150">
                <span>Manage</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}