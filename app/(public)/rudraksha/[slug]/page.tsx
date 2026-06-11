"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Database of Products
const mockDb: Record<
  string,
  {
    name: string;
    category: string;
    tagline: string;
    price: string;
    oldPrice: string;
    discount: string;
    rating: number;
    reviewsCount: number;
    soldCount: string;
    benefits: string[];
    description: string;
    rulingPlanet?: string;
    deity?: string;
    mantra?: string;
    images: string[];
    sizes?: string[];
  }
> = {
  "7-mukhi-bracelet": {
    name: "7 Mukhi Rudraksha Bracelet",
    category: "Bracelets",
    tagline: "Authentic • Pure • Energized • X-Ray Verified",
    price: "1,299",
    oldPrice: "1,999",
    discount: "35% OFF",
    rating: 4.8,
    reviewsCount: 256,
    soldCount: "500+",
    benefits: [
      "100% Natural 7 Mukhi Rudraksha",
      "Hand-strung with durable elastic thread",
      "Energized & Blessed",
      "X-Ray Verified for authenticity",
      "Suitable for daily wear",
    ],
    description:
      "The 7 Mukhi Rudraksha is ruled by Goddess Mahalakshmi and is known to attract wealth, prosperity, and good luck. It helps in reducing stress, enhances focus, and brings overall well-being. This bracelet combines multiple authentic beads, making it a powerful spiritual tool and an elegant everyday accessory.",
    rulingPlanet: "Saturn (Shani)",
    deity: "Goddess Mahalakshmi",
    mantra: "Om Hum Namah",
    images: ["/bracelet_7_mukhi.png", "/bracelet_worn.png", "/swasthya_kavach.png", "/one_mukhi.png"],
    sizes: ["Small (6 - 7 inch)", "Medium (7 - 8 inch)", "Large (8 - 9 inch)"],
  },
  "5-mukhi-bracelet": {
    name: "5 Mukhi Rudraksha Bracelet",
    category: "Bracelets",
    tagline: "Authentic • Energized • Natural Java Beads",
    price: "999",
    oldPrice: "1,499",
    discount: "33% OFF",
    rating: 4.7,
    reviewsCount: 143,
    soldCount: "800+",
    benefits: [
      "100% Natural 5 Mukhi Rudraksha Beads",
      "Hand-crafted with sturdy stretchable cord",
      "Brings peace, health, and mental clarity",
      "Lab Certified authentic beads",
      "Comfortable for everyday spiritual wear",
    ],
    description:
      "The 5 Mukhi Rudraksha represents Lord Kalagni Rudra, a form of Lord Shiva. It is highly revered for monitoring blood pressure, reducing stress, and enhancing inner peace. Perfect for spiritual growth and mindfulness.",
    rulingPlanet: "Jupiter (Guru)",
    deity: "Lord Kalagni Rudra",
    mantra: "Om Hreem Namah",
    images: ["/bracelet_worn.png", "/bracelet_7_mukhi.png", "/nirakar.png"],
    sizes: ["Small (6 - 7 inch)", "Medium (7 - 8 inch)", "Large (8 - 9 inch)"],
  },
  "one-mukhi": {
    name: "1 Mukhi Rudraksha Bead",
    category: "Beads",
    tagline: "Ultra Rare • Nepal Origin • Collector Grade",
    price: "18,999",
    oldPrice: "24,999",
    discount: "24% OFF",
    rating: 4.9,
    reviewsCount: 89,
    soldCount: "50+",
    benefits: [
      "100% Genuine Half-Moon Nepalese Bead",
      "Lab Certified & X-Ray Tested",
      "Brings supreme focus and leadership",
      "Removes planetary defects of Sun",
      "Premium wooden gift box included",
    ],
    description:
      "The rarest of all Rudraksha beads, the 1 Mukhi is ruled by Lord Shiva himself. It is the symbol of pure consciousness. Wearing this bead elevates spiritual awareness, unlocks leadership qualities, and shields against negative energies.",
    rulingPlanet: "Sun (Surya)",
    deity: "Lord Shiva",
    mantra: "Om Hreem Namah",
    images: ["/one_mukhi.png", "/collector_bead.png", "/nirakar.png"],
  },
};

