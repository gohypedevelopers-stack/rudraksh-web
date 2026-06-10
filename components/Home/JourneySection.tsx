const journeyCards: Array<{
  image: string;
  alt: string;
  badge: string;
  heading: string;
  headingAccent: string;
  description: string;
  accentHighlight?: boolean;
}> = [
  {
    image: "/indonesia_temple.png",
    alt: "Indonesian Rudraksha Journey",
    badge: "Indonesian Rudraksha",
    heading: "aarambh",
    headingAccent: "by RUDRAPURE™",
    description: "Begin your spiritual journey with our Entry-Level Range of Rudraksha",
  },
  {
    image: "/nepal_temple.png",
    alt: "Nepali Rudraksha Journey",
    badge: "Nepali Rudraksha",
    heading: "RudraLUXE",
    headingAccent: "by RUDRAPURE™",
    description: "Experience the power of Purity with Our Premium Nepali Rudraksha Collection",
    accentHighlight: true,
  },
] as const;

export default function JourneySection() {
  return (
    <section className="py-24 bg-[#FCFBF7] border-b border-zinc-200/80 relative overflow-hidden">
      <div className="absolute top-[35%] left-[-2%] md:left-[2%] text-[200px] md:text-[320px] font-serif text-stone-200/15 pointer-events-none select-none z-0">
        ॐ
      </div>

      <div className="absolute top-[20%] right-[-5%] md:right-[-2%] text-stone-200/25 pointer-events-none select-none z-0">
        <svg className="w-64 h-64 opacity-[0.15]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M10 80 C 30 70, 50 40, 70 10" />
          <path d="M30 60 C 25 50, 20 50, 30 60 Z" fill="currentColor" />
          <path d="M30 60 C 35 55, 40 55, 30 60 Z" fill="currentColor" />
          <path d="M40 48 C 35 38, 30 38, 40 48 Z" fill="currentColor" />
          <path d="M40 48 C 45 43, 50 43, 40 48 Z" fill="currentColor" />
          <path d="M50 36 C 45 26, 40 26, 50 36 Z" fill="currentColor" />
          <path d="M50 36 C 55 31, 60 31, 50 36 Z" fill="currentColor" />
          <path d="M60 24 C 55 14, 50 14, 60 24 Z" fill="currentColor" />
          <path d="M60 24 C 65 19, 70 19, 60 24 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-stone-900 mb-4">
            Choose Your Rudraksha Journey
          </h2>
          <p className="text-stone-500 text-sm tracking-wide font-sans max-w-2xl mx-auto">
            Explore our thoughtfully curated collections inspired by ancient traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
          {journeyCards.map((card) => (
            <div key={card.alt} className="h-[460px] sm:h-[530px] relative rounded-3xl overflow-hidden shadow-lg group">
              <img
                src={card.image}
                alt={card.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10 pointer-events-none" />

              <div className="absolute top-6 left-6 z-20 bg-white/95 text-stone-800 px-4 py-2.5 rounded-full flex items-center gap-2 border border-stone-200/40 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-xs">
                <svg className="w-3.5 h-3.5 text-stone-600 stroke-[1.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7h20L12 2z" />
                  <path d="M4 7v10h16V7H4z" />
                  <path d="M9 17v-4h6v4H9z" />
                  <path d="M2 17h20v2H2v-2z" />
                </svg>
                {card.badge}
              </div>

              <div className="absolute inset-0 z-20 p-8 sm:p-10 flex flex-col justify-end text-left">
                {card.accentHighlight ? (
                  <div className="relative mb-4">
                    <h3 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-white">
                      Rudra<span className="text-[#c3a267]">LUXE</span>
                    </h3>
                    <svg className="w-28 h-2.5 text-[#c3a267] mt-2" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M0,5 Q25,0 50,5 T100,5" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex items-baseline mb-1">
                    <span className="font-serif text-4xl sm:text-5xl font-light text-white tracking-wide">{card.heading}</span>
                    <span className="font-sans text-[10px] text-white/80 ml-2 uppercase tracking-widest">by</span>
                  </div>
                )}

                {!card.accentHighlight && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-[1.5px] bg-[#c3a267]" />
                    <span className="text-[#c3a267] text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase">
                      {card.headingAccent}
                    </span>
                  </div>
                )}

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
                  {card.description}
                </p>

                <div className="border border-[#c3a267] hover:bg-[#c3a267]/15 text-white hover:text-white transition-all duration-300 rounded-full px-6 py-3.5 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 self-start cursor-pointer">
                  Explore Collection
                  <svg className="w-3.5 h-3.5 text-white stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
