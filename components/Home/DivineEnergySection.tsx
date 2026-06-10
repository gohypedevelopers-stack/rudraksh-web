const rowOneItems = [
  {
    name: "Around Neck",
    desc: "Brings calm & positive energy",
    img: "/around_neck.png",
    icon: (
      <svg className="w-5 h-5 text-[#8c4f1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 3c0 6 3 9 6 9s6-3 6-9" />
        <circle cx="12" cy="14" r="2.5" />
      </svg>
    ),
  },
  {
    name: "On Wrist",
    desc: "Offers protection & balance",
    img: "/swasthya_kavach.png",
    icon: (
      <svg className="w-5 h-5 text-[#8c4f1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="6" strokeDasharray="3 3" />
        <circle cx="12" cy="6" r="1.5" fill="currentColor" />
        <circle cx="16.24" cy="7.76" r="1.5" fill="currentColor" />
        <circle cx="18" cy="12" r="1.5" fill="currentColor" />
        <circle cx="16.24" cy="16.24" r="1.5" fill="currentColor" />
        <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        <circle cx="7.76" cy="16.24" r="1.5" fill="currentColor" />
        <circle cx="6" cy="12" r="1.5" fill="currentColor" />
        <circle cx="7.76" cy="7.76" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

const rowTwoItems = [
  {
    name: "In Car",
    desc: "Shields from negativity",
    img: "/kaal_sarpa_kavach.png",
    icon: (
      <svg className="w-5 h-5 text-[#8c4f1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3C13 6.8 11.8 6 10.5 6H5c-1.1 0-2 .9-2 2v8c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M13 17h2" />
      </svg>
    ),
  },
  {
    name: "As Pocket Bead",
    desc: "Keeps you centered",
    img: "/one_mukhi.png",
    icon: (
      <svg className="w-5 h-5 text-[#8c4f1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8" />
      </svg>
    ),
  },
  {
    name: "On Ankle",
    desc: "Grounds & maintains stability",
    img: "/devi_shakti_kavach.png",
    icon: (
      <svg className="w-5 h-5 text-[#8c4f1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12c3 0 5 2 7 4s4 3 8 3h3v-4c0-3-2-5-4-5h-3c-1.5 0-3 1.5-4 3c-1-2.5-3-4-5-4H3v3z" />
        <path d="M10 16c1-2 3.5-3 5.5-3" strokeDasharray="2 2" />
      </svg>
    ),
  },
];

function EnergyItem({
  item,
  widthClass,
  circleClass,
  descriptionWidthClass,
}: {
  item: (typeof rowOneItems)[number] | (typeof rowTwoItems)[number];
  widthClass: string;
  circleClass: string;
  descriptionWidthClass: string;
}) {
  return (
    <div className={widthClass}>
      <div className={`relative ${circleClass} rounded-full border border-stone-200/50 overflow-hidden bg-white shadow-xs group`}>
        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[20%] z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FAF8F5] border border-stone-200/60 flex items-center justify-center shadow-xs">
          {item.icon}
        </div>
      </div>

      <h3 className="font-sans text-sm sm:text-base font-bold text-stone-900 mt-6 mb-1">{item.name}</h3>
      <p className={`text-[10px] sm:text-xs text-stone-500 leading-normal ${descriptionWidthClass} mx-auto`}>
        {item.desc}
      </p>
    </div>
  );
}

export default function DivineEnergySection() {
  return (
    <section className="py-24 bg-[#FCFBF7] border-b border-zinc-200/80 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-6xl mx-auto items-center">
          <div className="lg:col-span-5 text-left flex flex-col items-start">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-wide text-stone-900 mb-6">
              Divine Energy, <br />
              <span className="text-[#8c4f1c]">Everyday Life</span>
            </h2>

            <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-[540px] mb-10 font-sans">
              Rudraksha brings positivity, protection and inner peace. <br /> Wear it your way and feel its divine energy in every moment.
            </p>

            <div className="flex flex-row gap-4 w-full sm:w-auto">
              <button className="bg-[#1c1917] hover:bg-black text-white font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase h-12 px-6 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs whitespace-nowrap">
                Explore Collection
              </button>

              <button className="border border-[#1c1917] hover:bg-[#1c1917]/5 text-[#1c1917] font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase h-12 px-6 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer bg-transparent whitespace-nowrap">
                Know More
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col items-center gap-10 md:gap-14 w-full">
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 w-full">
              {rowOneItems.map((item) => (
                <EnergyItem
                  key={item.name}
                  item={item}
                  widthClass="flex flex-col items-center text-center w-[140px] sm:w-[160px] md:w-[180px]"
                  circleClass="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40"
                  descriptionWidthClass="max-w-[130px] sm:max-w-[150px]"
                />
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-12 w-full">
              {rowTwoItems.map((item) => (
                <EnergyItem
                  key={item.name}
                  item={item}
                  widthClass="flex flex-col items-center text-center w-[130px] sm:w-[150px] md:w-[170px]"
                  circleClass="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
                  descriptionWidthClass="max-w-[120px] sm:max-w-[140px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
