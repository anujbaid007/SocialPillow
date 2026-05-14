import Image from "next/image";

const PARTNERS = [
  { name: "Google", logo: "/images/partners/google.svg" },
  { name: "Meta", logo: "/images/partners/meta.svg" },
  { name: "Shopify", logo: "/images/partners/shopify.svg" },
  { name: "HubSpot", logo: "/images/partners/hubspot.svg" },
  { name: "Adobe", logo: "/images/partners/adobe.svg" },
  { name: "Zoho", logo: "/images/partners/zoho.svg" },
  { name: "Semrush", logo: "/images/partners/semrush.svg" },
  { name: "Google Ads", logo: "/images/partners/googleads.svg" },
  { name: "Google Analytics", logo: "/images/partners/googleanalytics.svg" },
];

// Pure CSS marquee — no GSAP, no JS animation loop.
export default function Partners() {
  return (
    <section className="py-20 md:py-24 bg-sp-bg-secondary border-y border-sp-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 mb-10">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-sp-text/45">
          Technology &amp; Platform Partners
        </p>
      </div>
      <div className="partners-marquee flex items-center gap-12 md:gap-16 whitespace-nowrap will-change-transform" aria-hidden="true">
        {[0, 1].map((set) => (
          <div key={set} className="flex shrink-0 items-center gap-12 md:gap-16">
            {PARTNERS.map((partner) => (
              <div
                key={`${set}-${partner.name}`}
                className="shrink-0 flex items-center gap-4 px-7 py-3.5 md:px-9 md:py-4.5 border border-sp-border rounded-2xl"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={36}
                  height={36}
                  className="partner-logo-mark w-7 h-7 md:w-8 md:h-8 opacity-80"
                  unoptimized
                />
                <span className="font-body text-base md:text-lg font-500 text-sp-text/75">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes partners-x {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .partners-marquee { animation: partners-x 50s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .partners-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
