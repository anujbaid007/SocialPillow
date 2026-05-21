import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-24 md:py-36 bg-sp-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sp-purple/20 via-sp-bg-card to-sp-bg-dark border border-sp-border p-10 md:p-16 lg:p-20">
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(113,21,255,0.15), transparent 70%)" }}
          />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
              <p className="font-body text-sm uppercase tracking-[0.2em] text-sp-purple mb-6">Get In Touch</p>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-800 text-sp-white mb-5">
                Take a Pillow and Relax!
                <br />
                <span className="text-sp-text/45">We&apos;ve got your back!</span>
              </h2>
              <p className="font-body text-lg text-sp-text/55 max-w-[500px] leading-relaxed">
                Let&apos;s discuss how to market you, your product and your company — digitally, over a cup of coffee.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 px-9 py-5 bg-sp-purple hover:bg-sp-purple-light rounded-full transition-colors"
            >
              <span className="font-heading text-lg font-700 text-white">Let&apos;s Talk</span>
              <ArrowRight size={18} className="text-white group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
