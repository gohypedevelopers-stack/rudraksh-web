"use client";

import * as React from "react";
import Link from "next/link";

function VisaLogo() {
  return (
    <svg viewBox="0 0 24 8" className="w-12 h-5" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.568.146L2.35 8h1.492l1.218-7.854H3.568zm4.492 3.42c-.22-.116-.584-.24-.96-.24-.83 0-1.41.428-1.41 1.037 0 .45.422.697.74.848.33.155.44.256.44.394 0 .21-.264.31-.508.31-.69 0-1.066-.3-.12-.475l-.234-1.07h-1.47l1.442 6.634h1.436l.858-3.954c.228-.116.592-.24.972-.24.828 0 1.408-.43 1.408-1.037 0-.45-.422-.697-.74-.848zm6.544-3.274h-1.388c-.43 0-.756.242-.916.61L11.53 8h1.5l.3-.808h1.834L15.34 8h1.326L15.518.292h-.914zm-.316 4.708l.74-2.03.424 2.03h-1.164zM.108 2.096l1.458 3.79L1.072 1.15A1.332 1.332 0 0 0 0 .146h2.518L4.01 6.84 5.534.146h1.532l-2.296 8H3.276L1.242 2.766.452.88A1.36 1.36 0 0 0 .108 2.096z" fill="#1A1F71"/>
      <path d="M0 .146h1.3L.108 2.096A1.36 1.36 0 0 1 0 .146" fill="#F7B600"/>
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 32 27" className="w-10 h-8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="#EB001B" />
      <circle cx="22" cy="10" r="10" fill="#F79E1B" opacity="0.9" />
      <path d="M16 1.8a9.9 9.9 0 0 0-3.5 7.6 9.9 9.9 0 0 0 3.5 7.6 9.9 9.9 0 0 0 3.5-7.6 9.9 9.9 0 0 0-3.5-7.6z" fill="#FF5F00" />
      <text x="16" y="24" fontSize="3.8" fontFamily="sans-serif" fontWeight="500" fill="#222" textAnchor="middle">mastercard</text>
    </svg>
  );
}

function UPILogo() {
  return (
    <svg viewBox="0 0 44 16" className="w-12 h-5" xmlns="http://www.w3.org/2000/svg">
      <g fill="#373737" transform="skewX(-12)">
        <path d="M2 3h2.5v5c0 1.2.6 1.8 1.5 1.8s1.5-.6 1.5-1.8v-5H10v5c0 2.2-1.3 3.5-3.8 3.5S2.5 10.2 2.5 8V3z" />
        <path d="M12 3h4c1.8 0 3 1 3 2.5s-1.2 2.5-3 2.5h-1.5v3.5H12V3zm4 3.5c.7 0 1.2-.3 1.2-.9s-.5-.9-1.2-.9h-1.5v1.8H16z" />
        <path d="M21.5 3H24v8.5h-2.5V3z" />
      </g>
      <g transform="translate(26, 3)">
        <path d="M2.5 0L6 4.5H3.5L0 0h2.5z" fill="#ED7D31" />
        <path d="M0 8.5l3.5-4.5H1L-2.5 8.5H0z" fill="#097939" />
      </g>
      <text x="14" y="15" fontSize="2" fontFamily="sans-serif" fontWeight="bold" fill="#777" letterSpacing="0.02">UNIFIED PAYMENTS INTERFACE</text>
    </svg>
  );
}

function AmexLogo() {
  return (
    <svg viewBox="0 0 40 20" className="w-12 h-6" xmlns="http://www.w3.org/2000/svg">
      <text x="20" y="8" fontSize="5.5" fontFamily="'Arial Black', sans-serif" fontWeight="900" fill="#006FCF" textAnchor="middle" letterSpacing="0.05">AMERICAN</text>
      <text x="20" y="15" fontSize="5.5" fontFamily="'Arial Black', sans-serif" fontWeight="900" fill="#006FCF" textAnchor="middle" letterSpacing="0.05">EXPRESS</text>
    </svg>
  );
}

