"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselItem = {
  name: string;
  img: string;
  benefit: string;
  icon: "yantra" | "shield" | "lotus" | "sun" | "mandala";
};

const carouselItems: CarouselItem[] = [
  { name: "1-13 Mukhi", img: "/one_mukhi.png", benefit: "Spiritual Growth", icon: "yantra" },
  { name: "14-21 Mukhi", img: "/fourteen_mukhi.png", benefit: "Courage & Strength", icon: "shield" },
  { name: "Gauri Shankar", img: "/gauri_shankar.png", benefit: "Balance & Harmony", icon: "lotus" },
  { name: "Ganesh Rudraksha", img: "/ganesh_rudraksha.png", benefit: "Success & Wisdom", icon: "mandala" },
  { name: "Trijuti", img: "/trijuti.png", benefit: "Protection & Power", icon: "yantra" },
  { name: "Garbh Gauri", img: "/garbh_gauri.png", benefit: "Nurturing & Peace", icon: "lotus" },
  { name: "Nirakar", img: "/nirakar.png", benefit: "Focus & Clarity", icon: "sun" },
  { name: "Sawar", img: "/savar.png", benefit: "Prosperity & Wealth", icon: "mandala" },
];

function BenefitIcon({ type }: { type: CarouselItem["icon"] }) {
  switch (type) {
    case "lotus":
      return (
        <svg className="w-4 h-4 text-[#c3a267] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 21c-1.5-2-3-3.5-3-5.5 0-2 2-3.5 3-5.5 1 2 3 3.5 3 5.5 0 2-1.5 3.5-3 5.5z" />
          <path d="M12 16.5c-2.5 0-4.5-1.5-4.5-3.5 0-2 2-3.5 3.5-4.5.5.8 1 1.5 1 2.5 0-1 .5-1.7 1-2.5 1.5 1 3.5 2.5 3.5 4.5 0 2-2 3.5-4.5 3.5z" />
        </svg>
      );
    case "mandala":
      return (
        <svg className="w-4 h-4 text-[#c3a267] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9l-2.1 2.1M7 17l-2.1 2.1" />
          <circle cx="12" cy="12" r="8.5" strokeDasharray="3 3" />
        </svg>
      );
    case "yantra":
      return (
        <svg className="w-4 h-4 text-[#c3a267] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12,2 21,7.5 21,18.5 12,22 3,18.5 3,7.5" />
          <polygon points="12,5 18,8.5 18,15.5 12,19 6,15.5 6,8.5" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "sun":
      return (
        <svg className="w-4 h-4 text-[#c3a267] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M18.5 5.5l-1.5 1.5M7 17l-1.5 1.5" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4 text-[#c3a267] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v18M3 12h18" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      );
  }
}

export default function PremiumCollectionSection() {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <section className="min-h-screen flex flex-col justify-center py-16 bg-[#FCFBF7] border-b border-zinc-200/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/collection_bg.png')] bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none z-0" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-stone-900 mb-2">
            Premium Rudraksha Collection
          </h2>

          <div className="flex items-center justify-center gap-4 my-4">
            <div className="w-16 h-[1.5px] bg-[#c3a267]/40" />
            <svg className="w-5 h-5 text-[#c3a267]/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21c-2-2.5-5-4-5-7 0-4.5 5-8 5-8s5 3.5 5 8c0 3 3 4.5 5 7" />
              <path d="M12 21c-1-2-3-3.5-3-6 0-3.5 3-6.5 3-6.5s3 3 3 6.5c0 2.5-2 4-3 6" />
              <path d="M7 14c-1.5-1.5-2.5-3-2.5-5 0-3 2.5-4 2.5-4s1.5 2.5 1 5c-.3 1.5-.7 3-1 4z" />
              <path d="M17 14c1.5-1.5 2.5-3 2.5-5 0-3-2.5-4-2.5-4s-1.5 2.5-1 5c.3 1.5.7 3-1 4z" />
            </svg>
            <div className="w-16 h-[1.5px] bg-[#c3a267]/40" />
          </div>

          <p className="text-stone-500 text-sm tracking-wide font-sans">
            Discover Authentic Beads and Their Powerful Blessings
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-4 md:px-12 relative z-10">
          <button
            onClick={() => {
              if (scrollRef.current) {
                const { scrollLeft, clientWidth } = scrollRef.current;
                scrollRef.current.scrollTo({ left: scrollLeft - clientWidth / 2, behavior: "smooth" });
              }
            }}
            className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center rounded-full cursor-pointer transition-all shadow-md hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.8]" />
          </button>

          <div
            ref={scrollRef}
            onScroll={() => {
              if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                const totalScrollable = scrollWidth - clientWidth;
                if (totalScrollable > 0) {
                  setScrollProgress((scrollLeft / totalScrollable) * 100);
                }
              }
            }}
            className="flex overflow-x-auto gap-6 sm:gap-8 pb-8 pt-4 px-3 scrollbar-none snap-x snap-mandatory justify-start"
          >
            {carouselItems.map((item) => {
              const slug = item.name.toLowerCase().replace(/ /g, "-");
              return (
                <Link
                  href={`/rudraksha/${slug}`}
                  key={item.name}
                  className="flex flex-col items-center select-none snap-center min-w-[170px] sm:min-w-[195px] md:min-w-[220px] shrink-0 bg-[#FAF8F5]/90 backdrop-blur-xs border border-stone-200/50 rounded-2xl px-[5px] py-[10px] shadow-sm hover:shadow-md hover:border-[#c3a267]/30 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative group/circle flex items-center justify-center mb-4">
                    <div className="absolute inset-0 rounded-full border border-[#c3a267]/50 group-hover/circle:scale-[1.04] transition-transform duration-300 pointer-events-none" />
                    <div className="m-1 rounded-full overflow-hidden aspect-square w-28 h-28 sm:w-32 sm:h-32 border border-zinc-200/40 relative z-10">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover/circle:scale-105" />
                    </div>
                  </div>

                  <h3 className="font-serif text-sm sm:text-base text-stone-900 font-normal mt-1 group-hover:text-[#c3a267] transition-colors duration-200 text-center">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-2 mb-1">
                    <BenefitIcon type={item.icon} />
                    <span className="text-[10px] sm:text-xs text-stone-500 tracking-wide font-sans text-center">
                      {item.benefit}
                    </span>
                  </div>

                  <div className="w-full border-t border-dashed border-stone-300/60 my-3" />

                  <div className="text-stone-900 group-hover:text-[#c3a267] transition-colors duration-200 mt-1 text-[11px] sm:text-xs font-serif tracking-wider font-semibold text-center">
                    View Details
                  </div>
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => {
              if (scrollRef.current) {
                const { scrollLeft, clientWidth } = scrollRef.current;
                scrollRef.current.scrollTo({ left: scrollLeft + clientWidth / 2, behavior: "smooth" });
              }
            }}
            className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center rounded-full cursor-pointer transition-all shadow-md hidden md:flex"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2.5 mt-10 relative z-10">
          {[0, 1, 2, 3].map((index) => {
            const isActive = Math.min(Math.floor(scrollProgress / 25.1), 3) === index;
            return (
              <button
                key={index}
                onClick={() => {
                  if (scrollRef.current) {
                    const { scrollWidth, clientWidth } = scrollRef.current;
                    const totalScrollable = scrollWidth - clientWidth;
                    scrollRef.current.scrollTo({
                      left: (index * 25 * totalScrollable) / 100,
                      behavior: "smooth",
                    });
                  }
                }}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                  isActive ? "bg-[#c3a267] scale-110" : "bg-stone-300 hover:bg-stone-400",
                )}
                aria-label={`Go to slide page ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
