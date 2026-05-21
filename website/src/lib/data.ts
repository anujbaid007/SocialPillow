// Extended data for dynamic detail pages

// Each `feature` is now a rich object with a title + descriptive blurb.
// Legacy single-string entries are still accepted via the union below
// — the renderer normalises them — but new content should always use
// the object shape.
export type ServiceFeature = string | { title: string; description: string };

export const SERVICE_DETAILS: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    color: string;
    longDescription: string;
    features: ServiceFeature[];
    process: { step: string; description: string }[];
  }
> = {
  "brand-solutions": {
    title: "Brand Solutions",
    subtitle: "Holistic Digital Presence",
    description:
      "Social, creative, content and campaigns under one roof. Brand-building for the biggest names.",
    color: "#A412E2",
    longDescription:
      "Your brand is the lasting impression you leave on every customer, partner and team member. We deliver the full integrated brand experience — from day-to-day social media management to new brand launches — combining strategy, design, content and campaigns so every touchpoint reinforces who you are.",
    features: [
      {
        title: "Social Media Management",
        description:
          "Daily content calendars, community management and performance reporting across every platform that matters to your audience.",
      },
      {
        title: "Original Content & Copywriting",
        description:
          "Editorial, ad copy, captions and long-form content written in your brand voice and engineered for the platform it's published on.",
      },
      {
        title: "Graphic Design, Iconography & Illustration",
        description:
          "Visual systems, custom illustration, infographics and iconography that scale across every touchpoint without losing personality.",
      },
      {
        title: "Video Editing & Animation",
        description:
          "Reels, ads, motion graphics and brand films cut, colour-graded and animated in-house — built for the platforms that matter.",
      },
      {
        title: "Film Production, AVs & Product Photography",
        description:
          "End-to-end production: pre-pro, shoot, edit, grade. Product, lifestyle and brand photography led by directors who understand the system.",
      },
      {
        title: "Campaign Planning",
        description:
          "360-degree campaigns mapped to business goals — concept, creative, channel mix, production and rollout under one timeline.",
      },
      {
        title: "Influencer Marketing & ORM",
        description:
          "Vetted creator partnerships, brief development, content QA and online reputation management to amplify what already performs.",
      },
      {
        title: "Print, OOH & Mainline Advertising",
        description:
          "Hoardings, print, packaging-ready collateral and TV/cinema mainline — designed and produced with the same craft as the digital work.",
      },
      {
        title: "New Brand Launch & Rebranding",
        description:
          "Naming, positioning, identity system, guidelines and launch campaigns. Whether you're starting fresh or evolving — built to last.",
      },
    ],
    process: [
      { step: "Discover", description: "Deep research into your category, audience and competitive landscape." },
      { step: "Define", description: "Establish positioning, personality and the core messaging framework." },
      { step: "Design", description: "Craft a visual system — logo, typography, color and imagery — that scales." },
      { step: "Deliver", description: "Hand off comprehensive guidelines and assets for consistent application." },
    ],
  },
  "tech-solutions": {
    title: "Tech Solutions",
    subtitle: "Custom Platforms, Engineered to Scale",
    description:
      "From storefronts to bespoke web apps, technology engineered to simplify every customer journey.",
    color: "#7115FF",
    longDescription:
      "Technology should simplify, not complicate. We engineer custom web platforms, e-commerce stores, CRM integrations and automation systems that make every customer journey faster, smoother and more profitable. Strategy, design and engineering in one team.",
    features: [
      {
        title: "Custom Web Development",
        description:
          "Bespoke websites and web applications built on modern frameworks. Performant, accessible and engineered for the long run.",
      },
      {
        title: "Web Personalization",
        description:
          "Audience-aware content, dynamic CTAs and segmentation logic so every visitor sees the most relevant version of your site.",
      },
      {
        title: "UI / UX Design",
        description:
          "Research-driven product design — user flows, wireframes, prototypes and polished interfaces ready to engineer against.",
      },
      {
        title: "SEO",
        description:
          "Technical SEO audits, content strategy, schema markup and link building that compound month over month.",
      },
      {
        title: "CRM & ERP Solutions",
        description:
          "Salesforce, HubSpot, Zoho and custom CRM integrations. Sales + service + marketing wired into a single source of truth.",
      },
      {
        title: "E-Commerce",
        description:
          "Shopify, WooCommerce and custom storefronts. Optimised checkout, inventory and post-purchase flows that lift revenue per visit.",
      },
      {
        title: "Email Marketing & Marketing Automation",
        description:
          "Lifecycle journeys, drip campaigns and trigger-based automation across Klaviyo, Mailchimp, HubSpot and custom stacks.",
      },
      {
        title: "Chatbots & Conversational Tools",
        description:
          "AI assistants, WhatsApp commerce bots and lead-qualification flows that work 24/7 across every channel.",
      },
    ],
    process: [
      { step: "Scope", description: "Map requirements, integrations and success metrics with stakeholders." },
      { step: "Design", description: "Wireframes, prototypes and design systems aligned to brand and product." },
      { step: "Build", description: "Engineer with modern stacks — accessible, performant and secure by default." },
      { step: "Iterate", description: "Ship, measure, refine. Every launch is the start of the optimisation loop." },
    ],
  },
  "media-solutions": {
    title: "Media Solutions",
    subtitle: "Performance & Brand Media",
    description:
      "Not just generating leads — building lasting relationships. Performance and brand media planned together.",
    color: "#B60BFF",
    longDescription:
      "Media that earns attention and converts it. We plan and buy across paid social, search, programmatic and emerging channels — putting the right message in front of the right audience at the right moment, with the analytics to prove it.",
    features: [
      {
        title: "Media Buying",
        description:
          "Direct and programmatic buys across DSPs, premium publishers and CTV with brand safety, frequency capping and creative refresh built in.",
      },
      {
        title: "Media Planning",
        description:
          "Channel-agnostic plans that share creative, audience signals and budget across paid social, search, programmatic and offline.",
      },
      {
        title: "Performance Marketing",
        description:
          "Full-funnel paid campaigns across Meta, Google, TikTok, LinkedIn and YouTube — built and optimised around your KPIs.",
      },
      {
        title: "MarTech for Media",
        description:
          "Server-side tracking, CDP integrations, attribution dashboards and first-party data activation — the plumbing performance media needs.",
      },
    ],
    process: [
      { step: "Research", description: "Identify audiences, channels and competitive ad landscapes." },
      { step: "Plan", description: "Build a media mix and campaign architecture mapped to business goals." },
      { step: "Activate", description: "Launch creative, set up tracking and start the optimisation cycle." },
      { step: "Scale", description: "Double down on what works, cut what doesn't, and report on real ROI." },
    ],
  },
  "research-solutions": {
    title: "Research Solutions",
    subtitle: "Consulting & Research for Businesses",
    description:
      "Market research, consumer behaviour studies and analytics that turn data into decisions.",
    color: "#8B5CF6",
    longDescription:
      "Decisions get better when they're grounded in data. We design and run primary and secondary research — market sizing, consumer studies, usability testing, campaign analytics — to turn ambiguity into a clear, testable plan.",
    features: [
      {
        title: "Market Research",
        description:
          "Category landscapes, competitor analysis and segmentation studies that ground strategy in evidence.",
      },
      {
        title: "Consumer Behaviour & Satisfaction Analysis",
        description:
          "Qualitative interviews, behavioural studies and NPS programmes that surface why customers do what they do.",
      },
      {
        title: "Campaign Analytics",
        description:
          "Attribution, MMM and post-campaign deep dives that quantify what worked, what didn't, and why.",
      },
      {
        title: "Usability Testing & Product Development",
        description:
          "Moderated and unmoderated user testing, A/B research and feature prioritisation grounded in real user behaviour.",
      },
    ],
    process: [
      { step: "Frame", description: "Define the question — what decision does this research need to inform?" },
      { step: "Gather", description: "Run primary and secondary research using the right method for the question." },
      { step: "Synthesise", description: "Turn raw data into themes, insights and recommendations leadership can act on." },
      { step: "Activate", description: "Pair findings with execution — research becomes a launch plan, not a deck." },
    ],
  },
  "film-photography": {
    title: "Film & Photography",
    subtitle: "Brand Stories, Shot In-House",
    description:
      "Brand films, ads, product photography and motion — produced in-house from script to final cut.",
    color: "#6D28D9",
    longDescription:
      "An in-house motion picture unit covering pre-production, shoot, edit, grade and motion design. Reels and ads for the platforms that matter, brand films for the boardroom — built with the same craft regardless of length.",
    features: [
      {
        title: "Brand Films & AVs",
        description:
          "Long-form brand storytelling, manifestos and corporate AVs — concept to delivery, theatrical-grade craft.",
      },
      {
        title: "Product Photography",
        description:
          "Studio and on-location product, lifestyle and packshot photography led by art directors who understand your visual system.",
      },
      {
        title: "Motion Graphics & Animation",
        description:
          "2D/3D motion design, kinetic typography, explainers and product animations made for digital and broadcast.",
      },
      {
        title: "Reel & Short-Form Production",
        description:
          "Vertical, snackable, platform-native short form built for Reels, Shorts and TikTok — produced at the cadence social demands.",
      },
      {
        title: "Direction & Post-Production",
        description:
          "End-to-end direction, edit, sound design and colour grading. Final cuts that match the script-board promise.",
      },
    ],
    process: [
      { step: "Concept", description: "Develop story, treatment, mood board and storyboard with the creative team." },
      { step: "Pre-Production", description: "Casting, location, crew, props — everything aligned before camera roll." },
      { step: "Shoot", description: "Production day(s) with the right crew, gear and direction to capture the vision." },
      { step: "Post", description: "Edit, sound, motion, colour. Delivered in every aspect ratio and platform spec." },
    ],
  },
  "social-media": {
    title: "Social Media",
    subtitle: "Strategy & Management",
    description:
      "Insight-driven content strategies, community building, and social media management that builds real connections with your audience.",
    color: "#7115FF",
    longDescription:
      "We create and manage social media strategies that cut through the noise. From content calendars and creative production to community management and influencer collaborations, we build your brand's presence on every platform that matters. Our data-driven approach ensures every post, story, and campaign delivers measurable results.",
    features: [
      "Content Strategy & Calendar Planning",
      "Creative Production (Reels, Stories, Posts)",
      "Community Management & Engagement",
      "Influencer Marketing & Collaborations",
      "Social Listening & Trend Analysis",
      "Monthly Analytics & Performance Reports",
    ],
    process: [
      { step: "Audit", description: "Deep dive into your current social presence, competitors, and audience behavior." },
      { step: "Strategy", description: "Build a tailored content strategy aligned with your brand goals and KPIs." },
      { step: "Create", description: "Produce scroll-stopping content — from visuals to copy to video." },
      { step: "Optimize", description: "Continuously analyze performance and refine the approach for maximum impact." },
    ],
  },
  branding: {
    title: "Branding",
    subtitle: "Identity & Design",
    description:
      "From logo design to complete brand guidelines, we craft identities that stand out and tell your story with clarity and purpose.",
    color: "#A412E2",
    longDescription:
      "Your brand is more than a logo — it's the feeling people get when they interact with you. We craft comprehensive brand identities that resonate with your target audience, differentiate you from competitors, and create lasting emotional connections. Every color, typeface, and visual element is chosen with intention.",
    features: [
      "Logo Design & Visual Identity",
      "Brand Strategy & Positioning",
      "Brand Guidelines & Style Guides",
      "Packaging Design",
      "Brand Naming & Messaging",
      "Brand Collateral & Stationery",
    ],
    process: [
      { step: "Discover", description: "Understand your vision, audience, and competitive landscape through deep research." },
      { step: "Define", description: "Establish brand positioning, personality, and core messaging framework." },
      { step: "Design", description: "Create visual identity systems including logo, typography, color palette, and imagery." },
      { step: "Deliver", description: "Provide comprehensive brand guidelines and all assets for consistent application." },
    ],
  },
  seo: {
    title: "SEO",
    subtitle: "Search Optimization",
    description:
      "Data-driven SEO strategies that improve your rankings, drive organic traffic, and deliver measurable business results.",
    color: "#B60BFF",
    longDescription:
      "We don't just optimize for search engines — we optimize for business growth. Our SEO strategies combine technical excellence with compelling content creation to build sustainable organic visibility. We focus on the metrics that matter: qualified traffic, conversions, and revenue growth.",
    features: [
      "Technical SEO Audit & Optimization",
      "Keyword Research & Content Strategy",
      "On-Page & Off-Page SEO",
      "Local SEO & Google Business Profile",
      "Link Building & Digital PR",
      "Analytics & Rank Tracking",
    ],
    process: [
      { step: "Analyze", description: "Comprehensive audit of your site's technical health, content, and backlink profile." },
      { step: "Plan", description: "Develop a prioritized roadmap based on impact potential and business goals." },
      { step: "Execute", description: "Implement on-page optimizations, create targeted content, and build quality links." },
      { step: "Report", description: "Track rankings, traffic, and conversions with transparent monthly reporting." },
    ],
  },
  "performance-marketing": {
    title: "Performance Marketing",
    subtitle: "Paid Media & PPC",
    description:
      "Strategic ad placement across channels using the right messaging at the optimal time to maximize your ROI.",
    color: "#8B5CF6",
    longDescription:
      "Every rupee of your ad spend should work harder. We design and manage performance marketing campaigns across Google, Meta, LinkedIn, and programmatic channels. Our approach combines creative excellence with data-driven optimization to deliver the best possible return on your investment.",
    features: [
      "Google Ads (Search, Display, Shopping)",
      "Meta Ads (Facebook & Instagram)",
      "LinkedIn & Twitter Advertising",
      "Remarketing & Retargeting Campaigns",
      "Landing Page Optimization",
      "ROI Tracking & Attribution",
    ],
    process: [
      { step: "Research", description: "Identify target audiences, keywords, and competitive ad landscapes." },
      { step: "Launch", description: "Build campaign structures, craft ad creatives, and set up tracking." },
      { step: "Test", description: "Run A/B tests on creatives, audiences, and placements to find winners." },
      { step: "Scale", description: "Double down on what works, cut what doesn't, and continuously optimize for ROI." },
    ],
  },
  "content-strategy": {
    title: "Content Strategy",
    subtitle: "Creation & Marketing",
    description:
      "Compelling content that resonates with your audience — from ad copy and editorial to video production and animation.",
    color: "#6D28D9",
    longDescription:
      "Great content doesn't just fill feeds — it drives action. We develop content strategies that align with your business objectives, resonate with your audience, and perform across every channel. From editorial and copywriting to video production and motion graphics, we create content that converts.",
    features: [
      {
        title: "Content strategy & editorial planning",
        description:
          "Audience research, content pillars and editorial calendars that map every piece to the customer journey and business goals.",
      },
      {
        title: "Copywriting & brand voice development",
        description:
          "A brand voice that earns trust. Headlines, ad copy, web content and long-form editorial that sound unmistakably like you.",
      },
      {
        title: "Video production & motion graphics",
        description:
          "Reels, ads, brand films and motion graphics produced in-house from script to final cut — built for the platforms that matter.",
      },
      {
        title: "Photography & art direction",
        description:
          "Product, lifestyle and brand photography led by art directors who understand your visual system end-to-end.",
      },
      {
        title: "Influencer & creator collaborations",
        description:
          "Curated creator partnerships, briefs, contract management and content QA — turning third-party voices into trusted brand storytellers.",
      },
      {
        title: "Email & lifecycle content",
        description:
          "Newsletters, drip campaigns and lifecycle emails written and designed for measurable engagement and revenue.",
      },
    ],
    process: [
      { step: "Map", description: "Audit existing content, identify gaps, and map content to the customer journey." },
      { step: "Craft", description: "Develop content pillars, messaging frameworks, and an editorial calendar." },
      { step: "Produce", description: "Create high-quality content across formats — written, visual, and video." },
      { step: "Measure", description: "Track engagement, conversions, and content performance to iterate and improve." },
    ],
  },
};

