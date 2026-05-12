"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import { BRAND, STATS, SERVICE_TICKER } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import GradientText from "@/components/ui/GradientText";
import MagneticButton from "@/components/ui/MagneticButton";

export type HeroProduct = {
  title: string;
  link: string;
  gradient: string;
  icon?: string;
};

export const HeroParallax = ({
  products,
}: {
  products: HeroProduct[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.12], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [0.19, 0.75]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.12], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-1000, 100]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[200vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] [will-change:auto] [backface-visibility:hidden]"
    >
      <Header />
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="pb-40 relative z-0 [will-change:transform,opacity] [backface-visibility:hidden]"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const TickerClient = () => {
  const [tickerIndex, setTickerIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((i) => (i + 1) % SERVICE_TICKER.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="overflow-hidden h-8 md:h-10 inline-flex items-center">
      <motion.span
        key={tickerIndex}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="font-heading text-lg md:text-2xl font-700 inline-block"
      >
        <GradientText from="#7115FF" to="#B60BFF">{SERVICE_TICKER[tickerIndex]}</GradientText>
      </motion.span>
    </span>
  );
};

export const Header = () => {
  const headlineLines = ["Boost Brands,", "Maximize Reach,", "Drive Growth."];

  return (
    <div className="max-w-[1400px] relative z-10 mx-auto pt-32 pb-10 md:pt-40 md:pb-16 px-6 md:px-16 lg:px-24 w-full left-0 top-0">
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-heading text-[clamp(2.5rem,10.5vw,8rem)] sm:text-[clamp(3.4rem,9.5vw,8rem)] font-900 leading-[0.98] sm:leading-[0.95] tracking-[-0.015em] sm:tracking-[-0.035em] text-sp-white w-full max-w-[1200px]"
      >
        {headlineLines.map((line, i) => (
          <motion.span
            key={line}
            className="block"
            initial={{ y: 34 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {line}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        initial={{ y: 26, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
        className="mt-10 md:mt-14 flex items-center gap-3"
      >
        <span className="font-body text-lg md:text-2xl text-sp-text/40">We specialize in</span>
        <TickerClient />
      </motion.div>

      <motion.p
        initial={{ y: 26, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="mt-6 font-body text-lg md:text-xl text-sp-text/40 max-w-[600px] leading-relaxed"
      >
        {BRAND.description}
      </motion.p>

      <motion.div
        initial={{ y: 26, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
        className="mt-12 flex flex-wrap items-center gap-5"
      >
        <MagneticButton strength={0.25}>
          <Link href="/contact" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-sp-purple hover:bg-sp-purple-light text-white rounded-full font-body text-lg font-500 transition-all duration-300 hover:shadow-[0_0_50px_rgba(113,21,255,0.4)]">
            <span className="relative z-10">Start a Project</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </MagneticButton>
        <MagneticButton strength={0.2}>
          <Link href="/work" className="inline-flex items-center gap-3 px-10 py-5 border border-white/15 hover:border-sp-purple/40 text-sp-text/50 hover:text-sp-white rounded-full font-body text-lg transition-all duration-300">
            View Our Work
          </Link>
        </MagneticButton>
      </motion.div>

      <motion.div
        initial={{ y: 26, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16"
      >
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-900">
              <GradientText from="#7115FF" to="#A412E2">{stat.value}</GradientText>
            </p>
            <p className="font-body text-[11px] md:text-sm text-sp-text/40 mt-3 uppercase tracking-[0.12em] md:tracking-[0.15em] leading-snug">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: HeroProduct;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0 rounded-2xl overflow-hidden"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl group-hover/product:shadow-sp-purple/20 h-full w-full"
      >
        <div
          className="absolute inset-0 h-full w-full"
          style={{ background: product.gradient }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Icon */}
        {product.icon && (
          <span className="absolute top-6 right-6 text-4xl opacity-40 group-hover/product:opacity-70 transition-opacity">
            {product.icon}
          </span>
        )}
        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="font-heading text-xl font-700 text-white/90 group-hover/product:text-white transition-colors">
            {product.title}
          </h3>
        </div>
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-40 bg-sp-purple/20 pointer-events-none transition-opacity duration-300" />
    </motion.div>
  );
};
