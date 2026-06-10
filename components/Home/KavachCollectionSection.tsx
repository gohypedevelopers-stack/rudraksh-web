"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const kavachProducts = [
  {
    name: "Vyapar Vriddhi Kavach",
    img: "/vyapar_kavach.png",
    benefit: "Prosperity • Growth • Success",
    price: "₹13,499.00",
    oldPrice: "₹18,999.00",
  },
  {
    name: "Swasthya Raksha Kavach",
    img: "/swasthya_kavach.png",
    benefit: "Health • Harmony • Well-being",
    price: "₹2,099.00",
    oldPrice: "₹2,399.00",
  },
  {
    name: "Kaal Sarpa Nivaran Kavach",
    img: "/kaal_sarpa_kavach.png",
    benefit: "Protection • Relief • Balance",
    price: "₹14,699.00",
    oldPrice: "₹17,699.00",
  },
  {
    name: "Devi Shakti Kavach",
    img: "/devi_shakti_kavach.png",
    benefit: "Strength • Courage • Positive Energy",
    price: "₹6,599.00",
    oldPrice: "₹6,999.00",
  },
];

function handleAddKavachToCart(kavach: (typeof kavachProducts)[number]) {
  const parsedPrice = parseInt(kavach.price.replace(/[₹,.]/g, ""), 10) / 100;
  const parsedOldPrice = parseInt(kavach.oldPrice.replace(/[₹,.]/g, ""), 10) / 100;
  const slug = kavach.name.toLowerCase().replace(/ /g, "-");

  const cartEvent = new CustomEvent("add-to-cart", {
    detail: {
      id: slug,
      name: kavach.name,
      subtitle: kavach.benefit,
      price: parsedPrice,
      oldPrice: parsedOldPrice,
      discount: "31% OFF",
      img: kavach.img,
    },
  });
  window.dispatchEvent(cartEvent);
}

export default function KavachCollectionSection() {
  return (
    <section className="py-24 bg-[#FCFBF7] border-b border-zinc-200/80 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 max-w-6xl mx-auto px-4 gap-6">
          <div className="text-left">
            <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-stone-900 mb-3">
              Divya Kavach <span className="text-[#c3a267] italic font-light">Collection</span>
            </h2>
            <p className="text-stone-500 text-sm tracking-wide font-sans">
              Sacred Rudraksha designs crafted for protection, peace & positive energy.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full border border-stone-300/80 hover:border-stone-500 hover:bg-stone-50 text-stone-600 hover:text-stone-900 flex items-center justify-center cursor-pointer transition-colors">
              <ChevronLeft className="w-5 h-5 stroke-[1.8]" />
            </button>
            <button className="w-10 h-10 rounded-full border border-stone-300/80 hover:border-stone-500 hover:bg-stone-50 text-stone-600 hover:text-stone-900 flex items-center justify-center cursor-pointer transition-colors">
              <ChevronRight className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {kavachProducts.map((kavach) => {
            const slug = kavach.name.toLowerCase().replace(/ /g, "-");

            return (
              <div
                key={kavach.name}
                className="bg-white border border-stone-200/50 rounded-[24px] overflow-hidden shadow-xs hover:shadow-md hover:border-[#c3a267]/20 transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                  <Link href={`/rudraksha/${slug}`}>
                    <img
                      src={kavach.img}
                      alt={kavach.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />
                  </Link>
                  <button className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-stone-200/60 shadow-xs hover:bg-stone-50 cursor-pointer transition-colors group/heart">
                    <svg className="w-4 h-4 text-stone-500 group-hover/heart:text-red-500 transition-colors stroke-[1.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col items-center justify-between text-center">
                  <div className="flex flex-col items-center w-full">
                    <Link href={`/rudraksha/${slug}`}>
                      <h3 className="font-serif text-base text-stone-900 font-semibold mb-1 group-hover:text-[#c3a267] transition-colors duration-200 cursor-pointer">
                        {kavach.name}
                      </h3>
                    </Link>

                    <div className="w-8 h-[1.5px] bg-[#c3a267]/50 my-2" />

                    <span className="text-[10px] sm:text-xs text-stone-500 tracking-wide font-sans font-medium">
                      {kavach.benefit}
                    </span>

                    <div className="flex items-center gap-2 mt-3.5 mb-4 font-sans">
                      <span className="font-bold text-[#b91c1c] text-sm sm:text-base">{kavach.price}</span>
                      <span className="text-stone-400 line-through text-xs sm:text-sm">{kavach.oldPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddKavachToCart(kavach)}
                    className="w-full bg-[#1c1917] hover:bg-black text-white font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase h-11 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <svg className="w-4 h-4 text-[#c3a267]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    ADD TO CART
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button className="border border-zinc-900 hover:bg-zinc-900 hover:text-white text-zinc-900 transition-all duration-300 rounded-full px-8 py-3.5 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2.5 mx-auto mt-14 cursor-pointer bg-transparent">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          VIEW ALL COLLECTIONS
        </button>
      </div>
    </section>
  );
}
