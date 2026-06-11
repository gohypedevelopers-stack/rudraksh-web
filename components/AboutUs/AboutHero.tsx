import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative min-h-[82vh] flex items-center justify-start overflow-hidden bg-[radial-gradient(circle_at_15%_20%,rgba(195,162,103,0.12),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(135deg,#050505_0%,#0b0b0b_48%,#090909_100%)] py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -right-28 top-12 w-[34rem] h-[34rem] rounded-full bg-[#c3a267]/10 blur-3xl" />
        <div className="absolute left-[-14rem] bottom-[-12rem] w-[30rem] h-[30rem] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-y-0 right-[12%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden xl:block" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 md:via-black/72 to-black/30 md:to-transparent z-0 pointer-events-none" />

      <div className="absolute top-[46%] left-[30%] md:left-[35%] -translate-x-1/2 -translate-y-1/2 text-[180px] md:text-[320px] font-serif text-zinc-900/35 pointer-events-none select-none z-0">
        ॐ
      </div>

      <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 z-0 hidden xl:block pointer-events-none">
        <svg className="w-[34rem] h-[34rem] text-[#c3a267]/10" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="100" cy="100" r="84" strokeDasharray="3 4" />
          <circle cx="100" cy="100" r="66" />
          <circle cx="100" cy="100" r="46" />
          <path d="M100 16v168M16 100h168" />
          <circle cx="100" cy="100" r="12" fill="currentColor" />
          <path d="M100 30c18 10 30 28 30 50s-12 40-30 50c-18-10-30-28-30-50s12-40 30-50z" />
        </svg>
      </div>

      <div className="w-full px-5 md:px-20 relative z-10">
        <div className="max-w-3xl text-left relative z-10">
          <div className="flex items-center mb-6">
            <div className="w-12 h-[1px] bg-[#c3a267]/60 mr-4" />
            <span className="text-[#c3a267] text-[11px] font-bold tracking-[0.25em] uppercase">
              Authenticity • Guidance • Devotion
            </span>
          </div>

          <h1 className="font-serif text-[42px] sm:text-[58px] md:text-[68px] lg:text-[74px] font-normal leading-[1.1] tracking-wide text-white mb-6">
            Rooted in devotion.
            <br />
            Guided by authenticity.
          </h1>

          <p className="text-zinc-400 font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-[520px] mb-12 tracking-wide">
            RudraLaksh exists to help devotees find authentic Rudraksha, sacred kavach, and ritual essentials with the same care we expect for our own spiritual practice.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center w-full">
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black font-bold text-[11px] tracking-[0.2em] uppercase h-14 px-8 rounded-[2px] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-black/40"
            >
              Explore Collection
              <svg className="w-4 h-4 text-black stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <a
              href="https://wa.me/919861743000"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 border border-white text-white hover:text-white font-bold text-[11px] tracking-[0.2em] uppercase h-14 px-8 rounded-[2px] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.5 11.8a8.5 8.5 0 0 1-12.3 7.4L3 21l1.9-5.1A8.5 8.5 0 1 1 20.5 11.8z" />
                <path d="M8.8 9.8c.2-.5.4-.6.8-.6h.5c.2 0 .5.1.6.4l.7 1.7c.1.3 0 .6-.2.8l-.6.6c.8 1.5 2 2.6 3.6 3.2l.6-.6c.2-.2.5-.3.8-.2l1.7.7c.3.1.4.4.4.6v.5c0 .4-.2.6-.6.8-.5.2-1.1.3-1.8.3-4.1 0-7.4-3.3-7.4-7.4 0-.7.1-1.3.3-1.8z" />
              </svg>
              Talk to an Expert
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-2xl">
            {[
              { value: "100%", label: "Authentic beads" },
              { value: "Temple", label: "Energized carefully" },
              { value: "10k+", label: "Devotees served" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                <div className="text-[#c3a267] font-serif text-2xl sm:text-3xl">{item.value}</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400 mt-2">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
