"use client";

import { X } from "lucide-react";
import { useState, FormEvent } from "react";
import { RENTAL_PROPERTIES as properties } from "@/data/properties";

type Props = { open: boolean; onClose: () => void };

export function GetInTouchModal({ open, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      name: String(form.get("name")),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone")),
      propertyId: String(form.get("propertyId") || ""),
      message: String(form.get("message") || ""),
      source: "website",
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // setError(data.error || "Failed to submit inquiry");
        setError( "Failed to submit inquiry. Please try again.");
        return;
      }

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
            Get in touch with us!
          </h3>
          <button onClick={onClose} className="p-1 text-yaana-charcoal hover:bg-lavender-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-4">
            <p className="text-lavender-700 text-sm mb-4">
              Thank you! We will get in touch with you soon.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-lavender-600 text-white py-2.5 rounded-lg font-medium hover:bg-lavender-700 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              required
              placeholder="Name"
              className="w-full border border-yaana-charcoal/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lavender-600 focus:border-transparent outline-none"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border border-yaana-charcoal/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lavender-600 focus:border-transparent outline-none"
            />

            <input
              name="phone"
              required
              placeholder="Phone Number"
              className="w-full border border-yaana-charcoal/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lavender-600 focus:border-transparent outline-none"
            />

            <select
              name="propertyId"
              className="w-full border border-yaana-charcoal/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lavender-600 focus:border-transparent outline-none"
            >
              <option value="">Select Property (Optional)</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              rows={4}
              placeholder="Your message"
              className="w-full border border-yaana-charcoal/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lavender-600 focus:border-transparent outline-none resize-none"
            />

            {error && <p className="text-lavender-700 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-lavender-600 text-white py-2.5 rounded-lg font-medium hover:bg-lavender-700 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
