import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import WhatDefinesUs from "@/components/sections/WhatDefinesUs";
import CaseStudies from "@/components/sections/CaseStudies";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ClientLogos from "@/components/sections/ClientLogos";
import TrendingBlog from "@/components/sections/TrendingBlog";
import Partners from "@/components/sections/Partners";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <WhatDefinesUs />
      <ServicesGrid />
      <CaseStudies />
      <ClientLogos />
      <TrendingBlog />
      <Partners />
      <ContactCTA />
    </>
  );
}
