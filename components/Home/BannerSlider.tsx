"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { id: 1, img: "/banner_1.png", alt: "Siddh Rudraksha Mala & Bracelet Collection" },
  { id: 2, img: "/banner_2.png", alt: "Authentic Rudraksha Bracelet" },
  { id: 3, img: "/banner_3.jpg", alt: "Rudraksha - The Divine Tears of Shiva" },
];

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full bg-[#FCFBF7] py-8 border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl border border-stone-200/60 shadow-lg aspect-[16/10] md:aspect-[21/9] lg:aspect-[12/5] group">
          <div
            className="flex w-full h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full h-full shrink-0 relative">
                <img src={slide.img} alt={slide.alt} className="w-full h-full object-cover object-center" />
              </div>
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm border border-stone-200/50 text-stone-850 hover:text-black flex items-center justify-center cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md transform -translate-x-2 group-hover:translate-x-0"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm border border-stone-200/50 text-stone-850 hover:text-black flex items-center justify-center cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md transform translate-x-2 group-hover:translate-x-0"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === index ? "bg-[#c3a267] w-6" : "bg-white/60 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
