"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ExclusiveOffersForm() {
  const [agree, setAgree] = useState(false);

  return (
    <div className="bg-white rounded-card shadow-lg p-6 lg:p-8">
      <h3 className="text-lg font-semibold text-yaana-charcoal uppercase tracking-tight mb-6">
        Get Access to Exclusive Offers
      </h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input type="text" placeholder="Name" className="w-full" />
        <Input type="text" placeholder="Mobile / Email" className="w-full" />
        <Input type="text" placeholder="Your City" className="w-full" />
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 rounded" />
          <span className="text-sm text-yaana-charcoal/90">I confirm that I am 18 years old or above.</span>
        </label>
        <Button type="submit" className="w-full bg-yaana-charcoal hover:bg-yaana-charcoal-light\">
          Get Best Offers
        </Button>
      </form>
    </div>
  );
}
