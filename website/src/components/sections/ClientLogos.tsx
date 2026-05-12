"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CLIENTS } from "@/lib/constants";
import Image from "next/image";

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
        className={`client-logo-image h-auto w-auto object-contain grayscale contrast-125 opacity-[var(--logo-opacity,0.42)] brightness-[var(--logo-brightness,1.45)] mix-blend-screen transition-all duration-300 hover:scale-[1.03] hover:opacity-90 hover:brightness-200 ${
          LOGO_TREATMENTS[client.name] ?? "max-w-[150px] max-h-[46px]"
        }`}
        style={{
          transform: "scale(var(--logo-scale, 1))",
        }}
        unoptimized
      />
    </div>
  );
}

export default function ClientLogos() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const w1 = row1Ref.current.scrollWidth / 2;
    const w2 = row2Ref.current.scrollWidth / 2;
    const t1 = gsap.to(row1Ref.current, { x: -w1, duration: 34, ease: "none", repeat: -1 });
    const t2 = gsap.fromTo(row2Ref.current, { x: -w2 }, { x: 0, duration: 30, ease: "none", repeat: -1 });

    const updateCenterFocus = () => {
      const section = sectionRef.current;
      if (!section) return;
      const center = window.innerWidth / 2;
      const radius = Math.max(260, window.innerWidth * 0.28);
      section.querySelectorAll<HTMLElement>(".client-logo-slot").forEach((slot) => {
        const rect = slot.getBoundingClientRect();
        const logoCenter = rect.left + rect.width / 2;
        const distance = Math.abs(logoCenter - center);
        const strength = Math.max(0, 1 - distance / radius);
        slot.style.setProperty("--logo-opacity", String(0.34 + strength * 0.48));
        slot.style.setProperty("--logo-brightness", String(1.32 + strength * 0.72));
        slot.style.setProperty("--logo-scale", String(1 + strength * 0.045));
      });
    };

    gsap.ticker.add(updateCenterFocus);
    return () => {
      t1.kill();
      t2.kill();
      gsap.ticker.remove(updateCenterFocus);
    };
  }, []);

  const half = Math.ceil(CLIENTS.length / 2);
  const row1 = CLIENTS.slice(0, half);
  const row2 = CLIENTS.slice(half);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-sp-bg py-24 text-sp-white md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(113,21,255,0.10),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-sp-bg via-sp-bg/90 to-transparent md:w-80" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-sp-bg via-sp-bg/90 to-transparent md:w-80" />

      <div className="mx-auto mb-14 max-w-[1400px] px-6 text-center md:px-16 lg:px-24">
        <p className="mb-4 font-body text-xs uppercase tracking-[0.24em] text-sp-purple">Trusted By</p>
        <h2 className="font-heading text-4xl font-800 text-sp-white md:text-6xl lg:text-7xl">Brands We&apos;ve Worked With</h2>
      </div>

      <div className="mb-8 overflow-hidden">
        <div ref={row1Ref} className="flex items-center gap-0 md:gap-1 whitespace-nowrap">
          {[...row1, ...row1].map((client, i) => (
            <LogoMark key={`r1-${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <div ref={row2Ref} className="flex items-center gap-0 md:gap-1 whitespace-nowrap">
          {[...row2, ...row2].map((client, i) => (
            <LogoMark key={`r2-${client.name}-${i}`} client={client} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
