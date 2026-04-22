'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { RENTAL_PROPERTIES } from '@/data/properties'
import { logError } from '@/lib/logging'
import { ArrowLeft, Plus, X, Eye, ChevronLeft, ChevronRight, Filter, Calendar, Clock } from 'lucide-react'

const properties = RENTAL_PROPERTIES.map((p) => ({ id: String(p.id), name: p.name }))

function getPropertyName(id: string | null): string {
  if (!id) return 'N/A'
  const property = properties.find((p) => p.id === id)
  return property?.name || 'Unknown Property'
}

type VisitStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED'

type Visit = {
  id: string
  name: string
  phone: string
  email: string | null
  propertyId: string | null
  visitDate: string
  visitTime: string
  status: VisitStatus
  message: string | null
  createdAt: string
  updatedAt: string
}

type ConfirmModalProps = {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  confirmColor?: string
}

function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  confirmColor = 'bg-slate-900 hover:bg-slate-700',
}: ConfirmModalProps) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
          <p className="text-slate-500 text-sm mb-6">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors ${confirmColor}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

type ViewModalProps = {
  isOpen: boolean
  visit: Visit | null
  onClose: () => void
  onUpdateStatus: (status: VisitStatus) => void
  onDelete: () => void
}

function ViewModal({ isOpen, visit, onClose, onUpdateStatus, onDelete }: ViewModalProps) {
  if (!isOpen || !visit) return null

  const statusConfig: Record<VisitStatus, { pill: string; label: string }> = {
    SCHEDULED: { pill: 'bg-blue-50 text-blue-700 border border-blue-200', label: 'Scheduled' },
    COMPLETED: { pill: 'bg-emerald-50 text-emerald-700 border border-emerald-200', label: 'Completed' },
    CANCELLED: { pill: 'bg-slate-100 text-slate-600 border border-slate-200', label: 'Cancelled' },
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Visit Details</h2>
            <p className="text-sm text-slate-400 mt-0.5">#{visit.id.slice(0, 8).toUpperCase()}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Name', value: visit.name },
              { label: 'Phone', value: visit.phone },
              { label: 'Email', value: visit.email || '—' },
              { label: 'Property', value: getPropertyName(visit.propertyId) },
              { label: 'Visit Date', value: new Date(visit.visitDate).toLocaleDateString() },
              { label: 'Visit Time', value: visit.visitTime },
              { label: 'Created', value: new Date(visit.createdAt).toLocaleString() },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-medium text-slate-800 break-all">{value}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              {(['SCHEDULED', 'COMPLETED', 'CANCELLED'] as VisitStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdateStatus(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    visit.status === s
                      ? statusConfig[s].pill + ' ring-2 ring-offset-1 ring-current'
                      : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {statusConfig[s].label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Message</p>
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
              {visit.message || 'No message provided.'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
          >
            Delete Visit
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

const statusConfig: Record<VisitStatus, string> = {
  SCHEDULED: 'bg-blue-50 text-blue-700 border border-blue-200',
  COMPLETED: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  CANCELLED: 'bg-slate-100 text-slate-600 border border-slate-200',
}

const statusLabel: Record<VisitStatus, string> = {
  SCHEDULED: 'Scheduled',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', propertyId: '', visitDate: '', visitTime: '', message: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean; title: string; message: string; onConfirm: () => void; confirmText?: string; confirmColor?: string;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} })

  const fetchVisits = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: '10' })
      if (statusFilter !== 'ALL') params.append('status', statusFilter)
      const res = await fetch(`/api/visits?${params.toString()}`)
      const json = await res.json()
      if (json?.data && Array.isArray(json.data)) {
        setVisits(json.data)
        setTotalPages(json.totalPages || 1)
        setTotalCount(json.totalCount || 0)
      } else {
        setVisits([])
        setTotalPages(1)
        setTotalCount(0)
      }
    } catch (error) {
      logError('Failed to fetch visits:', error)
      setVisits([])
    } finally {
      setLoading(false)
    }
  }, [currentPage, statusFilter])

  useEffect(() => { fetchVisits() }, [fetchVisits])

  function handleStatusFilterChange(newStatus: string) {
    setStatusFilter(newStatus)
    setCurrentPage(1)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormErrors({})
    setSubmitting(true)
    try {
      const res = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.details) {
          const errors: Record<string, string> = {}
          data.details.forEach((err: any) => { errors[err.path[0]] = err.message })
          setFormErrors(errors)
        } else {
          alert(data.error || 'Failed to schedule visit')
        }
        return
      }
      setFormData({ name: '', phone: '', email: '', propertyId: '', visitDate: '', visitTime: '', message: '' })
      setShowForm(false)
      fetchVisits()
    } catch (error) {
      logError('Failed to schedule visit:', error)
      alert('Failed to schedule visit')
    } finally {
      setSubmitting(false)
    }
  }

  async function updateStatus(id: string, newStatus: VisitStatus) {
    setConfirmModal({
      isOpen: true,
      title: 'Change Status',
      message: `Are you sure you want to change the status to ${newStatus}?`,
      confirmText: 'Change Status',
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }))
        setVisits((prev) => prev.map((v) => v.id === id ? { ...v, status: newStatus } : v))
        if (selectedVisit?.id === id) setSelectedVisit((prev) => prev ? { ...prev, status: newStatus } : prev)
        try {
          await fetch('/api/visits', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus }),
          })
        } catch (error) {
          logError('Failed to update status:', error)
          fetchVisits()
        }
      },
    })
  }

  async function deleteVisit(id: string) {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Visit',
      message: 'Are you sure you want to delete this visit? This action cannot be undone.',
      confirmText: 'Delete',
      confirmColor: 'bg-red-600 hover:bg-red-700',
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }))
        setShowViewModal(false)
        setVisits((prev) => prev.filter((v) => v.id !== id))
        setTotalCount((prev) => prev - 1)
        try {
          await fetch(`/api/visits?id=${id}`, { method: 'DELETE' })
        } catch (error) {
          logError('Failed to delete visit:', error)
          fetchVisits()
        }
      },
    })
  }

  const inputClass = "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-white"

  return (
    <div className="min-h-screen bg-slate-50">
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
              <h1 className="text-base font-semibold text-slate-900">Visits</h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                {totalCount} total
              </span>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showForm
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-900 text-white hover:bg-slate-700'
              }`}
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span className="hidden sm:inline">{showForm ? 'Cancel' : 'Schedule Visit'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Create form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
            <h2 className="text-base font-semibold text-slate-900 mb-5">Schedule New Visit</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Phone *</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Property</label>
                  <select value={formData.propertyId} onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })} className={inputClass}>
                    <option value="">Select Property</option>
                    {properties.map((prop) => (
                      <option key={prop.id} value={prop.id}>{prop.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Visit Date *</label>
                  <input type="date" value={formData.visitDate} onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })} className={inputClass} />
                  {formErrors.visitDate && <p className="text-red-500 text-xs mt-1">{formErrors.visitDate}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Visit Time *</label>
                  <input type="time" value={formData.visitTime} onChange={(e) => setFormData({ ...formData, visitTime: e.target.value })} className={inputClass} />
                  {formErrors.visitTime && <p className="text-red-500 text-xs mt-1">{formErrors.visitTime}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Message</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} className={inputClass + ' resize-none'} />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-50 transition-colors">
                  {submitting ? 'Scheduling...' : 'Schedule Visit'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-5">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <div className="flex flex-wrap gap-2">
            {['ALL', 'SCHEDULED', 'COMPLETED', 'CANCELLED'].map((s) => (
              <button
                key={s}
                onClick={() => handleStatusFilterChange(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  statusFilter === s
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                }`}
              >
                {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-7 h-7 border-2 border-slate-200 border-t-slate-700 rounded-full animate-spin" />
              <p className="text-sm text-slate-400">Loading visits...</p>
            </div>
          </div>
        ) : !Array.isArray(visits) || visits.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
            <p className="text-slate-400 text-sm">No visits scheduled.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-slate-100">
                <thead>
                  <tr className="bg-slate-50">
                    {['Name', 'Phone', 'Property', 'Visit Date & Time', 'Status', ''].map((h) => (
                      <th key={h} className={`px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider ${h === '' ? 'text-right' : 'text-left'}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visits.map((visit) => (
                    <tr key={visit.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">{visit.name}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">{visit.phone}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">{getPropertyName(visit.propertyId)}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-sm text-slate-700">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(visit.visitDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {visit.visitTime}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusConfig[visit.status]}`}>
                          {statusLabel[visit.status]}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => { setSelectedVisit(visit); setShowViewModal(true) }}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {visits.map((visit) => (
                <div key={visit.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{visit.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{visit.phone}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statusConfig[visit.status]}`}>
                      {statusLabel[visit.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(visit.visitDate).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{visit.visitTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{getPropertyName(visit.propertyId)}</span>
                    <button
                      onClick={() => { setSelectedVisit(visit); setShowViewModal(true) }}
                      className="flex items-center gap-1 text-slate-600 font-medium"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-slate-500">Page {currentPage} of {totalPages}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <ViewModal
        isOpen={showViewModal}
        visit={selectedVisit}
        onClose={() => { setShowViewModal(false); setSelectedVisit(null) }}
        onUpdateStatus={(status) => selectedVisit && updateStatus(selectedVisit.id, status)}
        onDelete={() => selectedVisit && deleteVisit(selectedVisit.id)}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        confirmText={confirmModal.confirmText}
        confirmColor={confirmModal.confirmColor}
      />
    </div>
  )
}