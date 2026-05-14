"use client";

import { useState, useRef } from "react";
import { BRAND, SERVICES } from "@/lib/constants";
import { Send, MapPin, Mail, Phone } from "lucide-react";

const HEAR_OPTIONS = [
  "Referral",
  "LinkedIn",
  "Instagram",
  "Google Search",
  "Social Media",
  "Email",
  "Other",
];

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [hearAbout, setHearAbout] = useState<string[]>([]);

  const toggleService = (slug: string) => {
    setSelectedServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleHear = (option: string) => {
    setHearAbout((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    );
  };

  return (
    <section ref={heroRef} className="pt-28 pb-20 px-6 md:px-12 lg:px-18">
      <div className="max-w-[1440px] mx-auto">
        {/* Hero */}
        <div className="max-w-[800px] mb-16">
          <p className="font-body text-sm uppercase tracking-widest text-sp-purple mb-4">
            Contact Us
          </p>
          <h1 className="contact-heading font-heading text-4xl md:text-6xl lg:text-7xl font-900 text-sp-white leading-tight">
            Let&apos;s create something{" "}
            <span className="text-sp-purple">extraordinary</span> together.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            <form ref={formRef} className="space-y-10">
              {/* Name & Org */}
              <div className="form-section grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-sm text-sp-text/50 mb-2 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-sp-border-strong focus:border-sp-purple py-4 text-sp-white font-body text-lg outline-none transition-colors duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-sp-text/50 mb-2 block">
                    Organization
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-sp-border-strong focus:border-sp-purple py-4 text-sp-white font-body text-lg outline-none transition-colors duration-300"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="form-section grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-sm text-sp-text/50 mb-2 block">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border-b border-sp-border-strong focus:border-sp-purple py-4 text-sp-white font-body text-lg outline-none transition-colors duration-300"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-sp-text/50 mb-2 block">Phone</label>
                  <input
                    type="tel"
                    className="w-full bg-transparent border-b border-sp-border-strong focus:border-sp-purple py-4 text-sp-white font-body text-lg outline-none transition-colors duration-300"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              {/* Services checkboxes */}
              <div className="form-section">
                <label className="font-body text-sm text-sp-text/50 mb-4 block">
                  Which services are you interested in?
                </label>
                <div className="flex flex-wrap gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => toggleService(s.slug)}
                      className={`px-5 py-2.5 rounded-full border font-body text-sm transition-all duration-200 ${
                        selectedServices.includes(s.slug)
                          ? "bg-sp-purple border-sp-purple text-white"
                          : "border-sp-border-strong text-sp-text/50 hover:border-sp-purple/30 hover:text-sp-text/80"
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="form-section">
                <label className="font-body text-sm text-sp-text/50 mb-2 block">
                  What&apos;s on your mind?
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-sp-border-strong focus:border-sp-purple py-4 text-sp-white font-body text-lg outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell us about your project, goals, and timeline..."
                />
              </div>

              {/* How did you hear */}
              <div className="form-section">
                <label className="font-body text-sm text-sp-text/50 mb-4 block">
                  How did you hear about us?
                </label>
                <div className="flex flex-wrap gap-3">
                  {HEAR_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleHear(option)}
                      className={`px-4 py-2 rounded-full border font-body text-xs transition-all duration-200 ${
                        hearAbout.includes(option)
                          ? "bg-sp-purple border-sp-purple text-white"
                          : "border-sp-border-strong text-sp-text/40 hover:border-sp-purple/30"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="magnetic-btn inline-flex items-center gap-3 px-10 py-4 bg-sp-purple hover:bg-sp-purple-light text-white rounded-full font-body text-base font-500 transition-colors duration-300"
              >
                <span className="relative z-10">Submit</span>
                <Send size={16} className="relative z-10" />
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-sp-bg-card border border-sp-border">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={18} className="text-sp-purple" />
                <span className="font-heading text-base font-700 text-sp-white">Office</span>
              </div>
              <p className="font-body text-sm text-sp-text/50 leading-relaxed">
                {BRAND.address}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-sp-bg-card border border-sp-border">
              <div className="flex items-center gap-3 mb-4">
                <Mail size={18} className="text-sp-purple" />
                <span className="font-heading text-base font-700 text-sp-white">Email</span>
              </div>
              <a
                href={`mailto:${BRAND.email}`}
                className="font-body text-sm text-sp-purple hover:text-sp-purple-light transition-colors"
              >
                {BRAND.email}
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-sp-bg-card border border-sp-border">
              <div className="flex items-center gap-3 mb-4">
                <Phone size={18} className="text-sp-purple" />
                <span className="font-heading text-base font-700 text-sp-white">Phone</span>
              </div>
              <p className="font-body text-sm text-sp-text/50">{BRAND.phone}</p>
            </div>

            {/* Social */}
            <div className="p-6 rounded-2xl bg-sp-bg-card border border-sp-border">
              <p className="font-heading text-base font-700 text-sp-white mb-4">Follow Us</p>
              <div className="flex flex-col gap-2">
                {Object.entries(BRAND.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-sp-text/40 hover:text-sp-purple transition-colors capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
