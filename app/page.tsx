"use client";

import * as React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Sparkles, 
  ChevronLeft,
  ChevronRight, 
  Flame, 
  Award,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

function BenefitIcon({ type }: { type: string }) {
  switch (type) {
    case "lotus":
      return (
        <svg className="w-4 h-4 text-[#c3a267] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 21c-1.5-2-3-3.5-3-5.5 0-2 2-3.5 3-5.5 1 2 3 3.5 3 5.5 0 2-1.5 3.5-3 5.5z" />
          <path d="M12 16.5c-2.5 0-4.5-1.5-4.5-3.5 0-2 2-3.5 3.5-4.5.5.8 1 1.5 1 2.5 0-1 .5-1.7 1-2.5 1.5 1 3.5 2.5 3.5 4.5 0 2-2 3.5-4.5 3.5z" />
        </svg>
      );
    case "mandala":
      return (
        <svg className="w-4 h-4 text-[#c3a267] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9l-2.1 2.1M7 17l-2.1 2.1" />
          <circle cx="12" cy="12" r="8.5" strokeDasharray="3 3" />
        </svg>
      );
    case "yantra":
      return (
        <svg className="w-4 h-4 text-[#c3a267] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12,2 21,7.5 21,18.5 12,22 3,18.5 3,7.5" />
          <polygon points="12,5 18,8.5 18,15.5 12,19 6,15.5 6,8.5" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "sun":
      return (
        <svg className="w-4 h-4 text-[#c3a267] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M18.5 5.5l-1.5 1.5M7 17l-1.5 1.5" />
        </svg>
      );
    case "shield":
      return (
        <svg className="w-4 h-4 text-[#c3a267] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4 text-[#c3a267] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v18M3 12h18" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      );
  }
}

const mukhis = [
  { name: "1 Mukhi", deity: "Surya", img: "/one_mukhi.png" },
  { name: "2 Mukhi", deity: "Ardhanareshwar", img: "/nirakar.png" },
  { name: "3 Mukhi", deity: "Agni", img: "/collector_bead.png" },
  { name: "4 Mukhi", deity: "Brahma", img: "/garbh_gauri.png" },
  { name: "5 Mukhi", deity: "Kalagni", img: "/nirakar.png" },
  { name: "6 Mukhi", deity: "Kartikeya", img: "/fourteen_mukhi.png" },
  { name: "7 Mukhi", deity: "Mahalakshmi", img: "/one_mukhi.png" },
  { name: "8 Mukhi", deity: "Ganesha", img: "/ganesh_rudraksha.png" },
  { name: "9 Mukhi", deity: "Durga", img: "/collector_bead.png" },
  { name: "10 Mukhi", deity: "Vishnu", img: "/garbh_gauri.png" },
  { name: "11 Mukhi", deity: "Ekadash Rudra", img: "/nirakar.png" },
  { name: "12 Mukhi", deity: "Surya", img: "/one_mukhi.png" },
  { name: "13 Mukhi", deity: "Kamdev", img: "/collector_bead.png" },
  { name: "14 Mukhi", deity: "Hanuman", img: "/fourteen_mukhi.png" },
  { name: "15 Mukhi", deity: "Pashupatinath", img: "/garbh_gauri.png" },
  { name: "16 Mukhi", deity: "Mahakal", img: "/nirakar.png" },
  { name: "17 Mukhi", deity: "Vishvakarma", img: "/one_mukhi.png" },
  { name: "18 Mukhi", deity: "Prithvi", img: "/collector_bead.png" },
  { name: "19 Mukhi", deity: "Narayana", img: "/garbh_gauri.png" },
  { name: "20 Mukhi", deity: "Brahma", img: "/nirakar.png" },
  { name: "21 Mukhi", deity: "Kubera", img: "/collector_bead.png" },
  { name: "Gauri Shankar", deity: "Shiva-Parvati", img: "/gauri_shankar.png" },
  { name: "Trijuti", deity: "Trimurti", img: "/trijuti.png" },
  { name: "Ganesh", deity: "Vighnaharta", img: "/ganesh_rudraksha.png" },
  { name: "Savar", deity: "Shani Dev", img: "/savar.png" }
];

function BannerSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = [
    { id: 1, img: "/banner_1.png", alt: "Siddh Rudraksha Mala & Bracelet Collection" },
    { id: 2, img: "/banner_2.png", alt: "Authentic Rudraksha Bracelet" },
    { id: 3, img: "/banner_3.jpg", alt: "Rudraksha - The Divine Tears of Shiva" }
  ];

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
          {/* Slides Track */}
          <div 
            className="flex w-full h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full h-full shrink-0 relative">
                <img 
                  src={slide.img} 
                  alt={slide.alt} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
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

          {/* Bullet Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === index 
                    ? "bg-[#c3a267] w-6" 
                    : "bg-white/60 hover:bg-white"
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

export default function Home() {
  const [animate, setAnimate] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  // Dynamic add to cart handler for Kavach products
  const handleAddKavachToCart = (kavach: { name: string; img: string; benefit: string; price: string; oldPrice: string }) => {
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
        img: kavach.img
      }
    });
    window.dispatchEvent(cartEvent);
  };

  React.useEffect(() => {
    // Slight delay to trigger transition smoothly on mount
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col w-full bg-[#FCFBF7] text-zinc-900 overflow-hidden">
      
      {/* Same-to-Same Dark Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start bg-[#030303] bg-[url('/hero-bg.jpg')] bg-no-repeat bg-cover bg-center md:bg-right py-24 md:py-32">
        
        {/* Dark gradient overlay to guarantee text readability and smooth image blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 md:via-black/70 to-black/35 md:to-transparent z-0 pointer-events-none" />

        {/* Large spiritual Om watermark behind the heading text (Dark mode styling) */}
        <div className="absolute top-[46%] left-[30%] md:left-[35%] -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[340px] font-serif text-zinc-900/35 pointer-events-none select-none z-0">
          ॐ
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="max-w-2xl text-left relative z-10">
            
            {/* Top gold bar + Tagline */}
            <div 
              className={cn(
                "flex items-center mb-6 transition-all duration-1000 ease-out transform",
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              <div className="w-12 h-[1px] bg-[#c3a267]/60 mr-4" />
              <span className="text-[#c3a267] text-[11px] font-bold tracking-[0.25em] uppercase">
                100% AUTHENTIC • LAB VERIFIED
              </span>
            </div>

            {/* Heading: Elevate Your Energy. Embrace the Divine. */}
            <h1 
              className={cn(
                "font-serif text-[42px] sm:text-[58px] md:text-[68px] lg:text-[68px] xl:text-[76px] font-normal leading-[1.12] tracking-wide text-white mb-6 transition-all duration-1000 delay-[150ms] ease-out transform",
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              Elevate Your Energy. <br />
              Embrace the <span className="italic text-[#c3a267] font-serif font-light">Divine.</span>
            </h1>

            {/* Subtext description (exactly 10 words, split across 2 lines) */}
            <p 
              className={cn(
                "text-zinc-400 font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-[480px] mb-12 tracking-wide transition-all duration-1000 delay-[300ms] ease-out transform",
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              Certified authentic Rudraksha beads, <br />
              handpicked for divine energy and benefits.
            </p>

            {/* CTA Buttons - Dark Theme / White CTAs */}
            <div 
              className={cn(
                "flex flex-col sm:flex-row gap-5 items-stretch sm:items-center w-full transition-all duration-1000 delay-[450ms] ease-out transform",
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              {/* Explore Collection (Solid White Button) */}
              <Link href="/rudraksha" className="block">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black font-bold text-[11px] tracking-[0.2em] uppercase h-14 px-8 rounded-[2px] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-black/40"
                >
                  Explore Collection
                  <svg className="w-4 h-4 text-black stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Button>
              </Link>
              
              {/* How Rudraksha Works (Outline Play Button) */}
              <Link href="/guide" className="block">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto bg-transparent! hover:bg-white/10! border border-white! hover:border-white! text-white! hover:text-white! font-bold text-[11px] tracking-[0.2em] uppercase h-14 px-8 rounded-[2px] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  {/* Outline Play icon */}
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16" fill="currentColor" className="text-white scale-75 origin-center" />
                  </svg>
                  How Rudraksha Works
                </Button>
              </Link>
            </div>

          </div>
        </div>

      </section>

      {/* Categories Grid Section */}
      <section className="py-16 bg-[#FCFBF7] border-b border-zinc-200/80">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-stone-900 mb-3">
              Explore Our Rudraksha Collection
            </h2>
            <p className="text-stone-600 font-serif text-sm sm:text-base tracking-wide italic">
              Timeless beads trusted for centuries
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              { name: "Beads", img: "/category_beads.jpg", href: "/rudraksha?category=beads", icon: "beads" },
              { name: "Siddh Mala", img: "/category_siddh_mala.jpg", href: "/rudraksha?category=siddh-mala", icon: "siddh" },
              { name: "Jap Mala", img: "/category_jap_mala.jpg", href: "/rudraksha?category=jap-mala", icon: "jap" },
              { name: "Bracelet", img: "/category_bracelet.jpg", href: "/rudraksha?category=bracelet", icon: "bracelet" }
            ].map((cat) => (
              <Link href={cat.href} key={cat.name} className="block group">
                <div className="bg-white border border-stone-200/50 rounded-[28px] overflow-hidden shadow-xs hover:shadow-md hover:border-[#c3a267]/20 transition-all duration-300 flex flex-col items-center">
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-stone-100">
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Overlapping Badge */}
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

                  {/* Title Area */}
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

      {/* Same-to-Same Premium Rudraksha Collection Carousel Section */}
      <section className="min-h-screen flex flex-col justify-center py-16 bg-[#FCFBF7] border-b border-zinc-200/80 relative overflow-hidden">
        {/* Background Image with 10% Opacity */}
        <div 
          className="absolute inset-0 bg-[url('/collection_bg.png')] bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none z-0" 
        />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16 relative z-10">
            <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-stone-900 mb-2">
              Premium Rudraksha Collection
            </h2>
            
            {/* Elegant Lotus Separator */}
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="w-16 h-[1.5px] bg-[#c3a267]/40" />
              <svg className="w-5 h-5 text-[#c3a267]/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21c-2-2.5-5-4-5-7 0-4.5 5-8 5-8s5 3.5 5 8c0 3 3 4.5 5 7" />
                <path d="M12 21c-1-2-3-3.5-3-6 0-3.5 3-6.5 3-6.5s3 3 3 6.5c0 2.5-2 4-3 6" />
                <path d="M7 14c-1.5-1.5-2.5-3-2.5-5 0-3 2.5-4 2.5-4s1.5 2.5 1 5c-.3 1.5-.7 3-1 4z" />
                <path d="M17 14c1.5-1.5 2.5-3 2.5-5 0-3-2.5-4-2.5-4s-1.5 2.5-1 5c.3 1.5.7 3-1 4z" />
              </svg>
              <div className="w-16 h-[1.5px] bg-[#c3a267]/40" />
            </div>

            <p className="text-stone-500 text-sm tracking-wide font-sans">
              Discover Authentic Beads and Their Powerful Blessings
            </p>
          </div>

          {/* Carousel Slider Wrapper */}
          <div className="relative w-full max-w-6xl mx-auto px-4 md:px-12 relative z-10">
            
            {/* Left Scroll Arrow */}
            <button 
              onClick={() => {
                if (scrollRef.current) {
                  const { scrollLeft, clientWidth } = scrollRef.current;
                  scrollRef.current.scrollTo({ left: scrollLeft - clientWidth / 2, behavior: "smooth" });
                }
              }} 
              className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center rounded-full cursor-pointer transition-all shadow-md hidden md:flex"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Horizontal Scroll Box */}
            <div 
              ref={scrollRef}
              onScroll={() => {
                if (scrollRef.current) {
                  const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                  const totalScrollable = scrollWidth - clientWidth;
                  if (totalScrollable > 0) {
                    setScrollProgress((scrollLeft / totalScrollable) * 100);
                  }
                }
              }}
              className="flex overflow-x-auto gap-6 sm:gap-8 pb-8 pt-4 px-3 scrollbar-none snap-x snap-mandatory justify-start"
            >
              {[
                { name: "1-13 Mukhi", img: "/one_mukhi.png", benefit: "Spiritual Growth", icon: "yantra" },
                { name: "14-21 Mukhi", img: "/fourteen_mukhi.png", benefit: "Courage & Strength", icon: "shield" },
                { name: "Gauri Shankar", img: "/gauri_shankar.png", benefit: "Balance & Harmony", icon: "lotus" },
                { name: "Ganesh Rudraksha", img: "/ganesh_rudraksha.png", benefit: "Success & Wisdom", icon: "mandala" },
                { name: "Trijuti", img: "/trijuti.png", benefit: "Protection & Power", icon: "yantra" },
                { name: "Garbh Gauri", img: "/garbh_gauri.png", benefit: "Nurturing & Peace", icon: "lotus" },
                { name: "Nirakar", img: "/nirakar.png", benefit: "Focus & Clarity", icon: "sun" },
                { name: "Sawar", img: "/savar.png", benefit: "Prosperity & Wealth", icon: "mandala" }
              ].map((item) => {
                const slug = item.name.toLowerCase().replace(/ /g, "-");
                return (
                  <Link 
                    href={`/rudraksha/${slug}`}
                    key={item.name}
                    className="flex flex-col items-center select-none snap-center min-w-[170px] sm:min-w-[195px] md:min-w-[220px] shrink-0 bg-[#FAF8F5]/90 backdrop-blur-xs border border-stone-200/50 rounded-2xl px-[5px] py-[10px] shadow-sm hover:shadow-md hover:border-[#c3a267]/30 transition-all duration-300 group cursor-pointer"
                  >
                    {/* Double circular border */}
                    <div className="relative group/circle flex items-center justify-center mb-4">
                      {/* Outer Gold Ring */}
                      <div className="absolute inset-0 rounded-full border border-[#c3a267]/50 group-hover/circle:scale-[1.04] transition-transform duration-300 pointer-events-none" />
                      {/* Inner Space + Circular Image Card */}
                      <div className="m-1 rounded-full overflow-hidden aspect-square w-28 h-28 sm:w-32 sm:h-32 border border-zinc-200/40 relative z-10">
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/circle:scale-105" 
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-sm sm:text-base text-stone-900 font-normal mt-1 group-hover:text-[#c3a267] transition-colors duration-200 text-center">
                      {item.name}
                    </h3>

                    {/* Benefit Badge */}
                    <div className="flex items-center gap-1 mt-2 mb-1">
                      <BenefitIcon type={item.icon} />
                      <span className="text-[10px] sm:text-xs text-stone-500 tracking-wide font-sans text-center">
                        {item.benefit}
                      </span>
                    </div>

                    {/* Dotted Divider */}
                    <div className="w-full border-t border-dashed border-stone-300/60 my-3" />

                    {/* View Details Link */}
                    <div className="text-stone-900 group-hover:text-[#c3a267] transition-colors duration-200 mt-1 text-[11px] sm:text-xs font-serif tracking-wider font-semibold text-center">
                      View Details
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Right Scroll Arrow */}
            <button 
              onClick={() => {
                if (scrollRef.current) {
                  const { scrollLeft, clientWidth } = scrollRef.current;
                  scrollRef.current.scrollTo({ left: scrollLeft + clientWidth / 2, behavior: "smooth" });
                }
              }} 
              className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center rounded-full cursor-pointer transition-all shadow-md hidden md:flex"
            >
              <ChevronRight className="w-5 h-5 stroke-[1.8]" />
            </button>
            
          </div>

          {/* Pagination Dots (Same-to-Same) */}
          <div className="flex items-center justify-center gap-2.5 mt-10 relative z-10">
            {[0, 1, 2, 3].map((index) => {
              const isActive = Math.min(Math.floor(scrollProgress / 25.1), 3) === index;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (scrollRef.current) {
                      const { scrollWidth, clientWidth } = scrollRef.current;
                      const totalScrollable = scrollWidth - clientWidth;
                      scrollRef.current.scrollTo({
                        left: (index * 25 * totalScrollable) / 100,
                        behavior: "smooth"
                      });
                    }
                  }}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                    isActive 
                      ? "bg-[#c3a267] scale-110" 
                      : "bg-stone-300 hover:bg-stone-400"
                  )}
                  aria-label={`Go to slide page ${index + 1}`}
                />
              );
            })}
          </div>

        </div>
      </section>



      {/* Same-to-Same Choose Your Rudraksha Journey Section */}
      <section className="py-24 bg-[#FCFBF7] border-b border-zinc-200/80 relative overflow-hidden">
        
        {/* Om Watermark (Left) */}
        <div className="absolute top-[35%] left-[-2%] md:left-[2%] text-[200px] md:text-[320px] font-serif text-stone-200/15 pointer-events-none select-none z-0">
          ॐ
        </div>

        {/* Leaf Sprig Watermark (Right) */}
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
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-stone-900 mb-4">
              Choose Your Rudraksha Journey
            </h2>
            <p className="text-stone-500 text-sm tracking-wide font-sans max-w-2xl mx-auto">
              Explore our thoughtfully curated collections inspired by ancient traditions.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
            
            {/* Card 1: Indonesian Rudraksha */}
            <div className="h-[460px] sm:h-[530px] relative rounded-3xl overflow-hidden shadow-lg group">
              {/* Background Image */}
              <img 
                src="/indonesia_temple.png" 
                alt="Indonesian Rudraksha Journey" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0" 
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10 pointer-events-none" />

              {/* Badge (Top Left) */}
              <div className="absolute top-6 left-6 z-20 bg-white/95 text-stone-800 px-4 py-2.5 rounded-full flex items-center gap-2 border border-stone-200/40 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-xs">
                <svg className="w-3.5 h-3.5 text-stone-600 stroke-[1.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7h20L12 2z" />
                  <path d="M4 7v10h16V7H4z" />
                  <path d="M9 17v-4h6v4H9z" />
                  <path d="M2 17h20v2H2v-2z" />
                </svg>
                Indonesian Rudraksha
              </div>

              {/* Text Content Overlay */}
              <div className="absolute inset-0 z-20 p-8 sm:p-10 flex flex-col justify-end text-left">
                <div className="flex items-baseline mb-1">
                  <span className="font-serif text-4xl sm:text-5xl font-light text-white tracking-wide">aarambh</span>
                  <span className="font-sans text-[10px] text-white/80 ml-2 uppercase tracking-widest">by</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-[1.5px] bg-[#c3a267]" />
                  <span className="text-[#c3a267] text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase">
                    by RUDRAPURE™
                  </span>
                </div>
                
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
                  Begin your spiritual journey with our Entry-Level Range of Rudraksha
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

            {/* Card 2: Nepali Rudraksha */}
            <div className="h-[460px] sm:h-[530px] relative rounded-3xl overflow-hidden shadow-lg group">
              {/* Background Image */}
              <img 
                src="/nepal_temple.png" 
                alt="Nepali Rudraksha Journey" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0" 
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10 pointer-events-none" />

              {/* Badge (Top Left) */}
              <div className="absolute top-6 left-6 z-20 bg-white/95 text-stone-800 px-4 py-2.5 rounded-full flex items-center gap-2 border border-stone-200/40 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-xs">
                <svg className="w-3.5 h-3.5 text-stone-600 stroke-[1.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7h20L12 2z" />
                  <path d="M4 7v10h16V7H4z" />
                  <path d="M9 17v-4h6v4H9z" />
                  <path d="M2 17h20v2H2v-2z" />
                </svg>
                Nepali Rudraksha
              </div>

              {/* Text Content Overlay */}
              <div className="absolute inset-0 z-20 p-8 sm:p-10 flex flex-col justify-end text-left">
                <div className="relative mb-4">
                  <h3 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-white">
                    Rudra<span className="text-[#c3a267]">LUXE</span>
                  </h3>
                  {/* Wavy gold line under heading */}
                  <svg className="w-28 h-2.5 text-[#c3a267] mt-2" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M0,5 Q25,0 50,5 T100,5" />
                  </svg>
                </div>
                
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
                  Experience the power of Purity with Our Premium Nepali Rudraksha Collection
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

          </div>

        </div>
      </section>

      {/* Same-to-Same Every Mukhi Holds Divine Energy Section */}
      <section className="py-24 bg-[#FCFBF7] border-b border-zinc-200/80 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            


            <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-stone-900 mb-4">
              Every Mukhi Holds <span className="text-[#c3a267]">Divine Energy</span>
            </h2>
            <p className="text-stone-500 text-sm tracking-wide font-sans max-w-2xl mx-auto">
              Explore our authentic Rudraksha collection with different mukhi types, each carrying unique spiritual benefits.
            </p>
          </div>

          {/* Mukhi Grid Layout */}
          <div className="max-w-6xl mx-auto px-2 md:px-4">
            
            {/* Row 1: 1 Mukhi to 10 Mukhi */}
            <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-3 mb-3">
              {mukhis.slice(0, 10).map((item) => {
                const slug = item.name.toLowerCase().replace(/ /g, "-");
                return (
                  <Link 
                    href={`/rudraksha/${slug}`}
                    key={item.name}
                    className="relative flex flex-col justify-between items-center rounded-2xl bg-white border border-stone-200/50 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer w-full h-[165px] sm:h-[180px] pt-3 group"
                  >
                    {/* Faint Lotus Watermark behind the image */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] z-0">
                      <svg className="w-16 h-16 text-stone-850" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M12 21c-2-2.5-5-4-5-7 0-4.5 5-8 5-8s5 3.5 5 8c0 3 3 4.5 5 7" />
                        <path d="M12 21c-1-2-3-3.5-3-6 0-3.5 3-6.5 3-6.5s3 3 3 6.5c0 2.5-2 4-3 6" />
                      </svg>
                    </div>

                    {/* Top Gold Star Icon */}
                    <div className="z-10">
                      <svg className="w-3.5 h-3.5 text-[#c3a267]/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3h-4v-4l-3-3 3-3V5h4z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>

                    {/* Center Image */}
                    <div className="w-[70%] max-w-[64px] sm:max-w-[76px] aspect-square rounded-full overflow-hidden border border-stone-200/50 bg-white z-10 my-1.5 flex items-center justify-center">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    {/* Title */}
                    <span className="font-sans text-[10px] sm:text-xs font-bold text-stone-900 mb-2 text-center z-10">
                      {item.name}
                    </span>

                    {/* Deity Footer */}
                    <div className="w-full bg-[#F5F2EA] py-1.5 px-1 text-center border-t border-stone-200/30 z-10">
                      <span className="text-[9px] sm:text-[10px] font-sans text-stone-600 font-medium tracking-wide truncate block">
                        {item.deity}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Row 2: 11 Mukhi to 20 Mukhi */}
            <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-3 mb-3">
              {mukhis.slice(10, 20).map((item) => {
                const slug = item.name.toLowerCase().replace(/ /g, "-");
                return (
                  <Link 
                    href={`/rudraksha/${slug}`}
                    key={item.name}
                    className="relative flex flex-col justify-between items-center rounded-2xl bg-white border border-stone-200/50 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer w-full h-[165px] sm:h-[180px] pt-3 group"
                  >
                    {/* Faint Lotus Watermark behind the image */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] z-0">
                      <svg className="w-16 h-16 text-stone-850" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M12 21c-2-2.5-5-4-5-7 0-4.5 5-8 5-8s5 3.5 5 8c0 3 3 4.5 5 7" />
                        <path d="M12 21c-1-2-3-3.5-3-6 0-3.5 3-6.5 3-6.5s3 3 3 6.5c0 2.5-2 4-3 6" />
                      </svg>
                    </div>

                    {/* Top Gold Star Icon */}
                    <div className="z-10">
                      <svg className="w-3.5 h-3.5 text-[#c3a267]/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3h-4v-4l-3-3 3-3V5h4z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>

                    {/* Center Image */}
                    <div className="w-[70%] max-w-[64px] sm:max-w-[76px] aspect-square rounded-full overflow-hidden border border-stone-200/50 bg-white z-10 my-1.5 flex items-center justify-center">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    {/* Title */}
                    <span className="font-sans text-[10px] sm:text-xs font-bold text-stone-900 mb-2 text-center z-10">
                      {item.name}
                    </span>

                    {/* Deity Footer */}
                    <div className="w-full bg-[#F5F2EA] py-1.5 px-1 text-center border-t border-stone-200/30 z-10">
                      <span className="text-[9px] sm:text-[10px] font-sans text-stone-600 font-medium tracking-wide truncate block">
                        {item.deity}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Row 3: 21 Mukhi to Savar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 max-w-5xl mx-auto xl:max-w-[50%]">
              {mukhis.slice(20).map((item) => {
                const slug = item.name.toLowerCase().replace(/ /g, "-");
                return (
                  <Link 
                    href={`/rudraksha/${slug}`}
                    key={item.name}
                    className="relative flex flex-col justify-between items-center rounded-2xl bg-white border border-stone-200/50 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer w-full h-[165px] sm:h-[180px] pt-3 group"
                  >
                    {/* Faint Lotus Watermark behind the image */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] z-0">
                      <svg className="w-16 h-16 text-stone-850" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M12 21c-2-2.5-5-4-5-7 0-4.5 5-8 5-8s5 3.5 5 8c0 3 3 4.5 5 7" />
                        <path d="M12 21c-1-2-3-3.5-3-6 0-3.5 3-6.5 3-6.5s3 3 3 6.5c0 2.5-2 4-3 6" />
                      </svg>
                    </div>

                    {/* Top Gold Star Icon */}
                    <div className="z-10">
                      <svg className="w-3.5 h-3.5 text-[#c3a267]/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3h-4v-4l-3-3 3-3V5h4z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>

                    {/* Center Image */}
                    <div className="w-[70%] max-w-[64px] sm:max-w-[76px] aspect-square rounded-full overflow-hidden border border-stone-200/50 bg-white z-10 my-1.5 flex items-center justify-center">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    {/* Title */}
                    <span className="font-sans text-[10px] sm:text-xs font-bold text-stone-900 mb-2 text-center z-10">
                      {item.name}
                    </span>

                    {/* Deity Footer */}
                    <div className="w-full bg-[#F5F2EA] py-1.5 px-1 text-center border-t border-stone-200/30 z-10">
                      <span className="text-[9px] sm:text-[10px] font-sans text-stone-600 font-medium tracking-wide truncate block">
                        {item.deity}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>



        </div>
      </section>

      {/* Same-to-Same Divya Kavach Collection Section */}
      <section className="py-24 bg-[#FCFBF7] border-b border-zinc-200/80 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          


          {/* Title and Controls Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 max-w-6xl mx-auto px-4 gap-6">
            <div className="text-left">
              <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-stone-900 mb-3">
                Divya Kavach <span className="text-[#c3a267] italic font-light">Collection</span>
              </h2>
              <p className="text-stone-500 text-sm tracking-wide font-sans">
                Sacred Rudraksha designs crafted for protection, peace & positive energy.
              </p>
            </div>
            
            {/* Navigation Buttons (Beige Outlines) */}
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full border border-stone-300/80 hover:border-stone-500 hover:bg-stone-50 text-stone-600 hover:text-stone-900 flex items-center justify-center cursor-pointer transition-colors">
                <ChevronLeft className="w-5 h-5 stroke-[1.8]" />
              </button>
              <button className="w-10 h-10 rounded-full border border-stone-300/80 hover:border-stone-500 hover:bg-stone-50 text-stone-600 hover:text-stone-900 flex items-center justify-center cursor-pointer transition-colors">
                <ChevronRight className="w-5 h-5 stroke-[1.8]" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
            {[
              {
                name: "Vyapar Vriddhi Kavach",
                img: "/vyapar_kavach.png",
                benefit: "Prosperity • Growth • Success",
                price: "₹13,499.00",
                oldPrice: "₹18,999.00"
              },
              {
                name: "Swasthya Raksha Kavach",
                img: "/swasthya_kavach.png",
                benefit: "Health • Harmony • Well-being",
                price: "₹2,099.00",
                oldPrice: "₹2,399.00"
              },
              {
                name: "Kaal Sarpa Nivaran Kavach",
                img: "/kaal_sarpa_kavach.png",
                benefit: "Protection • Relief • Balance",
                price: "₹14,699.00",
                oldPrice: "₹17,699.00"
              },
              {
                name: "Devi Shakti Kavach",
                img: "/devi_shakti_kavach.png",
                benefit: "Strength • Courage • Positive Energy",
                price: "₹6,599.00",
                oldPrice: "₹6,999.00"
              }
            ].map((kavach) => {
              const slug = kavach.name.toLowerCase().replace(/ /g, "-");
              return (
                <div 
                  key={kavach.name}
                  className="bg-white border border-stone-200/50 rounded-[24px] overflow-hidden shadow-xs hover:shadow-md hover:border-[#c3a267]/20 transition-all duration-300 flex flex-col group"
                >
                  {/* Image Container with Wishlist Button */}
                  <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                    <Link href={`/rudraksha/${slug}`}>
                      <img 
                        src={kavach.img} 
                        alt={kavach.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      />
                    </Link>
                    {/* Circular Wishlist Button */}
                    <button className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-stone-200/60 shadow-xs hover:bg-stone-50 cursor-pointer transition-colors group/heart">
                      <svg className="w-4 h-4 text-stone-500 group-hover/heart:text-red-500 transition-colors stroke-[1.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex-1 flex flex-col items-center justify-between text-center">
                    <div className="flex flex-col items-center w-full">
                      {/* Title */}
                      <Link href={`/rudraksha/${slug}`}>
                        <h3 className="font-serif text-base text-stone-900 font-semibold mb-1 group-hover:text-[#c3a267] transition-colors duration-200 cursor-pointer">
                          {kavach.name}
                        </h3>
                      </Link>
                      
                      {/* Small Gold Divider Line */}
                      <div className="w-8 h-[1.5px] bg-[#c3a267]/50 my-2" />
                      
                      {/* Benefits Tag */}
                      <span className="text-[10px] sm:text-xs text-stone-500 tracking-wide font-sans font-medium">
                        {kavach.benefit}
                      </span>
                      
                      {/* Price Tag */}
                      <div className="flex items-center gap-2 mt-3.5 mb-4 font-sans">
                        <span className="font-bold text-[#b91c1c] text-sm sm:text-base">
                          {kavach.price}
                        </span>
                        <span className="text-stone-400 line-through text-xs sm:text-sm">
                          {kavach.oldPrice}
                        </span>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={() => handleAddKavachToCart(kavach)}
                      className="w-full bg-[#1c1917] hover:bg-black text-white font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase h-11 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
                    >
                      {/* Gold outline Shopping Bag icon */}
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

          {/* View All Collections Button */}
          <button className="border border-zinc-900 hover:bg-zinc-900 hover:text-white text-zinc-900 transition-all duration-300 rounded-full px-8 py-3.5 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2.5 mx-auto mt-14 cursor-pointer bg-transparent">
            {/* Black eye icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            VIEW ALL COLLECTIONS
          </button>

        </div>
      </section>

      {/* Banner Slider Section */}
      <BannerSlider />

      {/* Same-to-Same Divine Energy, Everyday Life Section */}
      <section className="py-24 bg-[#FCFBF7] border-b border-zinc-200/80 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-6xl mx-auto items-center">
            
            {/* Left Column: Heading and Description */}
            <div className="lg:col-span-5 text-left flex flex-col items-start">

              
              {/* Heading */}
              <h2 className="font-serif text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-wide text-stone-900 mb-6">
                Divine Energy, <br />
                <span className="text-[#8c4f1c]">Everyday Life</span>
              </h2>


              {/* Paragraph */}
              <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-[540px] mb-10 font-sans">
                Rudraksha brings positivity, protection and inner peace. <br /> Wear it your way and feel its divine energy in every moment.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-row gap-4 w-full sm:w-auto">
                <button className="bg-[#1c1917] hover:bg-black text-white font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase h-12 px-6 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs whitespace-nowrap">
                  Explore Collection
                </button>
                
                <button className="border border-[#1c1917] hover:bg-[#1c1917]/5 text-[#1c1917] font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase h-12 px-6 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer bg-transparent whitespace-nowrap">
                  Know More
                </button>
              </div>

            </div>

            {/* Right Column: Staggered Circles */}
            <div className="lg:col-span-7 flex flex-col items-center gap-10 md:gap-14 w-full">
              
              {/* Row 1: 2 Circles */}
              <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 w-full">
                {[
                  {
                    name: "Around Neck",
                    desc: "Brings calm & positive energy",
                    img: "/around_neck.png",
                    icon: (
                      <svg className="w-5 h-5 text-[#8c4f1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 3c0 6 3 9 6 9s6-3 6-9" />
                        <circle cx="12" cy="14" r="2.5" />
                      </svg>
                    )
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
                    )
                  }
                ].map((item) => (
                  <div key={item.name} className="flex flex-col items-center text-center w-[140px] sm:w-[160px] md:w-[180px]">
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border border-stone-200/50 overflow-hidden bg-white shadow-xs group">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlapping Round Badge */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[20%] z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FAF8F5] border border-stone-200/60 flex items-center justify-center shadow-xs">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Text content under circle */}
                    <h3 className="font-sans text-sm sm:text-base font-bold text-stone-900 mt-6 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-stone-500 leading-normal max-w-[130px] sm:max-w-[150px] mx-auto">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Row 2: 3 Circles */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-12 w-full">
                {[
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
                    )
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
                    )
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
                    )
                  }
                ].map((item) => (
                  <div key={item.name} className="flex flex-col items-center text-center w-[130px] sm:w-[150px] md:w-[170px]">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border border-stone-200/50 overflow-hidden bg-white shadow-xs group">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlapping Round Badge */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[20%] z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FAF8F5] border border-stone-200/60 flex items-center justify-center shadow-xs">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Text content under circle */}
                    <h3 className="font-sans text-sm sm:text-base font-bold text-stone-900 mt-6 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-stone-500 leading-normal max-w-[120px] sm:max-w-[140px] mx-auto">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
