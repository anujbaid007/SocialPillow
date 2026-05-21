import Image from "next/image";
import { BRAND, STATS, CLIENTS, TEAM } from "@/lib/constants";
import GlowCard from "@/components/ui/GlowCard";
import { RevealImageList } from "@/components/ui/reveal-images";

// Pure-white logo marks — inverted to black in the clients grid so they don't
// disappear against the light pill (the light-theme `multiply` blend would
// otherwise drop the white out entirely). Windsong is excluded: it's a
// colour logo whose baked-in white background was stripped to transparent.
const WHITE_LOGOS = new Set(["Hero Motocorp", "Eapro", "GradRight"]);

// Hover-reveal preview of what we do — image pairs evoke the discipline.
// Items mirror the five SOLUTIONS but with editorial photography pulled
// from Unsplash so the section reads as a tactile gallery, not a list.
const REVEAL_ITEMS: Parameters<typeof RevealImageList>[0]["items"] = [
  {
    text: "Brand",
    href: "/services/brand-solutions",
    images: [
      {
        src: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?w=240&auto=format&fit=crop&q=70",
        alt: "Identity system on press",
      },
      {
        src: "https://images.unsplash.com/photo-1567262439850-1d4dc1fefdd0?w=240&auto=format&fit=crop&q=70",
        alt: "Logo studies",
      },
    ],
  },
  {
    text: "Tech",
    href: "/services/tech-solutions",
    images: [
      {
        src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=240&auto=format&fit=crop&q=70",
        alt: "Code on screen",
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=240&auto=format&fit=crop&q=70",
        alt: "Analytics dashboard",
      },
    ],
  },
  {
    text: "Media",
    href: "/services/media-solutions",
    images: [
      {
        src: "https://images.unsplash.com/photo-1575995872537-3793d29d972c?w=240&auto=format&fit=crop&q=70",
        alt: "Performance media",
      },
      {
        src: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=240&auto=format&fit=crop&q=70",
        alt: "Analytics dashboard",
      },
    ],
  },
  {
    text: "Research",
    href: "/services/research-solutions",
    images: [
      {
        src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=240&auto=format&fit=crop&q=70",
        alt: "Research notes",
      },
      {
        src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=240&auto=format&fit=crop&q=70",
        alt: "Charts and graphs",
      },
    ],
  },
  {
    text: "Film & Photography",
    href: "/services/film-photography",
    images: [
      {
        src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=240&auto=format&fit=crop&q=70",
        alt: "Film camera on set",
      },
      {
        src: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=240&auto=format&fit=crop&q=70",
        alt: "Product shoot setup",
      },
    ],
  },
];

const PRINCIPLES = [
  {
    title: "Client Success First",
    description: "When our clients win, we win. Every strategy is built to drive real business outcomes.",
    gradient: "from-purple-600 to-violet-900",
  },
  {
    title: "Our Word is Our Bond",
    description: "We commit, we deliver. Reliability and trust are the foundation of every partnership.",
    gradient: "from-fuchsia-600 to-purple-900",
  },
  {
    title: "Creativity is Sacred",
    description: "Great design and compelling storytelling are non-negotiable in everything we produce.",
    gradient: "from-violet-600 to-indigo-900",
  },
  {
    title: "Data-Driven Decisions",
    description: "We blend creative intuition with analytics to make smarter marketing decisions.",
    gradient: "from-indigo-600 to-purple-900",
  },
  {
    title: "Be Culturally Relevant",
    description: "We stay ahead of trends and create content that resonates with today's audiences.",
    gradient: "from-purple-700 to-fuchsia-900",
  },
  {
    title: "Technology to Simplify",
    description: "We leverage the latest tools and platforms to streamline processes and maximize impact.",
    gradient: "from-violet-700 to-purple-950",
  },
  {
    title: "Execute Fearlessly",
    description: "Think. Plan. Then execute with confidence. Bold ideas deserve bold execution.",
    gradient: "from-fuchsia-700 to-violet-950",
  },
];

