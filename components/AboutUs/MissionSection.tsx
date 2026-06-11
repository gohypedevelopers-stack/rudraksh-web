export default function MissionSection() {
  return (
    <section className="py-24 bg-[#FCFBF7] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_80%_20%,rgba(195,162,103,0.12),transparent_26%),radial-gradient(circle_at_20%_80%,rgba(0,0,0,0.04),transparent_30%),linear-gradient(180deg,rgba(252,251,247,0.92)_0%,rgba(247,242,234,0.98)_100%)]" />

      <div className="w-full px-5 md:px-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c3a267]/20 bg-white px-4 py-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#8c4f1c] mb-5">
            Our Mission
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-stone-900 mb-4">
            Make authentic spiritual goods easy to trust.
          </h2>
          <p className="text-stone-500 text-sm sm:text-base tracking-wide font-sans">
            We focus on dependable quality, transparent curation, and respectful service so devotees can spend less time verifying and more time practicing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            {
              title: "Authenticity",
              text: "We prioritize natural, lab-verified pieces and keep our curation centered on trust.",
            },
            {
              title: "Guidance",
              text: "We present collections in a way that helps people choose the right bead or kavach for their practice.",
            },
            {
              title: "Care",
              text: "From order packing to customer support, every step is handled with the same calm attention.",
            },
          ].map((item, index) => (
            <div key={item.title} className="rounded-3xl border border-stone-200/70 bg-white p-8 shadow-xs">
              <div className="w-12 h-12 rounded-full border border-[#c3a267]/30 bg-[#FCFBF7] flex items-center justify-center text-[#8c4f1c] mb-6">
                {index === 0 && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2l3 6 6 .9-4.3 4.1 1 6L12 16.9 6.3 19l1-6L3 8.9 9 8z" />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M8 12h8M12 8v8" />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
                  </svg>
                )}
              </div>

              <h3 className="font-serif text-2xl text-stone-900 mb-3">{item.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-[#3f2a1b] text-stone-100 px-6 py-8 md:px-10 md:py-10 w-full border border-stone-800 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {[
              { value: "10,000+", label: "Devotees served" },
              { value: "100%", label: "Authentic collection focus" },
              { value: "Pan-India", label: "Delivery and support" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center md:items-start">
                <span className="font-serif text-3xl md:text-4xl text-[#c3a267]">{item.value}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-stone-300 mt-2">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
