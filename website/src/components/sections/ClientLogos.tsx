import Image from "next/image";
import { CLIENTS } from "@/lib/constants";

const LOGO_TREATMENTS: Record<string, string> = {
  "Hero Motocorp": "max-w-[240px] max-h-[72px]",
  "Hero Fincorp": "max-w-[190px] max-h-[58px]",
  "Hero Future Energies": "max-w-[210px] max-h-[60px]",
  JBL: "max-w-[82px] max-h-[58px]",
  Kia: "max-w-[146px] max-h-[56px]",
  Hyundai: "max-w-[168px] max-h-[64px]",
  BMW: "max-w-[92px] max-h-[66px]",
  Bikanervala: "max-w-[225px] max-h-[76px]",
  Archies: "max-w-[160px] max-h-[72px]",
  Uber: "max-w-[140px] max-h-[68px]",
  Truemeds: "max-w-[184px] max-h-[54px]",
  "BML Munjal University": "max-w-[176px] max-h-[60px]",
  GradRight: "max-w-[265px] max-h-[78px]",
  Eapro: "max-w-[215px] max-h-[70px]",
  Windsong: "max-w-[104px] max-h-[72px]",
  "Raman Kant Munjal Foundation": "max-w-[175px] max-h-[58px]",
  Hamariasha: "max-w-[235px] max-h-[72px]",
};

const SLOT_TREATMENTS: Record<string, string> = {
  "Hero Motocorp": "min-w-[240px] md:min-w-[270px]",
  BMW: "min-w-[104px] md:min-w-[124px]",
  Bikanervala: "min-w-[230px] md:min-w-[260px]",
  GradRight: "min-w-[270px] md:min-w-[300px]",
  Eapro: "min-w-[220px] md:min-w-[245px]",
  Windsong: "min-w-[108px] md:min-w-[128px]",
  Archies: "min-w-[165px] md:min-w-[185px]",
  Uber: "min-w-[148px] md:min-w-[168px]",
};

// Pure-CSS infinite marquee — no GSAP, no JS animation loop. The row
// renders the logo set twice and animates translateX from 0 to -50% which
// looks seamless because the second half is an exact copy of the first.
export default function ClientLogos() {
  const half = Math.ceil(CLIENTS.length / 2);
  const row1 = CLIENTS.slice(0, half);
  const row2 = CLIENTS.slice(half);

  return (
    <section className="relative overflow-hidden bg-sp-bg py-24 text-sp-white md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(113,21,255,0.10),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-sp-bg via-sp-bg/90 to-transparent md:w-80" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-sp-bg via-sp-bg/90 to-transparent md:w-80" />

      <div className="mx-auto mb-14 max-w-[1400px] px-6 text-center md:px-16 lg:px-24">
        <p className="mb-4 font-body text-xs uppercase tracking-[0.24em] text-sp-purple">Trusted By</p>
        <h2 className="font-heading text-4xl font-800 text-sp-white md:text-6xl lg:text-7xl">
          Brands We&apos;ve Worked With
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-8 overflow-hidden">
        <div className="sp-marquee-left flex items-center gap-0 md:gap-1 whitespace-nowrap will-change-transform">
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center gap-0 md:gap-1">
              {row1.map((client) => (
                <LogoMark key={`r1-${set}-${client.name}`} client={client} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right (mirror) */}
      <div className="overflow-hidden">
        <div className="sp-marquee-right flex items-center gap-0 md:gap-1 whitespace-nowrap will-change-transform">
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center gap-0 md:gap-1">
              {row2.map((client) => (
                <LogoMark key={`r2-${set}-${client.name}`} client={client} featured />
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sp-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes sp-marquee-right {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        .sp-marquee-left  { animation: sp-marquee-left 60s linear infinite; }
        .sp-marquee-right { animation: sp-marquee-right 70s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sp-marquee-left,
          .sp-marquee-right { animation: none; }
        }
      `}</style>
    </section>
  );
}

function LogoMark({
  client,
  featured = false,
}: {
  client: (typeof CLIENTS)[number];
  featured?: boolean;
}) {
  return (
    <div
      className={`client-logo-slot shrink-0 flex items-center justify-center px-2 md:px-3 ${
        featured ? "h-[108px] min-w-[175px] md:min-w-[210px]" : "h-[82px] min-w-[122px] md:min-w-[148px]"
      } ${SLOT_TREATMENTS[client.name] ?? ""}`}
    >
      <Image
        src={client.logo}
        alt={client.name}
        width={featured ? 270 : 210}
        height={featured ? 90 : 68}
        className={`client-logo-image pointer-events-none select-none h-auto w-auto object-contain ${
          LOGO_TREATMENTS[client.name] ?? "max-w-[150px] max-h-[46px]"
        }`}
        unoptimized
      />
    </div>
  );
}
