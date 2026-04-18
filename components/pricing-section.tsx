"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getWhatsAppLink } from "@/lib/site";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Always Free",
    price: { monthly: "₹0", yearly: "₹0" },
    note: "Forever",
    description: "Best for trying GMMX with core attendance and lead capture.",
    features: ["Basic attendance (10 members)", "Lead entries", "WhatsApp support"],
    ctaLabel: "Start free",
    ctaHref: "/signup",
    popular: false
  },
  {
    name: "Growth",
    price: { monthly: "₹799", yearly: "₹639" },
    note: "per month",
    description: "Perfect for small gyms that need reminders, CRM, and reporting.",
    features: ["QR attendance (100 members)", "Fee reminders", "Gym analytics", "WhatsApp reminders"],
    ctaLabel: "Choose Growth",
    ctaHref: "/signup",
    popular: true
  },
  {
    name: "Scale",
    price: { monthly: "₹1299", yearly: "₹1039" },
    note: "per month",
    description: "For ambitious gyms scaling trainers, operations, and multi-role workflows.",
    features: ["Unlimited members", "Trainer tasking", "Advanced automation", "White-label microsite"],
    ctaLabel: "Choose Scale",
    ctaHref: "/signup",
    popular: false
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    note: "Tailored",
    description: "Built for multi-branch operators with onboarding and migration support.",
    features: ["Custom onboarding", "Priority support", "Enterprise controls", "Dedicated account manager"],
    ctaLabel: "Talk to GMMX",
    ctaHref: getWhatsAppLink("Hi GMMX team, I want Enterprise pricing details."),
    popular: false
  }
];

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="scroll-mt-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-[#FF5C73] font-bold tracking-widest text-sm uppercase mb-4">
            Simple Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Pricing Plans</h2>
          <p className="text-xl text-slate-400">Choose the plan that's right for your gym's growth</p>
          
          <div className="mt-10 flex justify-center">
            <Tabs 
              defaultValue="monthly" 
              onValueChange={(val) => setBillingPeriod(val as "monthly" | "yearly")}
              className="bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl"
            >
              <TabsList className="bg-transparent border-none p-0 h-12">
                <TabsTrigger 
                  value="monthly" 
                  className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:text-black text-slate-400 transition-all font-bold text-sm md:text-base"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger 
                  value="yearly" 
                  className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:text-black text-slate-400 transition-all font-bold text-sm md:text-base"
                >
                  Yearly <span className="ml-2 rounded-full bg-[#FF5C73]/20 text-[#FF5C73] px-2 py-0.5 text-[10px] uppercase hidden sm:inline-block">Save 20%</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative overflow-visible flex flex-col rounded-[2rem] p-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular 
                  ? "bg-gradient-to-b from-[#FF5C73]/20 to-black/40 border-[#FF5C73]/50 shadow-[0_0_40px_rgba(255,92,115,0.15)] ring-1 ring-[#FF5C73]/50" 
                  : "bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#FF5C73] to-[#ff3b57] px-6 py-1.5 text-xs font-black uppercase tracking-widest text-white shadow-lg ring-4 ring-[#05050A]">
                  Recommended
                </div>
              )}

              <CardHeader className="pt-8 px-6">
                <CardTitle className="text-xl font-bold text-white mb-2">{plan.name}</CardTitle>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                    {billingPeriod === "monthly" ? plan.price.monthly : plan.price.yearly}
                  </span>
                  {plan.price.monthly !== "Custom" && (
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      /{billingPeriod === "monthly" ? "mo" : "mo"}
                    </span>
                  )}
                </div>
                <CardDescription className="mt-4 text-slate-400 font-medium leading-relaxed min-h-[60px]">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 px-6 pt-6">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                        <Check className="h-3 w-3 text-emerald-400 stroke-[3px]" />
                      </div>
                      <span className="text-sm text-slate-300 font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="px-6 pb-8 pt-8">
                {plan.ctaHref.startsWith("http") ? (
                  <a
                    href={plan.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full flex items-center justify-center rounded-xl px-6 py-4 text-sm font-black transition-all ${
                      plan.popular
                        ? "bg-[#FF5C73] text-white hover:opacity-90 hover:shadow-[0_0_20px_rgba(255,92,115,0.4)]"
                        : "bg-white text-black hover:bg-slate-200"
                    }`}
                  >
                    {plan.ctaLabel}
                  </a>
                ) : (
                  <Link
                    href={plan.ctaHref}
                    className={`w-full flex items-center justify-center rounded-xl px-6 py-4 text-sm font-black transition-all ${
                      plan.popular
                        ? "bg-[#FF5C73] text-white hover:opacity-90 hover:shadow-[0_0_20px_rgba(255,92,115,0.4)]"
                        : "bg-white text-black hover:bg-slate-200"
                    }`}
                  >
                    {plan.ctaLabel}
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