export default function AboutPage() {
  const missionText =
    "Our mission is taking the best of Indian creative talent to the world, building brands that truly connect with their audiences and drive meaningful growth.";

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 md:px-12 lg:px-18">
        <div className="max-w-[1440px] mx-auto">
          <p className="font-body text-sm uppercase tracking-widest text-sp-purple mb-4">
            About Us
          </p>
          <h1 className="about-heading font-heading text-4xl md:text-6xl lg:text-[80px] font-900 text-sp-white leading-[0.95] tracking-tight max-w-[900px]">
            We Bring The Whole Social Pillow Experience!
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section py-24 md:py-32 px-6 md:px-12 lg:px-18 bg-sp-bg-secondary">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="font-body text-sm uppercase tracking-widest text-sp-purple mb-4">
              Our Mission
            </p>
            <p className="font-heading text-xl font-700 text-sp-purple">
              &ldquo;{BRAND.tagline}&rdquo;
            </p>
          </div>
          <div>
            <p className="font-heading text-2xl md:text-3xl font-700 leading-relaxed">
              {missionText.split(" ").map((word, i) => (
                <span key={i} className="about-mission-word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* What we do — hover-reveal image gallery */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-18 bg-sp-bg">
        <div className="max-w-[1440px] mx-auto">
          <RevealImageList heading="What we do" items={REVEAL_ITEMS} />
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section py-20 px-6 md:px-12 lg:px-18 bg-sp-bg">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="stat-block text-center p-8 rounded-2xl bg-sp-bg-card border border-sp-border"
            >
              <p className="font-heading text-4xl md:text-5xl font-900 text-sp-purple">
                {stat.value}
              </p>
              <p className="font-body text-sm text-sp-text/50 mt-2 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-18 bg-sp-bg-secondary">
        <div className="max-w-[1440px] mx-auto">
          <p className="font-body text-sm uppercase tracking-widest text-sp-purple mb-3">
            What Guides Us
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-800 text-sp-white mb-16">
            Our Principles
          </h2>

          <div className="principles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((p, i) => (
              <GlowCard
                key={i}
                className={`principle-card p-8 bg-gradient-to-br ${p.gradient}`}
                glowColor={["#7115FF", "#A412E2", "#B60BFF", "#8B5CF6", "#6D28D9", "#4C1D95", "#7C3AED"][i]}
              >
                <span className="absolute top-4 right-4 font-heading text-6xl font-900 text-white/5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl font-700 text-white mb-3 relative z-10">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-white/70 leading-relaxed relative z-10">
                  {p.description}
                </p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 md:py-32 px-6 md:px-12 lg:px-18 bg-sp-bg">
        <div className="max-w-[1440px] mx-auto">
          <p className="font-body text-sm uppercase tracking-widest text-sp-purple mb-3">
            The People
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-800 text-sp-white leading-[1.05] tracking-[-0.02em]">
              Meet the team behind the work.
            </h2>
            <p className="font-body text-base text-sp-text/55 max-w-[360px] leading-relaxed">
              Specialists across brand, content, design, tech and media — collaborating under one roof.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden bg-sp-bg-card border border-sp-border hover:border-sp-purple/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-sp-purple/25 to-sp-bg-dark flex items-center justify-center">
                      <span className="font-heading text-6xl md:text-7xl font-900 text-sp-white/30 group-hover:text-sp-white/50 transition-colors">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-heading text-base md:text-lg font-700 text-sp-white group-hover:text-sp-purple transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-sp-text/55 mt-1.5 uppercase tracking-[0.08em]">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 px-6 md:px-12 lg:px-18 bg-sp-bg-secondary">
        <div className="max-w-[1440px] mx-auto">
          <p className="font-body text-sm uppercase tracking-widest text-sp-purple mb-3">
            Our Partners
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-800 text-sp-white mb-12">
            Brands That Trust Us
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {CLIENTS.map((client) => {
              // A handful of logos are pure-white marks that vanish on a light
              // card. Invert those to solid black so they read on the standard
              // light pill alongside the full-colour logos.
              const isWhiteLogo = WHITE_LOGOS.has(client.name);
              return (
                <div
                  key={client.name}
                  className="group flex items-center justify-center h-24 px-6 border border-sp-border rounded-xl bg-sp-bg-card/50 hover:border-sp-purple/30 transition-colors duration-300"
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={200}
                    height={64}
                    className="client-logo-image pointer-events-none select-none h-auto w-auto max-h-[44px] max-w-[140px] object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    style={isWhiteLogo ? { filter: "brightness(0)" } : undefined}
                    unoptimized
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