export const PORTFOLIO_DETAILS: Record<
  string,
  {
    title: string;
    subtitle: string;
    category: string;
    client: string;
    year: string;
    overview: string;
    challenge: string;
    solution: string;
    results: string[];
    services: string[];
  }
> = {
  shudh: {
    title: "Shudh",
    subtitle: "Organic to the Soul — Brand Identity & Packaging",
    category: "Branding",
    client: "Shudh Organics",
    year: "2024",
    overview:
      "Shudh approached us to create a brand identity that reflects the purity and authenticity of their organic products. We developed a comprehensive visual system from logo to packaging.",
    challenge:
      "The organic food market in India is crowded with brands claiming purity. Shudh needed a visual identity that would instantly communicate trust, natural origins, and premium quality.",
    solution:
      "We crafted a minimalist yet warm brand identity with earthy tones and organic textures. The packaging design uses kraft materials with clean typography and hand-drawn botanical illustrations that highlight the natural sourcing of each product.",
    results: [
      "Complete brand identity launch in 8 weeks",
      "Packaging system for 12+ product SKUs",
      "40% increase in shelf visibility in retail stores",
      "Brand recognition grew 3x within first quarter",
    ],
    services: ["Brand Identity", "Packaging Design", "Brand Guidelines", "Print Collateral"],
  },
  wrning: {
    title: "WRNING",
    subtitle: "Fashion Brand — Packaging & Hang Tag Design",
    category: "Branding",
    client: "WRNING Fashion",
    year: "2024",
    overview:
      "WRNING is a bold streetwear brand targeting Gen-Z. We designed packaging and hang tags that match the brand's rebellious energy and premium positioning.",
    challenge:
      "WRNING needed packaging that would be Instagram-worthy, align with streetwear culture, and justify their premium price point while keeping production costs reasonable.",
    solution:
      "We designed a striking black-and-neon packaging system with die-cut hang tags featuring bold typography and holographic finishes. Each piece doubles as a collectible, encouraging unboxing content on social media.",
    results: [
      "500+ organic unboxing videos in first month",
      "Packaging became a brand differentiator",
      "25% increase in repeat purchase rate",
      "Featured in 3 fashion publications",
    ],
    services: ["Packaging Design", "Hang Tag Design", "Print Production", "Brand Collateral"],
  },
  "jbl-feel-the-bass": {
    title: "JBL Feel The Bass",
    subtitle: "Headphone Campaign — Creative Direction",
    category: "Social Media",
    client: "JBL India",
    year: "2024",
    overview:
      "A creative campaign for JBL's headphone range that brought the 'Feel The Bass' tagline to life through immersive social media content and creative direction.",
    challenge:
      "JBL wanted to connect with a younger Indian audience beyond product specs. The challenge was making audio equipment feel exciting and culturally relevant on social media.",
    solution:
      "We developed a 360-degree social media campaign featuring Indian musicians, street culture, and immersive audio experiences. The creative direction blended bold visuals with bass-heavy aesthetics — vibrations, waveforms, and high-energy environments.",
    results: [
      "2M+ impressions across social platforms",
      "35% increase in social engagement rate",
      "Campaign content shared by 50+ influencers",
      "15% uplift in online sales during campaign period",
    ],
    services: ["Creative Direction", "Social Media Campaign", "Content Production", "Influencer Coordination"],
  },
  hamariasha: {
    title: "Hamariasha",
    subtitle: "Candle Brand — Product Line Launch",
    category: "Branding",
    client: "Hamari Asha Foundation",
    year: "2023",
    overview:
      "Hamari Asha is a social enterprise making handcrafted candles. We developed their brand identity and launched their first product line with a focus on the artisans' stories.",
    challenge:
      "As a social enterprise, Hamari Asha needed branding that communicated both premium product quality and their social mission of empowering women artisans.",
    solution:
      "We created a warm, artisanal brand identity that weaves storytelling into every touchpoint. Packaging features hand-lettered elements and each candle comes with the artisan's story, creating an emotional connection with buyers.",
    results: [
      "Successful launch of 8 candle variants",
      "Sold out first production batch in 3 weeks",
      "Featured on social enterprise showcases",
      "Brand story drove 60% of first-time purchases",
    ],
    services: ["Brand Identity", "Product Packaging", "Brand Story", "Launch Strategy"],
  },
  "hero-motocorp": {
    title: "Hero Motocorp",
    subtitle: "Digital Marketing & Social Media Management",
    category: "Social Media",
    client: "Hero Motocorp",
    year: "2023–Present",
    overview:
      "Ongoing social media management and digital marketing for India's largest two-wheeler manufacturer, covering product launches, campaigns, and community engagement.",
    challenge:
      "Hero Motocorp needed to rejuvenate their social presence to appeal to younger riders while maintaining their legacy audience. Content needed to work across multiple models and regional markets.",
    solution:
      "We developed a multi-pillar content strategy covering product highlights, lifestyle content, rider community stories, and campaign activations. Each model line has a distinct visual language while staying under the Hero brand umbrella.",
    results: [
      "500K+ new social media followers in 12 months",
      "3x increase in social engagement rate",
      "Managed 4 major product launch campaigns",
      "Content strategy adopted across 5 regional markets",
    ],
    services: ["Social Media Management", "Content Strategy", "Campaign Management", "Community Building"],
  },
  "uber-india": {
    title: "Uber India",
    subtitle: "Creative Campaign — Brand Awareness",
    category: "Content",
    client: "Uber India",
    year: "2024",
    overview:
      "A brand awareness campaign for Uber India focused on humanizing the ride-sharing experience and showcasing real stories from Indian cities.",
    challenge:
      "Uber needed to differentiate from competitors in the Indian market by building emotional connections rather than competing solely on pricing and availability.",
    solution:
      "We created a content series spotlighting real stories — from late-night rides that became friendships to daily commutes that changed lives. The campaign used documentary-style photography and authentic narratives across digital channels.",
    results: [
      "4M+ views on campaign content",
      "28% increase in brand sentiment scores",
      "Campaign featured in marketing publications",
      "Highest engagement campaign of the quarter for Uber India",
    ],
    services: ["Content Strategy", "Creative Campaign", "Photography Direction", "Digital Marketing"],
  },
  truemeds: {
    title: "Truemeds",
    subtitle: "Healthcare Platform — Digital Strategy & Performance",
    category: "Tech",
    client: "Truemeds",
    year: "2024–Present",
    overview:
      "End-to-end digital partner for India's fast-growing online pharmacy. We own the marketing automation, performance media and on-site experience that drives subscription growth.",
    challenge:
      "Truemeds operates in a regulated healthcare category where trust, repeat purchase and cost-per-acquisition all need to move in the right direction simultaneously. Generic D2C playbooks don't transfer.",
    solution:
      "We built a multi-funnel performance system anchored on first-party data — Meta and Google performance media, server-side tracking, lifecycle automation, and personalised on-site journeys for new vs returning patients. Creative is refreshed weekly against a tested winners library.",
    results: [
      "Acquisition cost reduced by 38% over six months",
      "Repeat-purchase rate up 24% via lifecycle automation",
      "Conversion rate on landing pages improved 2.1×",
      "Onboarding funnel completion up 31%",
    ],
    services: ["Performance Marketing", "Marketing Automation", "Web Personalization", "Analytics"],
  },
  windsong: {
    title: "WindSong",
    subtitle: "Luxury Real Estate — Brand Launch & Web Experience",
    category: "Brand",
    client: "WindSong Properties",
    year: "2024",
    overview:
      "A premium real estate launch needing brand identity, sales-ready collateral and a digital experience that matches the asset class. We delivered the full system end-to-end.",
    challenge:
      "Luxury property buyers don't tolerate generic builder marketing. The brand and the digital experience had to communicate craft, exclusivity and confidence from the first scroll.",
    solution:
      "We built the identity (logo, type system, palette, motion language), the marketing site (single-page cinematic experience with scroll-driven storytelling), and the launch campaign across digital and OOH. Lead-quality scoring integrated into the sales CRM.",
    results: [
      "Sold-out launch phase within 11 weeks of go-live",
      "Average lead quality score 2.4× builder benchmark",
      "Site avg. dwell time of 4m12s vs category benchmark 1m08s",
      "Direct enquiries up 3× post brand launch",
    ],
    services: ["Brand Identity", "Web Design & Development", "Performance Marketing", "OOH & Print"],
  },
  bemysanta: {
    title: "BeMySanta",
    subtitle: "Gifting Campaign — Creative Direction & Social",
    category: "Campaign",
    client: "BeMySanta",
    year: "2024",
    overview:
      "A festive gifting campaign that turned a transactional product into a cultural moment. We led creative direction, content production and the full social rollout across India.",
    challenge:
      "Holiday gifting in India is dominated by category cliches and last-minute purchases. BeMySanta needed a campaign that broke through the noise and made buying a gift feel personal again.",
    solution:
      "We built the campaign around the idea of 'being someone's Santa' — a multi-format storytelling rollout (Reels, hero film, influencer activations, on-pack QR experiences). Personalised landing pages for every gifter let recipients unwrap the message digitally.",
    results: [
      "8.2M+ organic impressions in 18 days",
      "Influencer-led UGC contributed 41% of total reach",
      "Site sessions up 5.6× vs pre-campaign baseline",
      "Sell-through up 67% on the featured SKU range",
    ],
    services: ["Creative Direction", "Social Campaign", "Influencer Marketing", "Content Production"],
  },
  bikanervala: {
    title: "Bikanervala",
    subtitle: "Heritage FMCG — Brand Refresh & Digital",
    category: "FMCG",
    client: "Bikanervala",
    year: "2023–Present",
    overview:
      "Working with one of India's most beloved sweets and snacks brands to modernise its digital presence without sacrificing the heritage that built the equity.",
    challenge:
      "Bikanervala had decades of brand equity but a digital presence that didn't match its category leadership. Online discovery, e-commerce conversion, and content discipline all needed an upgrade.",
    solution:
      "We led a refresh of the social content system (always-on cadence with festive flagship campaigns), rebuilt the e-commerce experience for both gifting and self-purchase journeys, and stood up performance media across Meta and Google to drive online order growth.",
    results: [
      "Online orders up 2.8× year-over-year",
      "Social engagement rate up 64%",
      "Festive campaigns delivered 14M+ impressions",
      "E-commerce conversion improved 41% post relaunch",
    ],
    services: ["Social Media Management", "E-Commerce", "Performance Marketing", "Content Production"],
  },
};

