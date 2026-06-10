import Link from "next/link";
import { mukhis } from "./homeData";

function MukhiCard({ item }: { item: (typeof mukhis)[number] }) {
  const slug = item.name.toLowerCase().replace(/ /g, "-");

  return (
    <Link
      href={`/rudraksha/${slug}`}
      className="relative flex flex-col justify-between items-center rounded-2xl bg-white border border-stone-200/50 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer w-full h-[165px] sm:h-[180px] pt-3 group"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] z-0">
        <svg className="w-16 h-16 text-stone-850" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 21c-2-2.5-5-4-5-7 0-4.5 5-8 5-8s5 3.5 5 8c0 3 3 4.5 5 7" />
          <path d="M12 21c-1-2-3-3.5-3-6 0-3.5 3-6.5 3-6.5s3 3 3 6.5c0 2.5-2 4-3 6" />
        </svg>
      </div>

      <div className="z-10">
        <svg className="w-3.5 h-3.5 text-[#c3a267]/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3h-4v-4l-3-3 3-3V5h4z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>

      <div className="w-[70%] max-w-[64px] sm:max-w-[76px] aspect-square rounded-full overflow-hidden border border-stone-200/50 bg-white z-10 my-1.5 flex items-center justify-center">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>

      <span className="font-sans text-[10px] sm:text-xs font-bold text-stone-900 mb-2 text-center z-10">
        {item.name}
      </span>

      <div className="w-full bg-[#F5F2EA] py-1.5 px-1 text-center border-t border-stone-200/30 z-10">
        <span className="text-[9px] sm:text-[10px] font-sans text-stone-600 font-medium tracking-wide truncate block">
          {item.deity}
        </span>
      </div>
    </Link>
  );
}

export default function EveryMukhiSection() {
  return (
    <section className="py-24 bg-[#FCFBF7] border-b border-zinc-200/80 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-stone-900 mb-4">
            Every Mukhi Holds <span className="text-[#c3a267]">Divine Energy</span>
          </h2>
          <p className="text-stone-500 text-sm tracking-wide font-sans max-w-2xl mx-auto">
            Explore our authentic Rudraksha collection with different mukhi types, each carrying unique spiritual benefits.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-2 md:px-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-3 mb-3">
            {mukhis.slice(0, 10).map((item) => (
              <MukhiCard key={item.name} item={item} />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-3 mb-3">
            {mukhis.slice(10, 20).map((item) => (
              <MukhiCard key={item.name} item={item} />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 max-w-5xl mx-auto xl:max-w-[50%]">
            {mukhis.slice(20).map((item) => (
              <MukhiCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
