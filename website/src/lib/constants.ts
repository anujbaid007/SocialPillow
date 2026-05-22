export const BRAND = {
  name: "Social Pillow",
  tagline: "marketing you.",
  headline: "Boost Brands, Maximize Reach, Drive Growth.",
  description:
    "We are a team of specialists delivering award-winning work for leading brands worldwide.",
  email: "hello@socialpillow.co",
  phone: "+91-8882508895",
  address: "India",
  social: {
    instagram: "https://www.instagram.com/socialpillow.co/",
    linkedin: "https://www.linkedin.com/company/socialpillow/",
    facebook: "https://www.facebook.com/socialpillow/",
    twitter: "https://x.com/socialpillow",
  },
};

// Five solutions buckets mirroring Schbang's catalog, rephrased for
// SocialPillow. Each bucket expands on click to reveal capabilities and
// ships a small `featured` list of PORTFOLIO slugs used by the navbar
// mega-menu to show real case-study previews when the user hovers the
// solution.
export const SOLUTIONS = [
  {
    title: "Brand Solutions",
    slug: "brand-solutions",
    blurb: "Holistic digital presence for the biggest brands.",
    description:
      "Social, creative, content and campaigns under one roof. From day-to-day social media management to new brand launches, we build the full integrated brand experience that earns attention and trust.",
    capabilities: [
      "Social Media Management",
      "Original Content & Copywriting",
      "Graphic Design, Iconography & Illustration",
      "Video Editing & Animation",
      "Film Production, AVs & Product Photography",
      "Campaign Planning",
      "Influencer Marketing & ORM",
      "Print, OOH & Mainline Advertising",
      "New Brand Launch & Rebranding",
    ],
    color: "#A412E2",
    featured: ["shudh", "wrning"] as const,
  },
  {
    title: "Tech Solutions",
    slug: "tech-solutions",
    blurb: "Custom platforms, engineered to scale.",
    description:
      "From storefronts to bespoke web apps, we engineer technology that simplifies. UI/UX, custom development, SEO, CRM/ERP and the automation stack to make every customer journey convert.",
    capabilities: [
      "Custom Web Development",
      "Web Personalization",
      "UI / UX",
      "SEO",
      "CRM & ERP Solutions",
      "E-Commerce",
      "Email Marketing",
      "Marketing Automation",
      "Chatbots",
    ],
    color: "#7115FF",
    featured: ["hero-motocorp", "uber-india"] as const,
  },
  {
    title: "Media Solutions",
    slug: "media-solutions",
    blurb: "Performance and brand media planned together.",
    description:
      "We place the right message in front of the right audience at the right moment — across paid social, search, programmatic and emerging channels. Performance you can prove, planned with brand discipline.",
    capabilities: [
      "Media Buying",
      "Media Planning",
      "Performance Marketing",
      "MarTech for Media",
    ],
    color: "#B60BFF",
    featured: ["jbl-feel-the-bass", "hero-motocorp"] as const,
  },
  {
    title: "Research Solutions",
    slug: "research-solutions",
    blurb: "Consulting and research that turn data into decisions.",
    description:
      "Market research, consumer behaviour studies and campaign analytics that move from data to decisions. We measure what matters, then build the test-learn-scale loop around it.",
    capabilities: [
      "Market Research",
      "Consumer Behaviour & Satisfaction Analysis",
      "Campaign Analytics",
      "Usability Testing & Product Development",
    ],
    color: "#8B5CF6",
    featured: ["uber-india", "hero-motocorp"] as const,
  },
  {
    title: "Film & Photography",
    slug: "film-photography",
    blurb: "Stories shot in-house — script to final cut.",
    description:
      "Brand films, ads, product photography and motion graphics produced in-house from script to final cut. Built for the platforms that matter and the brands that demand craft.",
    capabilities: [
      "Brand Films & AVs",
      "Product Photography",
      "Motion Graphics & Animation",
      "Reel & Short-Form Production",
      "Direction & Post-Production",
    ],
    color: "#6D28D9",
    featured: ["jbl-feel-the-bass", "uber-india"] as const,
  },
];

// Back-compat alias — some legacy code paths still reference SERVICES.
// Maps the 3 SOLUTIONS into the previous shape so they keep rendering.
export const SERVICES = SOLUTIONS.map((s) => ({
  title: s.title,
  slug: s.slug,
  subtitle: s.blurb,
  description: s.description,
  color: s.color,
}));

export const SERVICE_TICKER = [
  "social media",
  "branding",
  "seo",
  "performance marketing",
  "content strategy",
  "web development",
  "e-commerce",
];