export const BLOG_DETAILS: Record<
  string,
  {
    title: string;
    tag: string;
    readTime: string;
    date: string;
    author: string;
    excerpt: string;
    content: { type: "paragraph" | "heading" | "list"; text: string; items?: string[] }[];
  }
> = {
  "social-media-evolution-2025": {
    title: "How Social Media Marketing is Evolving in 2025",
    tag: "Social Media",
    readTime: "5 min",
    date: "January 15, 2025",
    author: "Social Pillow Team",
    excerpt:
      "The landscape of social media marketing continues to shift dramatically...",
    content: [
      {
        type: "paragraph",
        text: "The social media landscape in 2025 is radically different from just two years ago. With AI-generated content flooding feeds, platforms shifting towards short-form video, and new players entering the market, brands need to rethink their entire approach to social media marketing.",
      },
      {
        type: "heading",
        text: "The Rise of AI-Powered Content",
      },
      {
        type: "paragraph",
        text: "AI tools have democratized content creation, but they've also raised the bar for what audiences expect. The brands that stand out are those that use AI as an enhancer, not a replacement for authentic human creativity. The sweet spot lies in using AI for data analysis and ideation while keeping the human touch in final execution.",
      },
      {
        type: "heading",
        text: "Short-Form Video Dominates",
      },
      {
        type: "paragraph",
        text: "Instagram Reels, YouTube Shorts, and TikTok continue to be the primary discovery channels for brands. But the approach has matured — it's no longer about going viral with one video. Consistent, niche-specific content that builds community is outperforming one-hit wonders.",
      },
      {
        type: "heading",
        text: "Key Trends to Watch",
      },
      {
        type: "list",
        text: "",
        items: [
          "Community-led growth over follower count metrics",
          "Social commerce integration becoming seamless",
          "Micro-influencer partnerships outperforming celebrity endorsements",
          "Ephemeral content creating urgency and FOMO",
          "LinkedIn emerging as a key B2B content platform",
        ],
      },
      {
        type: "paragraph",
        text: "At Social Pillow, we're helping brands navigate these shifts by combining data-driven insights with culturally relevant creativity. The future of social media marketing belongs to brands that are authentic, adaptive, and audience-first.",
      },
    ],
  },
  "brand-storytelling-modern": {
    title: "The Art of Brand Storytelling for Modern Audiences",
    tag: "Branding",
    readTime: "7 min",
    date: "February 3, 2025",
    author: "Social Pillow Team",
    excerpt:
      "In a world overflowing with content, brand storytelling has become essential...",
    content: [
      {
        type: "paragraph",
        text: "Every brand has a story. But in 2025, it's not enough to just tell that story — you need to make your audience a part of it. Modern brand storytelling is participatory, authentic, and built for the platforms where your audience actually spends time.",
      },
      {
        type: "heading",
        text: "Why Storytelling Matters More Than Ever",
      },
      {
        type: "paragraph",
        text: "Consumers are bombarded with thousands of marketing messages daily. The ones that stick are the ones that make people feel something. A well-crafted brand story creates emotional resonance that no amount of feature-listing can achieve. People don't buy products — they buy the story behind them.",
      },
      {
        type: "heading",
        text: "The Pillars of Effective Brand Storytelling",
      },
      {
        type: "list",
        text: "",
        items: [
          "Authenticity: Your story must be rooted in truth, not aspiration",
          "Consistency: Every touchpoint should reinforce the same narrative",
          "Relatability: Your audience should see themselves in your story",
          "Evolution: Great brand stories grow and adapt with time",
        ],
      },
      {
        type: "heading",
        text: "Indian Brands Getting It Right",
      },
      {
        type: "paragraph",
        text: "Indian brands are increasingly leveraging cultural narratives to create powerful connections. From celebrating regional festivals to championing local artisans, the most successful Indian brands are those that weave cultural pride into their identity without being performative.",
      },
      {
        type: "paragraph",
        text: "The key takeaway? Don't just tell your audience what you sell. Tell them why you exist, what you stand for, and how their story intersects with yours. That's the essence of modern brand storytelling.",
      },
    ],
  },
  "seo-strategies-growth": {
    title: "SEO Strategies That Actually Drive Business Growth",
    tag: "SEO",
    readTime: "6 min",
    date: "February 18, 2025",
    author: "Social Pillow Team",
    excerpt:
      "Beyond keywords and backlinks, modern SEO requires a holistic approach...",
    content: [
      {
        type: "paragraph",
        text: "SEO has evolved far beyond keyword stuffing and link farms. In 2025, the brands winning in organic search are those that prioritize user experience, content quality, and technical excellence in equal measure. Here's what's actually working.",
      },
      {
        type: "heading",
        text: "Content Quality Over Quantity",
      },
      {
        type: "paragraph",
        text: "Google's algorithms are smarter than ever at distinguishing genuinely helpful content from SEO-bait. Focus on creating in-depth, authoritative content that truly answers your audience's questions. One comprehensive guide outperforms ten thin articles every time.",
      },
      {
        type: "heading",
        text: "Technical SEO Fundamentals",
      },
      {
        type: "list",
        text: "",
        items: [
          "Core Web Vitals optimization (LCP, FID, CLS)",
          "Mobile-first indexing and responsive design",
          "Structured data and schema markup",
          "Site architecture and internal linking",
          "Page speed optimization and CDN setup",
        ],
      },
      {
        type: "heading",
        text: "The Local SEO Advantage",
      },
      {
        type: "paragraph",
        text: "For Indian businesses, local SEO is a massive untapped opportunity. Optimizing your Google Business Profile, building local citations, and creating location-specific content can drive significant foot traffic and local leads. We've seen clients achieve 200%+ growth in local organic traffic within six months.",
      },
      {
        type: "paragraph",
        text: "The bottom line: SEO is a long game, but it's the most sustainable channel for growth. Invest in quality, be patient, and the results will compound over time.",
      },
    ],
  },
  "performance-marketing-roi": {
    title: "Performance Marketing: Maximizing ROI in 2025",
    tag: "Performance",
    readTime: "8 min",
    date: "March 5, 2025",
    author: "Social Pillow Team",
    excerpt:
      "Strategic ad placement and data-driven optimization can transform your campaigns...",
    content: [
      {
        type: "paragraph",
        text: "Performance marketing in 2025 is both more powerful and more complex than ever. With rising ad costs across platforms and increased competition, the brands that win are those with the sharpest strategies and the most disciplined optimization processes.",
      },
      {
        type: "heading",
        text: "The Full-Funnel Approach",
      },
      {
        type: "paragraph",
        text: "The biggest mistake brands make is focusing exclusively on bottom-funnel conversions. A full-funnel strategy that builds awareness, nurtures interest, and then drives action consistently outperforms conversion-only campaigns. Your cost per acquisition drops when people already know and trust your brand.",
      },
      {
        type: "heading",
        text: "Creative is the New Targeting",
      },
      {
        type: "paragraph",
        text: "With privacy changes limiting targeting options, your creative work has become the primary differentiator. Platforms like Meta's Advantage+ use AI to find the right audience — but only if your creatives are compelling enough. Invest in creative testing and iteration.",
      },
      {
        type: "heading",
        text: "Optimization Tactics That Work",
      },
      {
        type: "list",
        text: "",
        items: [
          "Test 5-10 creative variants per campaign before scaling",
          "Use dynamic creative optimization for personalization",
          "Set up proper attribution models (not just last-click)",
          "Retarget based on engagement depth, not just page views",
          "Allocate 20% of budget to testing new channels and formats",
        ],
      },
      {
        type: "paragraph",
        text: "At Social Pillow, we manage performance campaigns with a test-learn-scale methodology. Every campaign starts with hypotheses, validates them with data, and then scales what works. It's how we consistently deliver strong ROI for our clients.",
      },
    ],
  },
  "content-strategy-converts": {
    title: "Content Strategy That Converts: A Complete Guide",
    tag: "Content",
    readTime: "10 min",
    date: "March 20, 2025",
    author: "Social Pillow Team",
    excerpt:
      "Creating content that resonates with your audience and drives conversions...",
    content: [
      {
        type: "paragraph",
        text: "Content without strategy is just noise. In a world where billions of pieces of content are published daily, having a clear content strategy isn't optional — it's the difference between brands that grow and brands that get lost in the scroll.",
      },
      {
        type: "heading",
        text: "Start With Your Audience, Not Your Product",
      },
      {
        type: "paragraph",
        text: "The most common content mistake is starting with what you want to say instead of what your audience wants to hear. Map your audience's journey — their questions, pain points, and aspirations — and create content that meets them at each stage.",
      },
      {
        type: "heading",
        text: "The Content Pyramid",
      },
      {
        type: "list",
        text: "",
        items: [
          "Hero content: Big, bold campaigns that drive awareness (quarterly)",
          "Hub content: Regular series that build audience and community (weekly)",
          "Hygiene content: Always-on content that captures search demand (daily)",
        ],
      },
      {
        type: "heading",
        text: "Distribution Is Half the Battle",
      },
      {
        type: "paragraph",
        text: "Creating great content is only half the equation. Without a distribution strategy, even the best content dies in obscurity. Repurpose every piece of content across multiple formats and channels. A single blog post can become a carousel, a reel, a newsletter, and a LinkedIn thread.",
      },
      {
        type: "heading",
        text: "Measuring Content ROI",
      },
      {
        type: "paragraph",
        text: "Track metrics that matter at each funnel stage: awareness (impressions, reach), engagement (shares, comments, time on page), and conversion (leads, sign-ups, sales). Vanity metrics like follower count tell you very little about content effectiveness.",
      },
      {
        type: "paragraph",
        text: "A solid content strategy is the backbone of modern marketing. It takes time to build, but the compound returns make it the highest-ROI marketing investment you can make.",
      },
    ],
  },
  "digital-presence-indian-brands": {
    title: "Building a Strong Digital Presence for Indian Brands",
    tag: "Branding",
    readTime: "6 min",
    date: "April 8, 2025",
    author: "Social Pillow Team",
    excerpt:
      "Indian brands are increasingly recognizing the importance of digital-first strategies...",
    content: [
      {
        type: "paragraph",
        text: "India's digital revolution has created a massive opportunity for brands willing to invest in their online presence. With 800+ million internet users and growing digital literacy, the brands that build strong digital foundations today will dominate tomorrow.",
      },
      {
        type: "heading",
        text: "The Digital-First Mindset",
      },
      {
        type: "paragraph",
        text: "For Indian brands, going digital-first doesn't mean abandoning traditional channels. It means putting digital at the center of your strategy and letting it inform everything else. Your website, social media, and search presence should be as polished as your physical storefront.",
      },
      {
        type: "heading",
        text: "Key Components of Digital Presence",
      },
      {
        type: "list",
        text: "",
        items: [
          "A modern, fast-loading website that works on every device",
          "Active and engaged social media profiles",
          "Strong search engine visibility for key terms",
          "Consistent brand identity across all digital touchpoints",
          "Customer reviews and social proof",
        ],
      },
      {
        type: "heading",
        text: "Regional Language Content",
      },
      {
        type: "paragraph",
        text: "One of the biggest untapped opportunities for Indian brands is regional language content. With millions of users coming online in Hindi, Tamil, Telugu, and other languages, brands that create content in regional languages can access audiences that English-only brands miss entirely.",
      },
      {
        type: "paragraph",
        text: "At Social Pillow, we help Indian brands build digital presences that are authentically Indian and globally competitive. Our mission is taking the best of Indian creative talent to the world.",
      },
    ],
  },
};