function RuPayLogo() {
  return (
    <svg viewBox="0 0 48 18" className="w-12 h-5" xmlns="http://www.w3.org/2000/svg">
      <g fontStyle="italic" fontWeight="900" fontFamily="sans-serif" fontSize="13" transform="skewX(-12)">
        <tspan x="2" y="13" fill="#0B2E76">Ru</tspan>
        <tspan fill="#0B2E76">Pay</tspan>
      </g>
      <g transform="translate(39, 3) skewX(-12)">
        <path d="M0 0l3 4.5H1L-2 0h2z" fill="#ED7D31" />
        <path d="M2.5 0l3 4.5H4L1 0h2.5z" fill="#097939" />
      </g>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#FCFBF7] pt-16 border-t border-stone-200/80 relative overflow-hidden flex flex-col items-center w-full">
      
      {/* Banner Section: Need Help Choosing the Right Rudraksha */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-16 relative z-10">
        <div className="w-full rounded-3xl bg-[#F6EDE2] p-8 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden border border-[#c3a267]/15">
          {/* Faint watermark mandala in banner */}
          <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none">
            <svg className="w-48 h-48 text-stone-900" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="38" />
              <circle cx="50" cy="50" r="28" />
              <path d="M50 5 L50 95 M5 50 L95 50" />
            </svg>
          </div>

          {/* Left side info */}
          <div className="flex items-center gap-5 relative z-10 w-full lg:w-auto">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-[#c3a267]/20 shadow-xs shrink-0">
              {/* Headset support icon */}
              <svg className="w-6 h-6 text-[#8c4f1c] stroke-[1.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                Need Help Choosing the Right Rudraksha?
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 font-sans">
                Our experts are here to guide you with the best choice.
              </p>
            </div>
          </div>

          {/* Right side CTA */}
          <div className="flex items-center w-full lg:w-auto justify-end relative z-10 shrink-0">
            <div className="w-[1px] h-12 bg-stone-300/80 hidden lg:block mr-8" />
            <Link href="https://wa.me/919861743000" target="_blank" className="block w-full lg:w-auto">
              <button className="w-full lg:w-auto bg-[#1c1917] hover:bg-black text-white font-bold text-xs tracking-wider uppercase h-12 px-8 rounded-full transition-all flex items-center justify-center gap-3 whitespace-nowrap cursor-pointer shadow-xs">
                {/* WhatsApp/Call bubble icon */}
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.16 1.45 4.8 1.45 5.51 0 9.99-4.49 10-10 .00-2.67-1.03-5.18-2.92-7.07C16.57 1.63 14.07 1 12.01 1c-5.51 0-9.99 4.49-10 10-.00 1.84.48 3.6 1.4 5.16l-1.06 3.89 3.99-1.05z" />
                </svg>
                Talk to an Expert
              </button>
            </Link>
          </div>

        </div>
      </div>

      {/* Main Footer Directory Grid */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-left relative z-10">
        
        {/* Column 1: Brand Info & Seals (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full border border-[#c3a267]/40 overflow-hidden bg-white shrink-0 p-0.5 shadow-xs">
              <img src="/collector_bead.png" alt="RudraLaksh" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                {/* Trident symbol */}
                <svg className="w-4.5 h-4.5 text-stone-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 2v20 M6 5c2 2.5 10 2.5 12 0 M6 5v6 M18 5v6" />
                </svg>
                <span className="font-serif text-xl font-bold tracking-wider leading-none text-stone-900">
                  SATVIK
                </span>
              </div>
              <span className="text-[7.5px] tracking-[0.22em] font-sans font-bold uppercase mt-1 leading-none text-stone-500">
                FROM THE HOUSE OF CYCLE
              </span>
            </div>
          </div>
          
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 max-w-xs font-sans">
            India's largest Rudraksha and Pooja Accessories brand trusted by thousands of devotees worldwide.
          </p>

          <div className="w-full border-t border-stone-200/60 my-4" />

          {/* Trust Seals */}
          <div className="flex items-center gap-8">
            {/* Seal 1 */}
            <div className="flex flex-col items-center text-center">
              <svg className="w-7 h-7 text-stone-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2v20 M7 5c2 2.5 8 2.5 10 0 M7 5v5 M17 5v5" />
              </svg>
              <span className="text-[9px] font-bold text-stone-900 tracking-wider uppercase mt-1.5">SATVIK</span>
              <span className="text-[7.5px] text-stone-500 tracking-wider uppercase font-semibold">TRUSTED</span>
            </div>

            {/* Seal 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full border-2 border-stone-900 flex items-center justify-center font-bold text-xs text-stone-900">
                GS
              </div>
              <span className="text-[9px] font-bold text-stone-900 tracking-wider uppercase mt-1.5">10000 GS 1</span>
              <span className="text-[7.5px] text-stone-500 tracking-wider uppercase font-semibold">CERTIFIED</span>
            </div>
          </div>
        </div>

        {/* Column 2: EXPLORE (lg:col-span-2) */}
        <div className="lg:col-span-2">
          <h4 className="font-sans text-xs font-bold text-stone-955 tracking-[0.15em] uppercase mb-3">
            EXPLORE
          </h4>
          <div className="w-8 h-[2px] bg-[#c3a267] mb-5" />
          <ul className="space-y-3 text-xs text-stone-600 font-sans">
            {[
              "All Rudraksha",
              "Nepali Rudraksha",
              "Indonesian Rudraksha",
              "Kavach Collection",
              "Rare Collection",
              "Pooja Accessories",
              "New Arrivals",
              "Best Sellers"
            ].map((item) => (
              <li key={item}>
                <Link href="/rudraksha" className="flex items-center justify-between hover:text-[#c3a267] transition-colors group">
                  <span>{item}</span>
                  <span className="text-[9px] text-stone-400 group-hover:text-[#c3a267] transition-transform duration-200 translate-x-0 group-hover:translate-x-0.5">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: CUSTOMER SUPPORT (lg:col-span-2) */}
        <div className="lg:col-span-2">
          <h4 className="font-sans text-xs font-bold text-stone-955 tracking-[0.15em] uppercase mb-3">
            CUSTOMER SUPPORT
          </h4>
          <div className="w-8 h-[2px] bg-[#c3a267] mb-5" />
          <ul className="space-y-3 text-xs text-stone-600 font-sans">
            {[
              "Shipping Policy",
              "Returns & Refunds",
              "Track My Order",
              "FAQ",
              "Terms & Conditions",
              "Privacy Policy",
              "Exchange / Cancel Order",
              "Contact Us"
            ].map((item) => (
              <li key={item}>
                <Link href="/support" className="hover:text-[#c3a267] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: COMPANY (lg:col-span-2) */}
        <div className="lg:col-span-2">
          <h4 className="font-sans text-xs font-bold text-stone-955 tracking-[0.15em] uppercase mb-3">
            COMPANY
          </h4>
          <div className="w-8 h-[2px] bg-[#c3a267] mb-5" />
          <ul className="space-y-3 text-xs text-stone-600 font-sans">
            {[
              "About Us",
              "Our Journey",
              "Media",
              "Blogs",
              "Corporate Gifting",
              "Bulk Orders",
              "Vendor Zone",
              "Careers"
            ].map((item) => (
              <li key={item}>
                <Link href="/about" className="hover:text-[#c3a267] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5: CONTACT US (lg:col-span-2) */}
        <div className="lg:col-span-2">
          <h4 className="font-sans text-xs font-bold text-stone-955 tracking-[0.15em] uppercase mb-3">
            CONTACT US
          </h4>
          <div className="w-8 h-[2px] bg-[#c3a267] mb-5" />
          <ul className="space-y-4 text-xs text-stone-655 font-sans">
            
            {/* WhatsApp/Call */}
            <li className="flex items-start gap-2.5">
              <svg className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <div className="flex flex-col">
                <span className="font-bold text-stone-900 hover:text-[#c3a267] transition-colors cursor-pointer">
                  +91 9861743000
                </span>
                <span className="text-[10px] text-stone-500 mt-0.5">(10:00am – 6:00pm IST)</span>
                <span className="text-[10px] text-stone-500">Monday to Saturday</span>
              </div>
            </li>

            {/* Email */}
            <li className="flex items-start gap-2.5">
              <svg className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <div className="flex flex-col">
                <span className="font-bold text-stone-900 hover:text-[#c3a267] transition-colors cursor-pointer break-all">
                  support@satvikstore.in
                </span>
              </div>
            </li>

            {/* Location */}
            <li className="flex items-start gap-2.5">
              <svg className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="flex flex-col text-stone-500 leading-relaxed">
                <span className="font-bold text-stone-900">Corporate Office:</span>
                <span className="text-[10px] mt-0.5">811/50 Lekhu Nagar,</span>
                <span className="text-[10px]">Tri Nagar, Delhi-110035</span>
                <span className="text-[10px]">(India)</span>
              </div>
            </li>

          </ul>
        </div>

      </div>

      {/* Bottom Socials, Payment Icons & Copyright Bar */}
      <div className="w-full border-t border-stone-200/60 pt-8 pb-4 relative z-10 bg-[#FAF8F5]">
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col gap-6 items-center">
          
          {/* Payment Methods Row (Integrated) */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-stone-400 uppercase">
              WE ACCEPT
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {[
                { name: "Visa", logo: <VisaLogo /> },
                { name: "Mastercard", logo: <MastercardLogo /> },
                { name: "UPI", logo: <UPILogo /> },
                { name: "American Express", logo: <AmexLogo /> },
                { name: "RuPay", logo: <RuPayLogo /> }
              ].map((payment) => (
                <div 
                  key={payment.name} 
                  className="w-14 h-9 bg-white border border-[#c3a267]/20 rounded-md flex items-center justify-center p-1.5 shadow-2xs hover:border-[#c3a267]/50 transition-colors"
                >
                  {payment.logo}
                </div>
              ))}
            </div>
          </div>

          {/* Social & Legal Row */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-stone-200/40">
            
            {/* Follow Us */}
            <div className="flex items-center gap-3.5">
              <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.15em] text-stone-500 uppercase">
                FOLLOW US
              </span>
              <div className="flex items-center gap-2">
                {[
                  { name: "Instagram", icon: (
                    <svg className="w-3.5 h-3.5 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )},
                  { name: "Facebook", icon: (
                    <svg className="w-3.5 h-3.5 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  )},
                  { name: "YouTube", icon: (
                    <svg className="w-3.5 h-3.5 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                    </svg>
                  )},
                  { name: "Pinterest", icon: (
                    <svg className="w-3.5 h-3.5 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 2a10 10 0 0 0-3.3 19.4c-.1-.9-.1-2.1.2-3l1.8-7.7c-.3-.6-.3-1.4 0-2 1-2 3-.5 2 1.4-.7 3.3-1.6 3.3-1 4.5.7 1.4 2.6.7 3.5-.8 2-3.3 2.5-6.5-.5-8.5-3.3-2.2-7.5-1.3-8.8 2.2a4 4 0 0 0 1 4c.3.3.3.4.2.8l-.4 1.5c-.1.3-.3.4-.6.3-2-.8-3-3.3-2.5-6 1-4.7 5.3-8.5 10.7-8.5 5.5 0 9 3.6 8.2 8.3-.7 4.5-3.8 7.6-7.7 7.2-1.3-.2-2.5-1-2-2.6l1.3-5.2c.4-1.6 0-3.2-1.2-3.6-1.5-.5-3 1.2-2.3 3.5z" fill="currentColor" />
                    </svg>
                  )}
                ].map((social) => (
                  <button 
                    key={social.name}
                    className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors cursor-pointer"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Copyright & policies */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-[11px] text-stone-500 font-medium font-sans">
              <span>© 2026 Satvik Store. All Rights Reserved.</span>
              <div className="flex items-center gap-3">
                <Link href="/support" className="hover:underline">Privacy Policy</Link>
                <span>|</span>
                <Link href="/support" className="hover:underline">Terms & Conditions</Link>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Decorative repeating lotus border at the very bottom */}
      <div 
        className="w-full h-5 opacity-40 bg-repeat-x bg-center bg-[#FAF8F5] border-t border-stone-200/50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='16' viewBox='0 0 24 16'%3E%3Cpath d='M12 2c-1.5 2-3.5 3-3.5 5 0 2 2 4 3.5 4s3.5-2 3.5-4c0-2-2-3-3.5-5z M8.5 7c-1 0-1.5.5-1.5 1.5 0 1.5 1.5 2 1.5 2s1-1.5.5-3c-.2-.2-.3-.5-.5-.5z M15.5 7c1 0 1.5.5 1.5 1.5 0 1.5-1.5 2-1.5 2s-1-1.5-.5-3c.2-.2.3-.5.5-.5z' fill='none' stroke='%23c3a267' stroke-width='0.8'/%3E%3C/svg%3E")`
        }}
      />

    </footer>
  );
}