export const CLIENTS = [
  { name: "Hero Motocorp", logo: "/images/clients/hero-motocorp.png" },
  { name: "Hero Fincorp", logo: "/images/clients/hero-fincorp.png" },
  { name: "Hero Future Energies", logo: "/images/clients/hero-future-energies.png" },
  { name: "JBL", logo: "/images/clients/jbl.png" },
  { name: "Kia", logo: "/images/clients/kia.png" },
  { name: "Hyundai", logo: "/images/clients/hyundai.png" },
  { name: "BMW", logo: "/images/clients/bmw.png" },
  { name: "Bikanervala", logo: "/images/clients/bikanervala.png" },
  { name: "Archies", logo: "/images/clients/archies.svg" },
  { name: "Uber", logo: "/images/clients/uber.png" },
  { name: "Truemeds", logo: "/images/clients/truemeds.png" },
  { name: "BML Munjal University", logo: "/images/clients/bml-munjal.png" },
  { name: "GradRight", logo: "/images/clients/gradright.png" },
  { name: "Eapro", logo: "/images/clients/eapro.png" },
  { name: "Windsong", logo: "/images/clients/windsong.png" },
  { name: "Raman Kant Munjal Foundation", logo: "/images/clients/rkmf.png" },
  { name: "Hamariasha", logo: "/images/clients/hamariasha.png" },
  // Pulled from socialpillow.co — only the names we didn't already carry.
  { name: "Growpital", logo: "/images/clients/growpital.png" },
  { name: "ITP Media Group", logo: "/images/clients/itp-media-group.png" },
  { name: "Thinkvalley", logo: "/images/clients/thinkvalley.png" },
  { name: "Keayn", logo: "/images/clients/keayn.png" },
  { name: "Ultrex", logo: "/images/clients/ultrex.png" },
  { name: "Voltas", logo: "/images/clients/voltas.png" },
  { name: "Kubota", logo: "/images/clients/kubota.png" },
];

// Six headline projects shown in the homepage horizontal scroll (in the
// exact order from the brief). The longer-form portfolio on /work continues
// to list the deeper case studies (Shudh, WRNING, Hero Motocorp, etc.).
export const PORTFOLIO = [
  {
    title: "Truemeds",
    subtitle: "Healthcare Platform — Digital Strategy & Performance",
    category: "Healthcare",
    image: "/images/projects/truemeds.jpg",
    slug: "truemeds",
  },
  {
    title: "WindSong",
    subtitle: "Luxury Real Estate — Brand Launch & Web Experience",
    category: "Real Estate",
    image: "/images/projects/windsong.jpg",
    slug: "windsong",
  },
  {
    title: "Hamariasha",
    subtitle: "Candle Brand — Product Line Launch",
    category: "Branding",
    image: "/images/portfolio/hamari-asha.png",
    slug: "hamariasha",
  },
  {
    title: "BeMySanta",
    subtitle: "Gifting Campaign — Creative Direction & Social",
    category: "Campaign",
    image: "/images/projects/bemysanta.jpg",
    slug: "bemysanta",
  },
  {
    title: "Bikanervala",
    subtitle: "Heritage FMCG — Brand Refresh & Digital",
    category: "FMCG",
    image: "/images/projects/bikanervala.jpg",
    slug: "bikanervala",
  },
  {
    title: "JBL Feel The Bass",
    subtitle: "Headphone Campaign — Creative Direction",
    category: "Campaign",
    image: "/images/portfolio/jbl-feel-the-bass.jpg",
    slug: "jbl-feel-the-bass",
  },
  // Long-tail portfolio entries — surfaced on /work and detail pages.
  {
    title: "Shudh",
    subtitle: "Organic to the Soul — Brand Identity & Packaging",
    category: "Branding",
    image: "/images/portfolio/shudh.jpg",
    slug: "shudh",
  },
  {
    title: "WRNING",
    subtitle: "Fashion Brand — Packaging & Hang Tag Design",
    category: "Branding",
    image: "/images/portfolio/wrning.jpg",
    slug: "wrning",
  },
  {
    title: "Hero Motocorp",
    subtitle: "Digital Marketing & Social Media Management",
    category: "Social Media",
    image: "/images/portfolio/hero-motocorp.jpg",
    slug: "hero-motocorp",
  },
  {
    title: "Uber India",
    subtitle: "Creative Campaign — Brand Awareness",
    category: "Content",
    image: "/images/portfolio/uber-india.jpg",
    slug: "uber-india",
  },
];

export const STATS = [
  { value: "200+", label: "Projects" },
  { value: "20+", label: "Industries" },
  { value: "5+", label: "Years & Counting" },
  { value: "6+", label: "Countries" },
];

