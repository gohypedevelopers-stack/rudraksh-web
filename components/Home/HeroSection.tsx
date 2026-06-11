"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-start bg-[#030303] bg-[url('/hero-bg.jpg')] bg-no-repeat bg-cover bg-center md:bg-right py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 md:via-black/70 to-black/35 md:to-transparent z-0 pointer-events-none" />

      <div className="absolute top-[46%] left-[30%] md:left-[35%] -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[340px] font-serif text-zinc-900/35 pointer-events-none select-none z-0">
        ॐ
      </div>

      <div className="w-full px-5 md:px-20 relative z-10">
        <div className="max-w-2xl text-left relative z-10">
          <div
            className={cn(
              "flex items-center mb-6 transition-all duration-1000 ease-out transform",
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <div className="w-12 h-[1px] bg-[#c3a267]/60 mr-4" />
            <span className="text-[#c3a267] text-[11px] font-bold tracking-[0.25em] uppercase">
              100% AUTHENTIC • LAB VERIFIED
            </span>
          </div>

          <h1
            className={cn(
              "font-serif text-[42px] sm:text-[58px] md:text-[68px] lg:text-[68px] xl:text-[76px] font-normal leading-[1.12] tracking-wide text-white mb-6 transition-all duration-1000 delay-[150ms] ease-out transform",
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Elevate Your Energy. <br />
            Embrace the <span className="italic text-[#c3a267] font-serif font-light">Divine.</span>
          </h1>

          <p
            className={cn(
              "text-zinc-400 font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-[480px] mb-12 tracking-wide transition-all duration-1000 delay-[300ms] ease-out transform",
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Certified authentic Rudraksha beads, <br />
            handpicked for divine energy and benefits.
          </p>

          <div
            className={cn(
              "flex flex-col sm:flex-row gap-5 items-stretch sm:items-center w-full transition-all duration-1000 delay-[450ms] ease-out transform",
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <Link href="/shop" className="block">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black font-bold text-[11px] tracking-[0.2em] uppercase h-14 px-8 rounded-[2px] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-black/40"
              >
                Explore Collection
                <svg className="w-4 h-4 text-black stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Button>
            </Link>

            <Link href="/guide" className="block">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent! hover:bg-white/10! border border-white! hover:border-white! text-white! hover:text-white! font-bold text-[11px] tracking-[0.2em] uppercase h-14 px-8 rounded-[2px] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16" fill="currentColor" className="text-white scale-75 origin-center" />
                </svg>
                How Rudraksha Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
