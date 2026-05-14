export const BRAND = {
  name: "Social Pillow",
  tagline: "marketing you.",
  headline: "Boost Brands, Maximize Reach, Drive Growth.",
  description:
    "We are a team of specialists delivering award-winning work for leading brands worldwide.",
  email: "hello@socialpillow.co",
  phone: "+91-XXXXXXXXXX",
  address: "India",
  social: {
    instagram: "https://www.instagram.com/socialpillow.co/",
    linkedin: "https://www.linkedin.com/company/socialpillow/",
    facebook: "https://www.facebook.com/socialpillow/",
    twitter: "https://x.com/socialpillow",
  },
};

// Three solutions buckets mirroring socialpillow.co structure.
// Each bucket expands on click to reveal capabilities and ships a small
// `featured` list of PORTFOLIO slugs used by the navbar mega-menu to
// show real case-study previews when the user hovers the solution.
export const SOLUTIONS = [
  {
    title: "Brand Strategy",
    slug: "brand-strategy",
    blurb: "It's more than just a logo — it's your legacy.",
    description:
      "We build brand identities that endure. From positioning and messaging to logo systems, visual identity, packaging and brand guidelines — every touchpoint engineered to make your brand unmistakable.",
    capabilities: [
      "Brand positioning & messaging",
      "Logo design & visual identity",
      "Packaging & print design",
      "Brand guidelines & systems",
      "Naming & verbal identity",
    ],
    color: "#A412E2",
    featured: ["shudh", "wrning"] as const,
  },
  {
    title: "Content Strategy",
    slug: "content-strategy",
    blurb: "Maximize your brand's reach while making the most of your budget.",
    description:
      "Content that earns attention and converts it. We plan, produce and distribute compelling content across every channel — from social-first creative to long-form editorial, video and motion.",
    capabilities: [
      "Social media content & community",
      "Video production & motion",
      "Editorial & copywriting",
      "Photography & art direction",
      "Influencer collaborations",
    ],
    color: "#7115FF",
    featured: ["uber-india", "hamari-asha"] as const,
  },
  {
    title: "Media Strategy",
    slug: "media-strategy",
    blurb: "Not just generating leads — building lasting relationships.",
    description:
      "Performance and brand media planned together. We place the right message in front of the right audience at the right moment — across paid social, search, programmatic and emerging channels.",
    capabilities: [
      "Paid social & performance ads",
      "Search & SEO",
      "Programmatic & display",
      "Influencer & creator media",
      "Analytics & attribution",
    ],
    color: "#B60BFF",
    featured: ["jbl-feel-the-bass", "hero-motocorp"] as const,
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

export const PORTFOLIO = [
  {
    title: "Shudh",
    subtitle: "Organic to the Soul — Brand Identity & Packaging",
    category: "Branding",
    image: "/images/portfolio/shudh.jpg",
    slug: "shudh",
  },
  {
    title: "Shudh Identity",
    subtitle: "Carrot Juice — Visual Identity & Brand Card",
    category: "Branding",
    image: "/images/portfolio/shudh-identity.png",
    slug: "shudh-identity",
  },
  {
    title: "WRNING",
    subtitle: "Fashion Brand — Packaging & Hang Tag Design",
    category: "Branding",
    image: "/images/portfolio/wrning.jpg",
    slug: "wrning",
  },
  {
    title: "JBL Feel The Bass",
    subtitle: "Headphone Campaign — Creative Direction",
    category: "Social Media",
    image: "/images/portfolio/jbl-feel-the-bass.jpg",
    slug: "jbl-feel-the-bass",
  },
  {
    title: "Hamari Asha",
    subtitle: "Candle Brand — Product Line Launch",
    category: "Branding",
    image: "/images/portfolio/hamari-asha.png",
    slug: "hamari-asha",
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
  { value: "24+", label: "Brands Served" },
  { value: "5+", label: "Core Services" },
  { value: "100+", label: "Projects Delivered" },
  { value: "3+", label: "Years & Counting" },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  {
    label: "Solutions",
    href: "/services",
    dropdown: [
      {
        label: "Brand Strategy",
        href: "/services/brand-strategy",
        description: "Identity systems that turn your brand into a legacy.",
      },
      {
        label: "Content Strategy",
        href: "/services/content-strategy",
        description: "Content that earns attention and converts it.",
      },
      {
        label: "Media Strategy",
        href: "/services/media-strategy",
        description: "Performance + brand media planned together.",
      },
    ],
  },
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
