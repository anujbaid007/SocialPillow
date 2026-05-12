"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND, STATS, CLIENTS } from "@/lib/constants";
import GlowCard from "@/components/ui/GlowCard";

gsap.registerPlugin(ScrollTrigger);

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

const TEAM = [
  { name: "Founder", role: "Chief Executive Officer" },
  { name: "Creative Lead", role: "Head of Design & Strategy" },
  { name: "Marketing Head", role: "Chief Marketing Officer" },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-heading",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".about-mission-word",
        { opacity: 0.1 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".mission-section",
            start: "top 70%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".principle-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".principles-grid", start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".stat-block",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".stats-section", start: "top 75%" },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const missionText =
    "Our mission is taking the best of Indian creative talent to the world, building brands that truly connect with their audiences and drive meaningful growth.";

  return (
    <div ref={pageRef}>
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

      {/* Stats */}
      <section className="stats-section py-20 px-6 md:px-12 lg:px-18 bg-sp-bg">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="stat-block text-center p-8 rounded-2xl bg-sp-bg-card border border-white/5"
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
          <h2 className="font-heading text-3xl md:text-5xl font-800 text-sp-white mb-16">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden bg-sp-bg-card border border-white/5 hover:border-sp-purple/30 transition-colors duration-300"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-sp-purple/20 to-sp-bg-dark flex items-center justify-center">
                  <span className="font-heading text-6xl font-900 text-white/10 group-hover:text-white/20 transition-colors">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-700 text-sp-white group-hover:text-sp-purple transition-colors">
                    {member.name}
                  </h3>
                  <p className="font-body text-sm text-sp-text/50 mt-1">{member.role}</p>
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
          <div className="flex flex-wrap gap-4">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="px-6 py-3 border border-white/5 rounded-xl bg-sp-bg-card/50 hover:border-sp-purple/20 transition-colors duration-300"
              >
                <span className="font-body text-sm text-sp-text/40">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
