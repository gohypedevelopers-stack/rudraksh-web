export default function ShopHeroSection() {
  return (
    <section
      className="relative w-full py-16 md:py-24 bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url('/shop_banner.png')` }}
    >
      <div className="absolute inset-0 bg-stone-900/5 pointer-events-none z-0" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[#c3a267]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9l-2.1 2.1M7 17l-2.1 2.1" />
            <circle cx="12" cy="12" r="8.5" strokeDasharray="3 3" />
          </svg>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-stone-900 mb-3 uppercase">
          Premium Rudraksha Collection
        </h1>

        <p className="text-stone-750 text-sm sm:text-base tracking-wide font-sans max-w-xl mx-auto">
          Authentic Beads for Protection, Peace, Prosperity, and Spiritual Growth
        </p>
      </div>
    </section>
  );
}
