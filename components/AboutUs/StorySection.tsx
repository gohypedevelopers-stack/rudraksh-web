export default function StorySection() {
  return (
    <section className="py-24 bg-[#FCFBF7] border-b border-zinc-200/80 relative overflow-hidden">
      <div className="absolute top-[-8%] right-[-6%] text-stone-200/20 pointer-events-none select-none z-0">
        <svg className="w-72 h-72 opacity-[0.15]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="34" />
          <circle cx="50" cy="50" r="23" />
        </svg>
      </div>

      <div className="w-full px-5 md:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-stone-200/60 bg-white">
              <img src="/nepal_temple.png" alt="Nepali Rudraksha sourcing" className="w-full h-[420px] sm:h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute left-5 bottom-5 right-5 rounded-2xl bg-white/95 backdrop-blur-sm p-4 border border-white/40">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#8c4f1c] mb-2">
                  Careful sourcing
                </p>
                <p className="text-sm text-stone-700 leading-relaxed">
                  We source from trusted origins and handle every bead with the same attention we would give our own spiritual practice.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c3a267]/20 bg-[#F6EDE2] px-4 py-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#8c4f1c] mb-5">
              Our Story
            </div>

            <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-stone-900 mb-5">
              Built for devotees who want certainty, not guesswork.
            </h2>

            <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed max-w-3xl mb-5">
              RudraLaksh was created to simplify a difficult experience: finding genuine Rudraksha, verified kavach, and ritual accessories without sacrificing trust. Our team focuses on authenticity, clear guidance, and careful packing so every order arrives with confidence.
            </p>

            <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
              From Nepali collector beads to daily-wear bracelets, every piece is selected to support meditation, worship, and everyday spiritual routines. The result is a store that feels calm, dependable, and rooted in devotion.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {[
                {
                  title: "Verified Origins",
                  text: "We prioritize beads that are traceable, tested, and sourced responsibly.",
                },
                {
                  title: "Devotion First",
                  text: "Every collection is arranged to serve prayer, meditation, and daily wear.",
                },
                {
                  title: "Clear Guidance",
                  text: "We keep product selection simple so devotees can choose with confidence.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-2xs">
                  <h3 className="font-serif text-lg text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
