'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { RENTAL_PROPERTIES } from '@/data/properties'
import { logError } from '@/lib/logging'
import { ArrowLeft, Plus, X, Eye, ChevronLeft, ChevronRight, Filter } from 'lucide-react'

const properties = RENTAL_PROPERTIES.map((p) => ({ id: String(p.id), name: p.name }))

function getPropertyName(id: string | null): string {
  if (!id) return 'N/A'
  const property = properties.find((p) => p.id === id)
  return property?.name || 'Unknown Property'
}

type InquiryStatus = 'NEW' | 'CONTACTED' | 'CLOSED'

type Inquiry = {
  id: string
  name: string
  phone: string
  email: string | null
  message: string | null
  propertyId: string | null
  source: string
  status: InquiryStatus
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
  inquiry: Inquiry | null
  onClose: () => void
  onUpdateStatus: (status: InquiryStatus) => void
  onDelete: () => void
}

function ViewModal({ isOpen, inquiry, onClose, onUpdateStatus, onDelete }: ViewModalProps) {
  if (!isOpen || !inquiry) return null

  const statusConfig: Record<InquiryStatus, { pill: string; label: string }> = {
    NEW: { pill: 'bg-blue-50 text-blue-700 border border-blue-200', label: 'New' },
    CONTACTED: { pill: 'bg-emerald-50 text-emerald-700 border border-emerald-200', label: 'Contacted' },
    CLOSED: { pill: 'bg-slate-100 text-slate-600 border border-slate-200', label: 'Closed' },
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Inquiry Details</h2>
            <p className="text-sm text-slate-400 mt-0.5">#{inquiry.id.slice(0, 8).toUpperCase()}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Name', value: inquiry.name },
              { label: 'Phone', value: inquiry.phone },
              { label: 'Email', value: inquiry.email || '—' },
              { label: 'Property', value: getPropertyName(inquiry.propertyId) },
              { label: 'Source', value: inquiry.source },
              { label: 'Created', value: new Date(inquiry.createdAt).toLocaleString() },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-medium text-slate-800 break-all">{value}</p>
              </div>
            ))}
          </div>

          {/* Status selector */}
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              {(['NEW', 'CONTACTED', 'CLOSED'] as InquiryStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdateStatus(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    inquiry.status === s
                      ? statusConfig[s].pill + ' ring-2 ring-offset-1 ring-current'
                      : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {statusConfig[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Message</p>
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
              {inquiry.message || 'No message provided.'}
            </p>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
          >
            Delete Inquiry
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

const statusConfig: Record<InquiryStatus, string> = {
  NEW: 'bg-blue-50 text-blue-700 border border-blue-200',
  CONTACTED: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  CLOSED: 'bg-slate-100 text-slate-600 border border-slate-200',
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', message: '', propertyId: '', source: 'website',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean; title: string; message: string; onConfirm: () => void; confirmText?: string; confirmColor?: string;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} })

  const fetchInquiries = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: '10' })
      if (statusFilter !== 'ALL') params.append('status', statusFilter)
      const res = await fetch(`/api/inquiries?${params.toString()}`)
      const data = await res.json()
      setInquiries(Array.isArray(data.data) ? data.data : [])
      setTotalPages(data.totalPages || 1)
      setTotalCount(data.totalCount || 0)
    } catch (error) {
      logError('Failed to fetch inquiries:', error)
      setInquiries([])
    } finally {
      setLoading(false)
    }
  }, [currentPage, statusFilter])

  useEffect(() => { fetchInquiries() }, [fetchInquiries])

  function handleStatusFilterChange(newStatus: string) {
    setStatusFilter(newStatus)
    setCurrentPage(1)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormErrors({})
    setSubmitting(true)
    try {
      const res = await fetch('/api/inquiries', {
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
          alert(data.error || 'Failed to create inquiry')
        }
        return
      }
      setFormData({ name: '', phone: '', email: '', message: '', propertyId: '', source: 'website' })
      setShowForm(false)
      fetchInquiries()
    } catch (error) {
      logError('Failed to create inquiry:', error)
      alert('Failed to create inquiry')
    } finally {
      setSubmitting(false)
    }
  }

  async function updateStatus(id: string, newStatus: InquiryStatus) {
    setConfirmModal({
      isOpen: true,
      title: 'Change Status',
      message: `Are you sure you want to change the status to ${newStatus}?`,
      confirmText: 'Change Status',
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }))
        setInquiries((prev) => prev.map((inq) => inq.id === id ? { ...inq, status: newStatus } : inq))
        if (selectedInquiry?.id === id) setSelectedInquiry((prev) => prev ? { ...prev, status: newStatus } : prev)
        try {
          await fetch('/api/inquiries', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus }),
          })
        } catch (error) {
          logError('Failed to update status:', error)
          fetchInquiries()
        }
      },
    })
  }

  async function deleteInquiry(id: string) {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Inquiry',
      message: 'Are you sure you want to delete this inquiry? This action cannot be undone.',
      confirmText: 'Delete',
      confirmColor: 'bg-red-600 hover:bg-red-700',
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }))
        setShowViewModal(false)
        setInquiries((prev) => prev.filter((inq) => inq.id !== id))
        setTotalCount((prev) => prev - 1)
        try {
          await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' })
        } catch (error) {
          logError('Failed to delete inquiry:', error)
          fetchInquiries()
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
              <h1 className="text-base font-semibold text-slate-900">Inquiries</h1>
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
              <span className="hidden sm:inline">{showForm ? 'Cancel' : 'New Inquiry'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Create form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
            <h2 className="text-base font-semibold text-slate-900 mb-5">Create New Inquiry</h2>
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
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Message</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} className={inputClass + ' resize-none'} />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-50 transition-colors">
                  {submitting ? 'Creating...' : 'Create Inquiry'}
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
            {['ALL', 'NEW', 'CONTACTED', 'CLOSED'].map((s) => (
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
              <p className="text-sm text-slate-400">Loading inquiries...</p>
            </div>
          </div>
        ) : !Array.isArray(inquiries) || inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
            <p className="text-slate-400 text-sm">No inquiries found.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-slate-100">
                <thead>
                  <tr className="bg-slate-50">
                    {['Name', 'Phone', 'Property', 'Source', 'Status', ''].map((h) => (
                      <th key={h} className={`px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider ${h === '' ? 'text-right' : 'text-left'}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">{inquiry.name}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">{inquiry.phone}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">{getPropertyName(inquiry.propertyId)}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap capitalize">{inquiry.source}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusConfig[inquiry.status]}`}>
                          {inquiry.status.charAt(0) + inquiry.status.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => { setSelectedInquiry(inquiry); setShowViewModal(true) }}
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
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{inquiry.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{inquiry.phone}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statusConfig[inquiry.status]}`}>
                      {inquiry.status.charAt(0) + inquiry.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{getPropertyName(inquiry.propertyId)}</span>
                    <button
                      onClick={() => { setSelectedInquiry(inquiry); setShowViewModal(true) }}
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
        inquiry={selectedInquiry}
        onClose={() => { setShowViewModal(false); setSelectedInquiry(null) }}
        onUpdateStatus={(status) => selectedInquiry && updateStatus(selectedInquiry.id, status)}
        onDelete={() => selectedInquiry && deleteInquiry(selectedInquiry.id)}
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
