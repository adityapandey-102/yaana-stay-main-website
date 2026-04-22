"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { visitSchema, VisitInput } from "@/lib/validators/visit";
// import type { PropertyOption } from "@/types/property";
import { RENTAL_PROPERTIES as properties  } from "@/data/properties";


type Props = {
  open: boolean;
  onClose: () => void;
  // properties: PropertyOption[];
};

export function ScheduleVisitModal({ open, onClose}: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload: VisitInput = {
      name: String(form.get("name")),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone")),
      propertyId: String(form.get("propertyId")),
      visitDate: String(form.get("visitDate")),
      visitTime: String(form.get("visitTime")),
      message: String(form.get("message") || ""),
    };

    const parsed = visitSchema.safeParse(payload);
    if (!parsed.success) {
      // setError(parsed.error.errors[0].message);
      setError(parsed.error.message);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-yaana-charcoal">
            Schedule a Visit
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-lavender-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <p className="text-lavender-700 text-sm">
            Visit scheduled! Our team will contact you shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input name="name" required placeholder="Name" className="input" />

            {/* Email */}
            <input name="email" type="email" placeholder="Email" className="input" />

            {/* Phone */}
            <input name="phone" required placeholder="Phone" className="input" />

            {/* Property Select */}
            <select name="propertyId" required className="input">
              <option value="">Select Property</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-3">
              <input type="date" name="visitDate" required className="input" />
              <input type="time" name="visitTime" required className="input" />
            </div>

            {/* Message */}
            <textarea
              name="message"
              rows={3}
              placeholder="Notes (optional)"
              className="input resize-none"
            />

            {error && <p className="text-lavender-700 text-sm">{error}</p>}

            <button
              disabled={loading}
              className="w-full bg-lavender-600 text-white py-2.5 rounded-lg"
            >
              {loading ? "Submitting..." : "Schedule Visit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