// Fallback generator for other IDs (e.g. 2-mukhi, gauri-shankar, etc.)
function getProductById(id: string) {
  const normalized = id.toLowerCase();
  if (normalized === "1-mukhi" || normalized === "1-mukhi-bead") {
    return mockDb["one-mukhi"];
  }
  if (normalized === "7-mukhi" || normalized === "7-mukhi-bracelet") {
    return mockDb["7-mukhi-bracelet"];
  }
  if (normalized === "5-mukhi" || normalized === "5-mukhi-bracelet") {
    return mockDb["5-mukhi-bracelet"];
  }

  if (mockDb[normalized]) return mockDb[normalized];

  const cleanName = id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const isKavach = id.toLowerCase().includes("kavach");
  const isBracelet = id.toLowerCase().includes("bracelet");

  let img = "/nirakar.png";
  if (id.includes("one")) img = "/one_mukhi.png";
  else if (id.includes("fourteen") || id.includes("14")) img = "/fourteen_mukhi.png";
  else if (id.includes("gauri-shankar")) img = "/gauri_shankar.png";
  else if (id.includes("ganesh")) img = "/ganesh_rudraksha.png";
  else if (id.includes("trijuti")) img = "/trijuti.png";
  else if (id.includes("savar")) img = "/savar.png";
  else if (id.includes("garbh-gauri")) img = "/garbh_gauri.png";
  else if (id.includes("vyapar")) img = "/vyapar_kavach.png";
  else if (id.includes("swasthya")) img = "/swasthya_kavach.png";
  else if (id.includes("kaal")) img = "/kaal_sarpa_kavach.png";
  else if (id.includes("devi")) img = "/devi_shakti_kavach.png";

  return {
    name: cleanName.toUpperCase().includes("MUKHI") ? cleanName : `${cleanName} Rudraksha`,
    category: isKavach ? "Kavach" : isBracelet ? "Bracelets" : "Beads",
    tagline: "Authentic • Pure • Energized • Lab Certified",
    price: isKavach ? "6,599" : "2,499",
    oldPrice: isKavach ? "8,999" : "3,499",
    discount: "27% OFF",
    rating: 4.8,
    reviewsCount: 120,
    soldCount: "100+",
    benefits: [
      `100% Authentic ${cleanName}`,
      "Energized at temple by Vedic priests",
      "Lab Certified for absolute purity",
      "Induces calm and inner positive vibes",
      "Ships with authentication certificate",
    ],
    description: `The sacred ${cleanName} is hand-selected and verified to deliver divine power and grace. Perfect for spiritual practitioners, collectors, and devotees looking for authentic spiritual remedies.`,
    rulingPlanet: "Jupiter (Guru)",
    deity: "Lord Shiva",
    mantra: "Om Namah Shivaya",
    images: [img, "/collector_bead.png", "/nirakar.png"],
    sizes: isBracelet ? ["Small (6 - 7 inch)", "Medium (7 - 8 inch)", "Large (8 - 9 inch)"] : undefined,
  };
}

