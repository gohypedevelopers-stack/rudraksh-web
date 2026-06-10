import Link from "next/link";

const categories = [
  { name: "Beads", img: "/category_beads.jpg", href: "/shop?category=beads", icon: "beads" },
  { name: "Siddh Mala", img: "/category_siddh_mala.jpg", href: "/shop?category=siddh-mala", icon: "siddh" },
  { name: "Jap Mala", img: "/category_jap_mala.jpg", href: "/shop?category=jap-mala", icon: "jap" },
  { name: "Bracelet", img: "/category_bracelet.jpg", href: "/shop?category=bracelet", icon: "bracelet" },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-[#FCFBF7] border-b border-zinc-200/80">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-stone-900 mb-3">
            Explore Our Rudraksha Collection
          </h2>
          <p className="text-stone-600 font-serif text-sm sm:text-base tracking-wide italic">
            Timeless beads trusted for centuries
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {categories.map((cat) => (
            <Link href={cat.href} key={cat.name} className="block group">
              <div className="bg-white border border-stone-200/50 rounded-[28px] overflow-hidden shadow-xs hover:shadow-md hover:border-[#c3a267]/20 transition-all duration-300 flex flex-col items-center">
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-stone-100">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                <div className="relative -mt-8 z-10 w-16 h-16 rounded-full bg-[#FAF5EE] border-4 border-white flex items-center justify-center shadow-xs">
                  {cat.icon === "beads" && (
                    <svg className="w-7 h-7 text-[#8c4f1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" />
                      <path d="M12 22a3 3 0 0 0 3-3c0-2-3-5-3-5s-3 3-3 5a3 3 0 0 0 3 3z" />
                      <path d="M2 12a3 3 0 0 0 3 3c2 0 5-3 5-3s-3-3-5-3a3 3 0 0 0-3 3z" />
                      <path d="M22 12a3 3 0 0 0-3-3c-2 0-5 3-5 3s3 3 5 3a3 3 0 0 0 3-3z" />
                      <path d="M4.93 4.93a3 3 0 0 0 0 4.24c1.41 1.41 4.24 1.41 4.24 1.41s0-2.83-1.41-4.24a3 3 0 0 0-4.24 0z" />
                      <path d="M19.07 19.07a3 3 0 0 0 0-4.24c-1.41-1.41-4.24-1.41-4.24-1.41s0 2.83 1.41 4.24a3 3 0 0 0 4.24 0z" />
                      <path d="M19.07 4.93a3 3 0 0 0-4.24 0c-1.41 1.41-1.41 4.24-1.41 4.24s2.83 0 4.24-1.41a3 3 0 0 0 0-4.24z" />
                      <path d="M4.93 19.07a3 3 0 0 0 4.24 0c1.41-1.41 1.41-4.24 1.41-4.24s-2.83 0-4.24 1.41a3 3 0 0 0 0 4.24z" />
                    </svg>
                  )}
                  {cat.icon === "siddh" && (
                    <svg className="w-7 h-7 text-[#8c4f1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 6c1 5 4 8 7 8s6-3 7-8" />
                      <circle cx="5.2" cy="6" r="1" fill="currentColor" />
                      <circle cx="6.5" cy="8.5" r="1" fill="currentColor" />
                      <circle cx="8.5" cy="11" r="1" fill="currentColor" />
                      <circle cx="12" cy="14" r="1.2" fill="currentColor" />
                      <circle cx="15.5" cy="11" r="1" fill="currentColor" />
                      <circle cx="17.5" cy="8.5" r="1" fill="currentColor" />
                      <circle cx="18.8" cy="6" r="1" fill="currentColor" />
                      <circle cx="12" cy="17" r="1.5" />
                      <line x1="12" y1="14" x2="12" y2="15.5" />
                    </svg>
                  )}
                  {cat.icon === "jap" && (
                    <svg className="w-7 h-7 text-[#8c4f1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 6c1 5 3.5 7.5 6 7.5s5-2.5 6-7.5" />
                      <circle cx="6.2" cy="6" r="0.9" fill="currentColor" />
                      <circle cx="7.3" cy="8.2" r="0.9" fill="currentColor" />
                      <circle cx="9.2" cy="10.5" r="0.9" fill="currentColor" />
                      <circle cx="12" cy="13.5" r="1.2" fill="currentColor" />
                      <circle cx="14.8" cy="10.5" r="0.9" fill="currentColor" />
                      <circle cx="16.7" cy="8.2" r="0.9" fill="currentColor" />
                      <circle cx="17.8" cy="6" r="0.9" fill="currentColor" />
                      <line x1="12" y1="13.5" x2="12" y2="15.5" />
                      <path d="M10 19 L14 19 L12 15.5 Z" fill="currentColor" />
                      <line x1="11" y1="19" x2="10 22" />
                      <line x1="12" y1="19" x2="12 22" />
                      <line x1="13" y1="19" x2="14 22" />
                    </svg>
                  )}
                  {cat.icon === "bracelet" && (
                    <svg className="w-7 h-7 text-[#8c4f1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="7.5" strokeDasharray="3 3" />
                      <circle cx="12" cy="4.5" r="1" fill="currentColor" />
                      <circle cx="15.3" cy="5.8" r="1" fill="currentColor" />
                      <circle cx="17.7" cy="8.3" r="1" fill="currentColor" />
                      <circle cx="19.5" cy="12" r="1" fill="currentColor" />
                      <circle cx="17.7" cy="15.7" r="1" fill="currentColor" />
                      <circle cx="15.3" cy="18.2" r="1" fill="currentColor" />
                      <circle cx="12" cy="19.5" r="1" fill="currentColor" />
                      <circle cx="8.7" cy="18.2" r="1" fill="currentColor" />
                      <circle cx="6.3" cy="15.7" r="1" fill="currentColor" />
                      <circle cx="4.5" cy="12" r="1" fill="currentColor" />
                      <circle cx="6.3" cy="8.3" r="1" fill="currentColor" />
                      <circle cx="8.7" cy="5.8" r="1" fill="currentColor" />
                    </svg>
                  )}
                </div>

                <div className="pt-4 pb-8 text-center">
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-stone-900 font-semibold group-hover:text-[#c3a267] transition-colors duration-200">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
