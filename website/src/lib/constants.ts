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

export const SERVICES = [
  {
    title: "Social Media",
    slug: "social-media",
    subtitle: "Strategy & Management",
    description:
      "Insight-driven content strategies, community building, and social media management that builds real connections with your audience.",
    color: "#7115FF",
  },
  {
    title: "Branding",
    slug: "branding",
    subtitle: "Identity & Design",
    description:
      "From logo design to complete brand guidelines, we craft identities that stand out and tell your story with clarity and purpose.",
    color: "#A412E2",
  },
  {
    title: "SEO",
    slug: "seo",
    subtitle: "Search Optimization",
    description:
      "Data-driven SEO strategies that improve your rankings, drive organic traffic, and deliver measurable business results.",
    color: "#B60BFF",
  },
  {
    title: "Performance",
    slug: "performance-marketing",
    subtitle: "Paid Media & PPC",
    description:
      "Strategic ad placement across channels using the right messaging at the optimal time to maximize your ROI.",
    color: "#8B5CF6",
  },
  {
    title: "Content",
    slug: "content-strategy",
    subtitle: "Creation & Marketing",
    description:
      "Compelling content that resonates with your audience — from ad copy and editorial to video production and animation.",
    color: "#6D28D9",
  },
];

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
    image: "/images/portfolio/jbl.jpg",
    slug: "jbl-feel-the-bass",
  },
  {
    title: "Hamari Asha",
    subtitle: "Candle Brand — Product Line Launch",
    category: "Branding",
    image: "/images/portfolio/hamari-asha.jpg",
    slug: "hamari-asha",
  },
  {
    title: "Hero Motocorp",
    subtitle: "Digital Marketing & Social Media Management",
    category: "Social Media",
    image: "/images/portfolio/hero.jpg",
    slug: "hero-motocorp",
  },
  {
    title: "Uber India",
    subtitle: "Creative Campaign — Brand Awareness",
    category: "Content",
    image: "/images/portfolio/uber.jpg",
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
  { label: "Work", href: "/work" },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Social Media", href: "/services/social-media" },
      { label: "Branding", href: "/services/branding" },
      { label: "SEO", href: "/services/seo" },
      { label: "Performance Marketing", href: "/services/performance-marketing" },
      { label: "Content Strategy", href: "/services/content-strategy" },
    ],
  },
  {
    label: "About",
    href: "/about",
    dropdown: [
      { label: "Our Story", href: "/about" },
      { label: "Team", href: "/about#team" },
    ],
  },
  { label: "Blog", href: "/blog" },
];