// Industries the agency serves. Project + client counts feed the Industries
// page cards; the order roughly tracks where we have the strongest portfolio.
export const INDUSTRIES = [
  {
    slug: "fmcg",
    name: "FMCG",
    description:
      "Fast-moving markets with short buying cycles. We blend brand-building creative with performance media to capture demand and drive measurable revenue.",
    projects: 28,
    clients: 9,
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description:
      "Regulated environments where trust matters. Compliance-aware creative paired with first-party data acquisition engines that respect the category.",
    projects: 22,
    clients: 7,
  },
  {
    slug: "automotive",
    name: "Automotive & Mobility",
    description:
      "Long consideration cycles, big-ticket purchases. Multi-channel campaigns that move buyers from interest to dealership with measurable lift.",
    projects: 24,
    clients: 6,
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description:
      "Premium positioning, lead quality and sales-team enablement under one umbrella. Brand systems + cinematic experiences + qualified pipeline.",
    projects: 14,
    clients: 8,
  },
  {
    slug: "fintech",
    name: "Fintech & BFSI",
    description:
      "Complex products with high trust requirements. Clarity-first creative and conversion journeys built around regulated category constraints.",
    projects: 18,
    clients: 6,
  },
  {
    slug: "ecommerce",
    name: "E-Commerce & D2C",
    description:
      "Performance, retention and brand all expected on the same dashboard. We integrate paid media, lifecycle automation and storefront optimisation.",
    projects: 32,
    clients: 11,
  },
  {
    slug: "education",
    name: "Education & Ed-Tech",
    description:
      "High-intent, research-led decisions. Lead quality, nurturing journeys and enrolment conversion — measured by what actually reaches admissions.",
    projects: 16,
    clients: 7,
  },
  {
    slug: "hospitality",
    name: "Hospitality & F&B",
    description:
      "Experience-led decisions, seasonal demand, omnichannel customer journeys. Booking conversions, brand preference and content that travels.",
    projects: 12,
    clients: 5,
  },
  {
    slug: "retail",
    name: "Retail",
    description:
      "Omnichannel customer journeys and price-sensitive buyers. Performance-led strategies that drive footfall, conversions and repeat purchase.",
    projects: 17,
    clients: 6,
  },
  {
    slug: "fashion-lifestyle",
    name: "Fashion & Lifestyle",
    description:
      "Visual-first categories where craft, content and culture matter equally. End-to-end branding, social and influencer programmes.",
    projects: 14,
    clients: 6,
  },
  {
    slug: "saas-tech",
    name: "SaaS & Tech",
    description:
      "Long sales cycles, complex products, ICP-led growth. Account-based campaigns, content engines, and product-led marketing systems.",
    projects: 13,
    clients: 5,
  },
];

// Real team — photos sourced from the company-shared Team Photos folder.
// `photo: null` renders an initials placeholder card. Display order matches
// the seniority listed in the team sheet.
export const TEAM = [
  { name: "Mayank Gupta", role: "Founder & CEO", photo: "/images/team/mayank.jpeg" },
  { name: "Anuj Baid", role: "Co-Founder & CTO", photo: "/images/team/anuj.png" },
  { name: "Mehak Gupta", role: "Creative Director", photo: "/images/team/mehak.jpeg" },
  { name: "Nandini Gupta", role: "Creative Strategist", photo: "/images/team/nandini.jpeg" },
  { name: "Pankhuri Gupta", role: "Head of Content", photo: "/images/team/pankhuri.jpeg" },
  { name: "Abhishek Prajapati", role: "Head Editor", photo: null as string | null },
  { name: "Md Zishan", role: "Head Designer", photo: "/images/team/zishan.png" },
  { name: "Naira Gehani", role: "Social Media Strategist", photo: "/images/team/naira.jpeg" },
  { name: "Isha Sachdeva", role: "Head SEO", photo: null as string | null },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  {
    label: "Solutions",
    href: "/services",
    dropdown: [
      {
        label: "Brand Solutions",
        href: "/services/brand-solutions",
        description: "Social, creative, content and campaigns under one roof.",
      },
      {
        label: "Tech Solutions",
        href: "/services/tech-solutions",
        description: "Custom platforms, engineered to scale.",
      },
      {
        label: "Media Solutions",
        href: "/services/media-solutions",
        description: "Performance + brand media planned together.",
      },
      {
        label: "Research Solutions",
        href: "/services/research-solutions",
        description: "Research that turns data into decisions.",
      },
      {
        label: "Film & Photography",
        href: "/services/film-photography",
        description: "Brand films and product photography, shot in-house.",
      },
    ],
  },
  { label: "Industries", href: "/industries" },
  {
    label: "About",
    href: "/about",
    dropdown: [
      { label: "Our Story", href: "/about", description: "How we started and where we're going." },
      { label: "Team", href: "/about#team", description: "The people behind the work." },
      { label: "Process", href: "/about#principles", description: "How we approach every engagement." },
    ],
  },
  { label: "Blog", href: "/blog" },
];

// Featured visuals for the About mega-menu (right column of the navbar
// dropdown). Two preview tiles shown irrespective of which About sub-item
// is hovered — these stay constant so they read as the section's
// permanent supporting imagery.
export const ABOUT_MEGA_FEATURED: {
  title: string;
  caption: string;
  image: string;
  href: string;
}[] = [
  {
    title: "Our Story",
    caption: "Built in India, made for the world.",
    image: "/images/portfolio/shudh.jpg",
    href: "/about",
  },
  {
    title: "Our Team",
    caption: "Specialists across brand, content and media.",
    image: "/images/portfolio/hero-motocorp.jpg",
    href: "/about#team",
  },
];