function ProductDetailContent({ slug }: { slug: string }) {
  const product = getProductById(slug);

  const [activeImg, setActiveImg] = React.useState(product.images[0]);
  const [selectedSize, setSelectedSize] = React.useState(product.sizes ? product.sizes[1] : "");
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState("description");
  const [isAdded, setIsAdded] = React.useState(false);

  React.useEffect(() => {
    const checkCart = () => {
      try {
        const stored = localStorage.getItem("rudraksha-cart");
        if (stored) {
          const cart = JSON.parse(stored);
          setIsAdded(cart.some((item: any) => item.id === slug));
        }
      } catch (e) {}
    };
    checkCart();
    window.addEventListener("add-to-cart", checkCart);
    return () => window.removeEventListener("add-to-cart", checkCart);
  }, [slug]);

  const handleAddToCart = () => {
    if (isAdded) {
      window.dispatchEvent(new Event("open-cart"));
      return;
    }

    const parsedPrice = parseInt(product.price.replace(/,/g, ""), 10);
    const parsedOldPrice = parseInt(product.oldPrice.replace(/,/g, ""), 10);

    const cartEvent = new CustomEvent("add-to-cart", {
      detail: {
        id: slug,
        name: product.name,
        subtitle: product.tagline,
        price: parsedPrice,
        oldPrice: parsedOldPrice,
        discount: product.discount,
        img: product.images[0],
      },
    });
    window.dispatchEvent(cartEvent);
  };

  const handleBuyNow = () => {
    const parsedPrice = parseInt(product.price.replace(/,/g, ""), 10);
    const parsedOldPrice = parseInt(product.oldPrice.replace(/,/g, ""), 10);

    const buyNowEvent = new CustomEvent("buy-now", {
      detail: {
        id: slug,
        name: product.name,
        subtitle: product.tagline,
        price: parsedPrice,
        oldPrice: parsedOldPrice,
        discount: product.discount,
        img: product.images[0],
      },
    });
    window.dispatchEvent(buyNowEvent);
  };

  return (
    <div className="flex flex-col w-full bg-[#FCFBF7] text-zinc-900 overflow-hidden min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
        <nav className="text-stone-500 text-xs sm:text-sm mb-8 font-sans">
          <Link href="/" className="hover:text-stone-800 transition-colors">
            Home
          </Link>
          <span className="mx-2.5">/</span>
          <Link href="/shop" className="hover:text-stone-800 transition-colors">
            {product.category}
          </Link>
          <span className="mx-2.5">/</span>
          <span className="text-stone-800 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">
            <div className="col-span-2 flex flex-col gap-3">
              {product.images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImg(imgUrl)}
                  className={`relative aspect-square w-full rounded-xl overflow-hidden border bg-white flex items-center justify-center p-1 cursor-pointer transition-all duration-300 ${
                    activeImg === imgUrl ? "border-black shadow-xs ring-1 ring-black/10" : "border-stone-200 hover:border-stone-400"
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${index}`} className="w-full h-full object-cover rounded-lg" />
                  {index === 3 && (
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-xs">
                        <svg className="w-3.5 h-3.5 text-stone-900 fill-current translate-x-[1px]" viewBox="0 0 24 24">
                          <polygon points="8 5 19 12 8 19" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="col-span-10 relative aspect-[4/5] sm:aspect-square w-full rounded-2xl overflow-hidden border border-stone-200/60 bg-white flex items-center justify-center group">
              <img src={activeImg} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center border border-stone-200/50 shadow-xs cursor-pointer hover:bg-white transition-colors">
                <svg className="w-4.5 h-4.5 text-stone-750" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 text-left">
            <span className="inline-block bg-[#F5EDE2] text-[#8c4f1c] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-3">
              Bestseller
            </span>

            <h1 className="font-serif text-2xl sm:text-3.5xl font-bold text-stone-955 tracking-wide leading-tight mb-2">
              {product.name}
            </h1>

            <p className="text-[#c3a267] text-xs font-bold tracking-widest uppercase mb-4">
              {product.tagline}
            </p>

            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-sans text-2xl sm:text-3xl font-bold text-stone-900">₹{product.price}</span>
              <span className="font-sans text-stone-450 line-through text-sm sm:text-base">₹{product.oldPrice}</span>
              <span className="text-[#16a34a] text-xs sm:text-sm font-bold bg-green-50 px-2 py-0.5 rounded-sm">
                {product.discount}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6 font-sans text-xs sm:text-sm text-stone-500">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-stone-850">{product.rating}</span>
              <span>({product.reviewsCount} reviews)</span>
              <span>|</span>
              <span className="text-stone-750 font-medium">{product.soldCount} sold</span>
            </div>

            <ul className="space-y-2.5 border-t border-b border-stone-200/80 py-5 mb-6 text-stone-700 text-xs sm:text-sm font-sans">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-green-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {product.sizes && (
              <div className="mb-6">
                <span className="block text-[10px] font-bold text-stone-450 uppercase tracking-widest mb-3">
                  Bracelet Size
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all duration-300 ${
                        selectedSize === size
                          ? "border-black bg-stone-900 text-white"
                          : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <span className="block text-[10px] font-bold text-stone-450 uppercase tracking-widest mb-3">Quantity</span>
              <div className="flex items-center border border-stone-200 rounded-lg w-32 bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 py-2 text-stone-500 hover:bg-stone-50 transition-colors font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="flex-1 text-center font-sans text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 py-2 text-stone-500 hover:bg-stone-50 transition-colors font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm tracking-[0.2em] uppercase h-14 rounded-xl transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
              >
                {isAdded ? "GO TO CART" : "ADD TO CART"}
              </button>

              <button 
                onClick={handleBuyNow}
                className="w-full bg-white hover:bg-black text-black hover:text-white border border-black font-bold text-xs sm:text-sm tracking-[0.2em] uppercase h-14 rounded-xl transition-all duration-300 cursor-pointer"
              >
                BUY NOW
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center border-t border-stone-200/80 pt-6 font-sans text-[10px] sm:text-xs text-stone-500 leading-normal">
              <div className="flex flex-col items-center">
                <svg className="w-5 h-5 text-stone-600 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span className="font-bold text-stone-850">Free Shipping</span>
                <span>on orders above ₹999</span>
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-5 h-5 text-stone-600 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="font-bold text-stone-850">Secure Payment</span>
                <span>100% Protected</span>
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-5 h-5 text-stone-600 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                <span className="font-bold text-stone-850">Easy Returns</span>
                <span>7 Days Return Policy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-stone-200/60 rounded-2xl p-6 sm:p-8 bg-white mb-16 shadow-2xs">
          <div className="border-b border-stone-200/80 flex gap-8 mb-6">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-3 text-xs sm:text-sm font-bold tracking-wider uppercase border-b-2 cursor-pointer transition-all ${
                activeTab === "description" ? "border-[#c3a267] text-[#c3a267]" : "border-transparent text-stone-400 hover:text-stone-750"
              }`}
            >
              Description
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 text-left">
              <p className="text-stone-700 text-sm leading-relaxed mb-8 font-sans">{product.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-11 h-11 rounded-full bg-[#FCFBF7] border border-[#c3a267]/30 flex items-center justify-center text-[#c3a267] mb-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="8" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-850 font-sans tracking-wide leading-snug">
                    Attracts Wealth & Prosperity
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-11 h-11 rounded-full bg-[#FCFBF7] border border-[#c3a267]/30 flex items-center justify-center text-[#c3a267] mb-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="3.5" />
                      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                    </svg>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-850 font-sans tracking-wide leading-snug">
                    Enhances Focus & Concentration
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-11 h-11 rounded-full bg-[#FCFBF7] border border-[#c3a267]/30 flex items-center justify-center text-[#c3a267] mb-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-850 font-sans tracking-wide leading-snug">
                    Reduces Stress & Anxiety
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-11 h-11 rounded-full bg-[#FCFBF7] border border-[#c3a267]/30 flex items-center justify-center text-[#c3a267] mb-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 21c-2-2.5-5-4-5-7 0-4.5 5-8 5-8s5 3.5 5 8" />
                    </svg>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-850 font-sans tracking-wide leading-snug">
                    Promotes Overall Well-being
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#F9F6F0] rounded-xl p-5 border border-[#c3a267]/15 text-left">
              <h4 className="font-serif text-sm font-bold text-stone-900 tracking-wider mb-2.5 uppercase">
                X-Ray Verified
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm font-sans leading-relaxed mb-4">
                Each bead in this bracelet undergoes strict X-ray testing and verification in our ISO certified lab to verify inner compartmental structure and seed maturity.
              </p>

              <div className="border border-stone-200/60 rounded-lg overflow-hidden bg-white p-2.5 flex items-center gap-3.5 mb-3.5">
                <div className="w-11 h-11 shrink-0 rounded-md overflow-hidden bg-stone-50 border border-stone-200/50">
                  <img src="/bracelet_7_mukhi.png" alt="Report icon" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-stone-400 font-sans tracking-wide">Authencity Cert</span>
                  <span className="text-stone-850 font-serif text-xs font-semibold">X-Ray Verification Report</span>
                </div>
              </div>

              <span className="text-[10px] sm:text-xs text-[#8c4f1c] font-bold hover:underline cursor-pointer uppercase tracking-wider block font-sans">
                View Sample Report
              </span>
            </div>
          </div>
        </div>

        <section className="text-left mb-8">
          <h2 className="font-serif text-2xl font-normal text-stone-900 mb-8 uppercase tracking-wide">
            You May Also Like
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Siddh Rudraksha Mala", price: "2,499", oldPrice: "3,499", discount: "29% OFF", img: "/category_siddh_mala.jpg" },
              { name: "5 Mukhi Rudraksha Bracelet", price: "999", oldPrice: "1,499", discount: "33% OFF", img: "/bracelet_worn.png" },
              { name: "8 Mukhi Rudraksha Mala", price: "1,799", oldPrice: "2,499", discount: "28% OFF", img: "/collector_bead.png" },
              { name: "Gold Plated Rudraksha Bracelet", price: "1,599", oldPrice: "2,299", discount: "30% OFF", img: "/category_bracelet.jpg" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200/50 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between p-3.5 sm:p-5 text-center min-h-[290px]"
              >
                <div className="flex flex-col items-center">
                  <div className="relative aspect-square w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-full border border-stone-200/40 bg-stone-50 flex items-center justify-center mb-4 cursor-pointer">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="font-serif text-xs sm:text-sm font-semibold text-stone-850 hover:text-[#c3a267] transition-colors leading-snug mb-1 cursor-pointer">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-2 font-sans">
                    <span className="font-bold text-stone-900 text-xs sm:text-sm">₹{item.price}</span>
                    <span className="text-stone-400 line-through text-[10px] sm:text-xs">₹{item.oldPrice}</span>
                    <span className="text-[#16a34a] text-[10px] font-bold">{item.discount}</span>
                  </div>
                </div>

                <Link href={`/rudraksha/${item.name.toLowerCase().replace(/ /g, "-")}`} className="block">
                  <button className="w-full bg-white hover:bg-black text-black hover:text-white border border-black transition-all duration-300 text-[10px] tracking-widest font-bold py-2 rounded-lg mt-4 uppercase cursor-pointer">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="w-full bg-[#3f2a1b] text-stone-100 py-6 border-t border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs font-sans">
          <div className="flex items-center justify-center gap-2.5">
            <svg className="w-5 h-5 text-[#c3a267] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <div className="flex flex-col text-left">
              <span className="font-bold">100% Original</span>
              <span className="text-[10px] text-stone-300">Authentic Products</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <svg className="w-5 h-5 text-[#c3a267] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <div className="flex flex-col text-left">
              <span className="font-bold">Secure Checkout</span>
              <span className="text-[10px] text-stone-300">Multiple Payment Options</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <svg className="w-5 h-5 text-[#c3a267] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
            <div className="flex flex-col text-left">
              <span className="font-bold">Dedicated Support</span>
              <span className="text-[10px] text-stone-300">We&apos;re Here to Help</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <svg className="w-5 h-5 text-[#c3a267] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <div className="flex flex-col text-left">
              <span className="font-bold">Trusted by</span>
              <span className="text-[10px] text-stone-300">10,000+ Customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams<{ slug?: string | string[] }>();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? "";

  return <ProductDetailContent key={slug} slug={slug} />;
}
