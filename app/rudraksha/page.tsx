"use client";

import * as React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const products = [
  { name: "NIRAKAR", origin: "Origin: Nepal", img: "/nirakar.png" },
  { name: "1 MUKHI", origin: "Origin: Nepal", img: "/one_mukhi.png" },
  { name: "2 MUKHI", origin: "Origin: Nepal", img: "/nirakar.png" },
  { name: "3 MUKHI", origin: "Origin: Nepal", img: "/collector_bead.png" },
  { name: "4 MUKHI", origin: "Origin: Nepal", img: "/garbh_gauri.png" },
  { name: "5 MUKHI", origin: "Origin: Nepal", img: "/nirakar.png" },
  { name: "6 MUKHI", origin: "Origin: Nepal", img: "/fourteen_mukhi.png" },
  { name: "7 MUKHI", origin: "Origin: Nepal", img: "/one_mukhi.png" },
  { name: "9 MUKHI", origin: "Origin: Nepal", img: "/collector_bead.png" },
  { name: "10 MUKHI", origin: "Origin: Nepal", img: "/garbh_gauri.png" },
  { name: "12 MUKHI", origin: "Origin: Nepal", img: "/one_mukhi.png" },
  { name: "13 MUKHI", origin: "Origin: Nepal", img: "/collector_bead.png" },
  { name: "14 MUKHI", origin: "Origin: Nepal", img: "/fourteen_mukhi.png" },
  { name: "15 MUKHI", origin: "Origin: Nepal", img: "/garbh_gauri.png" },
  { name: "16 MUKHI", origin: "Origin: Nepal", img: "/nirakar.png" },
  { name: "17 MUKHI", origin: "Origin: Nepal", img: "/one_mukhi.png" },
  { name: "18 MUKHI", origin: "Origin: Nepal", img: "/collector_bead.png" },
  { name: "19 MUKHI", origin: "Origin: Nepal", img: "/garbh_gauri.png" },
  { name: "20 MUKHI", origin: "Origin: Nepal", img: "/nirakar.png" },
  { name: "21 MUKHI", origin: "Origin: Nepal", img: "/collector_bead.png" },
  { name: "GAURI SHANKAR", origin: "Origin: Nepal", img: "/gauri_shankar.png" },
  { name: "GANESH", origin: "Origin: Nepal", img: "/ganesh_rudraksha.png" },
  { name: "TRIJUTI", origin: "Origin: Nepal", img: "/trijuti.png" },
  { name: "SAWAR", origin: "Origin: Nepal", img: "/savar.png" },
  { name: "GARBH GAURI", origin: "Origin: Nepal", img: "/garbh_gauri.png" }
];

export default function ShopPage() {
  return (
    <div className="flex flex-col w-full bg-[#FCFBF7] text-zinc-900 overflow-hidden min-h-screen pt-20">
      
      {/* Top Banner Section */}
      <section className="relative w-full py-16 md:py-24 bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: `url('/shop_banner.png')` }}>
        {/* Soft layout overlay for text contrast */}
        <div className="absolute inset-0 bg-stone-900/5 pointer-events-none z-0" />

        <div className="container mx-auto px-4 text-center relative z-10">
          
          {/* Symmetrical Mandala Logo */}
          <div className="flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#c3a267]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3.5" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9l-2.1 2.1M7 17l-2.1 2.1" />
              <circle cx="12" cy="12" r="8.5" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-stone-900 mb-3 uppercase">
            Premium Rudraksha Collection
          </h1>

          {/* Subtitle */}
          <p className="text-stone-750 text-sm sm:text-base tracking-wide font-sans max-w-xl mx-auto">
            Authentic Beads for Protection, Peace, Prosperity, and Spiritual Growth
          </p>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="py-16 md:py-24 bg-[#FCFBF7]">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 max-w-7xl mx-auto">
            {products.map((item, idx) => {
              const slug = item.name.toLowerCase().replace(/ /g, "-");
              return (
                <Link 
                  href={`/rudraksha/${slug}`}
                  key={idx}
                  className="bg-white border border-stone-200/50 rounded-[28px] p-5 sm:p-6 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-[#c3a267]/25 transition-all duration-300 group cursor-pointer"
                >
                  {/* Double circular bead photo */}
                  <div className="relative group/circle flex items-center justify-center mb-4">
                    {/* Outer Gold Ring */}
                    <div className="absolute inset-0 rounded-full border border-[#c3a267]/50 group-hover/circle:scale-[1.04] transition-transform duration-300 pointer-events-none" />
                    {/* Inner Space + Circular Image Card */}
                    <div className="m-1 rounded-full overflow-hidden aspect-square w-24 h-24 sm:w-28 sm:h-28 border border-zinc-200/40 relative z-10 bg-white">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/circle:scale-105" 
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-sm sm:text-base md:text-lg text-stone-900 font-semibold tracking-wide uppercase mt-1 group-hover:text-[#c3a267] transition-colors duration-200">
                    {item.name}
                  </h3>

                  {/* Origin Metadata */}
                  <span className="text-[10px] sm:text-xs text-stone-500 tracking-wide font-sans mt-1.5 block">
                    {item.origin}
                  </span>

                  {/* Action Outline Button Simulation */}
                  <div className="border border-black text-black group-hover:bg-black group-hover:text-white transition-all duration-300 text-[10px] sm:text-xs tracking-wider px-5 py-1.5 rounded-full font-bold mt-5 uppercase">
                    Shop Now
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* Reusable Footer */}
      <Footer />

    </div>
  );
}
