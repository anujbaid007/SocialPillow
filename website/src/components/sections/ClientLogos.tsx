import Image from "next/image";
import { CLIENTS } from "@/lib/constants";

// Logos in full colour — per-logo aspect tuning so different shapes
// (squarish marks, wide wordmarks, tall stacked logos) all land at the
// same visual weight without one dominating the row.
const LOGO_TREATMENTS: Record<string, string> = {
  "Hero Motocorp": "max-w-[220px] max-h-[68px]",
  "Hero Fincorp": "max-w-[185px] max-h-[60px]",
  "Hero Future Energies": "max-w-[200px] max-h-[62px]",
  JBL: "max-w-[90px] max-h-[64px]",
  Kia: "max-w-[140px] max-h-[60px]",
  Hyundai: "max-w-[170px] max-h-[64px]",
  BMW: "max-w-[88px] max-h-[64px]",
  Bikanervala: "max-w-[210px] max-h-[68px]",
  Archies: "max-w-[160px] max-h-[68px]",
  Uber: "max-w-[140px] max-h-[64px]",
  Truemeds: "max-w-[180px] max-h-[56px]",
  "BML Munjal University": "max-w-[170px] max-h-[60px]",
  GradRight: "max-w-[230px] max-h-[68px]",
  Eapro: "max-w-[195px] max-h-[64px]",
  Windsong: "max-w-[105px] max-h-[68px]",
  "Raman Kant Munjal Foundation": "max-w-[170px] max-h-[60px]",
  Hamariasha: "max-w-[210px] max-h-[68px]",
  Growpital: "max-w-[180px] max-h-[60px]",
  "ITP Media Group": "max-w-[185px] max-h-[60px]",
  Thinkvalley: "max-w-[200px] max-h-[60px]",
  Keayn: "max-w-[150px] max-h-[60px]",
  Ultrex: "max-w-[160px] max-h-[60px]",
  Voltas: "max-w-[170px] max-h-[60px]",
  Kubota: "max-w-[170px] max-h-[60px]",
};

// Pure-white logo marks — inverted to black so they don't vanish against the
// light-theme background (the `multiply` blend on .client-logo-image would
// otherwise drop the white out entirely). Windsong is excluded: its baked-in
// white background was stripped to transparent, so it renders in colour.
const WHITE_LOGOS = new Set(["Hero Motocorp", "Eapro", "GradRight"]);

// Uniform slot widths per logo so the marquee feels consistently spaced.
// Bottom row now matches the top: same height, same min-widths, same spacing.
const SLOT_TREATMENTS: Record<string, string> = {
  "Hero Motocorp": "min-w-[230px]",
  BMW: "min-w-[120px]",
  Bikanervala: "min-w-[220px]",
  GradRight: "min-w-[245px]",
  Eapro: "min-w-[210px]",
  Windsong: "min-w-[125px]",
  Archies: "min-w-[175px]",
  Uber: "min-w-[160px]",
  JBL: "min-w-[125px]",
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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-sp-bg via-sp-bg/90 to-transparent sm:w-28 md:w-80" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-sp-bg via-sp-bg/90 to-transparent sm:w-28 md:w-80" />

      <div className="mx-auto mb-14 max-w-[1400px] px-6 text-center md:px-16 lg:px-24">
        <p className="mb-4 font-body text-xs uppercase tracking-[0.24em] text-sp-purple">Trusted By</p>
        <h2 className="font-heading text-4xl font-800 text-sp-white md:text-6xl lg:text-7xl">
          Brands We&apos;ve Worked With
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-6 overflow-hidden">
        <div className="sp-marquee-left flex items-center gap-2 md:gap-4 whitespace-nowrap will-change-transform">
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center gap-2 md:gap-4">
              {row1.map((client) => (
                <LogoMark key={`r1-${set}-${client.name}`} client={client} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right (mirror); same slot height + spacing as row 1 */}
      <div className="overflow-hidden">
        <div className="sp-marquee-right flex items-center gap-2 md:gap-4 whitespace-nowrap will-change-transform">
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center gap-2 md:gap-4">
              {row2.map((client) => (
                <LogoMark key={`r2-${set}-${client.name}`} client={client} />
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
}: {
  client: (typeof CLIENTS)[number];
}) {
  return (
    <div
      className={`client-logo-slot shrink-0 flex items-center justify-center px-4 md:px-6 h-[96px] min-w-[160px] md:min-w-[190px] ${
        SLOT_TREATMENTS[client.name] ?? ""
      }`}
    >
      <Image
        src={client.logo}
        alt={client.name}
        width={240}
        height={80}
        className={`client-logo-image pointer-events-none select-none h-auto w-auto object-contain ${
          WHITE_LOGOS.has(client.name) ? "brightness-0 dark:brightness-100 " : ""
        }${LOGO_TREATMENTS[client.name] ?? "max-w-[170px] max-h-[60px]"}`}
        unoptimized
      />
    </div>
  );
}
