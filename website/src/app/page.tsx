import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Stats from "@/components/sections/Stats";
import WhatDefinesUs from "@/components/sections/WhatDefinesUs";
import Solutions from "@/components/sections/Solutions";
import CaseStudies from "@/components/sections/CaseStudies";
import ClientLogos from "@/components/sections/ClientLogos";
import TrendingBlog from "@/components/sections/TrendingBlog";
import Partners from "@/components/sections/Partners";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <WhatDefinesUs />
      <Solutions />
      <CaseStudies />
      <ClientLogos />
      <TrendingBlog />
      <Partners />
      <ContactCTA />
    </>
  );
}
