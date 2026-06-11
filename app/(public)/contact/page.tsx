"use client";

import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock, MessageCircle, ChevronRight, User, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full bg-[#FCFBF7] text-zinc-900 overflow-hidden pt-[110px]">
      
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 border-b border-zinc-200/80 overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-[50%] opacity-80 pointer-events-none hidden md:block">
          <img src="/contact_hero.jpg" alt="Rudraksha Background" className="w-full h-full object-cover object-left mask-image-gradient-l" style={{ maskImage: 'linear-gradient(to right, transparent, black)', WebkitMaskImage: 'linear-gradient(to right, transparent, black)' }} />
        </div>
        
        <div className="w-full px-5 md:px-20 relative z-10">
          <div className="flex items-center gap-2 text-xs font-sans font-medium text-stone-500 mb-6 uppercase tracking-wider">
            <Link href="/" className="hover:text-stone-800 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#8c4f1c]">Contact Us</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-wide text-stone-900 mb-6 max-w-xl">
            Get In Touch <span className="text-[#8c4f1c]">With Us</span>
          </h1>

          <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed max-w-md mb-10">
            Need help choosing the right Rudraksha?
            <br />
            Our experts are here to guide you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/919861743000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#1c1917] hover:bg-black text-white font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase h-12 px-6 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              Talk on WhatsApp
            </a>
            
            <a 
              href="mailto:support@satvikstore.in"
              className="border border-[#1c1917] hover:bg-[#1c1917]/5 text-[#1c1917] font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase h-12 px-6 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer bg-transparent whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full px-5 md:px-20 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 md:gap-12 w-full">
          
          {/* Left Column - Contact Info */}
          <div className="bg-[#FAF8F5] border border-stone-200/60 rounded-3xl p-6 md:p-10 flex flex-col h-full shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-stone-200/50">
              <div className="w-10 h-10 rounded-full bg-[#f2eadc] flex items-center justify-center text-[#8c4f1c]">
                <User className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl text-stone-900">Contact Information</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 flex-grow">
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f2eadc]/50 flex items-center justify-center text-[#8c4f1c] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm mb-1">Corporate Office</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      811/50 Lekhu Nagar, Tri Nagar,<br />Delhi – 110035, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f2eadc]/50 flex items-center justify-center text-[#8c4f1c] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm mb-1">Call / WhatsApp</h3>
                    <p className="text-stone-600 text-sm">
                      +91 9861743000
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f2eadc]/50 flex items-center justify-center text-[#8c4f1c] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm mb-1">Working Hours</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      10:00 AM – 6:00 PM IST<br />Monday to Saturday
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f2eadc]/50 flex items-center justify-center text-[#8c4f1c] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm mb-1">Email</h3>
                    <p className="text-stone-600 text-sm">
                      support@satvikstore.in
                    </p>
                  </div>
                </div>
              </div>

              {/* Priority Section */}
              <div className="w-full md:w-[45%] bg-[#FCFBF7] border border-stone-200/50 rounded-2xl p-6 flex flex-col gap-4">
                <h3 className="font-bold text-[11px] tracking-widest uppercase text-[#8c4f1c] mb-1">OUR #1 PRIORITY</h3>
                <p className="text-stone-500 text-xs leading-relaxed">
                  We are confident that you will love our products but in case that you don't we want to make sure that you are 100% satisfied with our customer service.
                </p>
                <p className="text-stone-500 text-xs leading-relaxed mb-2">
                  Feel free to contact us and we will resolve the issue in max 48 hours.
                </p>
                
                <div className="flex flex-col gap-3 mt-auto">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#8c4f1c] shrink-0" />
                    <span className="text-stone-600 text-xs">Response within 48 hours</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#8c4f1c] shrink-0" />
                    <span className="text-stone-600 text-xs">Dedicated customer support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#8c4f1c] shrink-0" />
                    <span className="text-stone-600 text-xs leading-tight">Authentic guidance for Rudraksha selection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#8c4f1c] shrink-0" />
                    <span className="text-stone-600 text-xs">Secure and reliable assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-[#FAF8F5] border border-stone-200/60 rounded-3xl p-6 md:p-10 shadow-sm flex flex-col h-full">
            <h2 className="font-serif text-2xl text-stone-900 mb-8 pb-6 border-b border-stone-200/50">Send Us a Message</h2>
            
            <form className="flex flex-col gap-6 flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-stone-900 tracking-wide">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter your name" className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-[#8c4f1c]/50 transition-colors" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-stone-900 tracking-wide">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="Enter your email" className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-[#8c4f1c]/50 transition-colors" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-stone-900 tracking-wide">Phone Number <span className="text-red-500">*</span></label>
                  <input type="tel" placeholder="Enter your phone number" className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-[#8c4f1c]/50 transition-colors" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-stone-900 tracking-wide">Subject <span className="text-red-500">*</span></label>
                  <select className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-[#8c4f1c]/50 transition-colors appearance-none" required defaultValue="">
                    <option value="" disabled>Select a subject</option>
                    <option value="product_query">Product Query</option>
                    <option value="order_status">Order Status</option>
                    <option value="rudraksha_recommendation">Rudraksha Recommendation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-grow">
                <label className="text-xs font-bold text-stone-900 tracking-wide">Message <span className="text-red-500">*</span></label>
                <textarea placeholder="Type your message here..." className="w-full p-4 min-h-[120px] rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-[#8c4f1c]/50 transition-colors resize-y" required></textarea>
              </div>

              <div className="mt-2 flex flex-col gap-4">
                <button 
                  type="submit" 
                  className="w-full bg-[#1c1917] hover:bg-black text-white font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase h-12 px-6 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send Message
                </button>
                <div className="flex items-center justify-center gap-2 text-stone-500 text-xs">
                  <ShieldCheck className="w-4 h-4 opacity-70" />
                  <span>We respect your privacy. Your information is safe with us.</span>
                </div>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Assistance Banner */}
        <div className="mt-12 w-full bg-[#f4ebd9]/40 border border-[#e5d4bb] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none">
             <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="#8c4f1c" strokeWidth="0.5">
               <circle cx="50" cy="50" r="45" opacity="0.5" />
               <path d="M50 5 L95 50 L50 95 L5 50 Z" opacity="0.3" />
               <circle cx="50" cy="50" r="25" opacity="0.4" />
             </svg>
          </div>
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#8c4f1c] shadow-sm shrink-0">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-1">Need Immediate Assistance?</h2>
              <p className="text-stone-600 text-sm">Our support team is always ready to help you.</p>
            </div>
          </div>
          
          <div className="relative z-10 sm:border-l sm:border-[#e5d4bb]/70 sm:pl-8 py-2">
            <a 
              href="https://wa.me/919861743000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#1c1917] hover:bg-black text-white font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase h-12 px-8 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us Now
            </a>
          </div>
        </div>

      </section>
    </main>
  );
}
