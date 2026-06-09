"use client";

import * as React from "react";
import { X, ChevronRight, Plus, Minus, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  discount: string;
  qty: number;
  img: string;
  subtitle?: string;
}

export default function CartDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [isTotalDetailsOpen, setIsTotalDetailsOpen] = React.useState(false);

  // Initialize and seed default items matching the user's mockup if empty
  const loadCart = () => {
    try {
      const stored = localStorage.getItem("rudraksha-cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      } else {
        const seeded: CartItem[] = [
          {
            id: "10-mukhi",
            name: "10 Mukhi Rudraksha (Regular)",
            subtitle: "10 Mukhi • One - Face",
            price: 495,
            oldPrice: 3599,
            discount: "31% OFF",
            qty: 1,
            img: "/garbh_gauri.png"
          },
          {
            id: "4-mukhi",
            name: "4 Mukhi Rudraksha (Regular)",
            subtitle: "4 Mukhi • Four - Face",
            price: 895,
            oldPrice: 1299,
            discount: "31% OFF",
            qty: 1,
            img: "/nirakar.png"
          }
        ];
        localStorage.setItem("rudraksha-cart", JSON.stringify(seeded));
        setCartItems(seeded);
      }
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    loadCart();

    const handleOpenCart = (e: Event) => {
      // Refresh items in case a new item was added
      loadCart();
      setIsOpen(true);
    };

    const handleAddItem = (e: CustomEvent<Omit<CartItem, "qty">>) => {
      try {
        const stored = localStorage.getItem("rudraksha-cart");
        let current: CartItem[] = stored ? JSON.parse(stored) : [];
        const existingIdx = current.findIndex((item) => item.id === e.detail.id);
        if (existingIdx > -1) {
          current[existingIdx].qty += 1;
        } else {
          current.push({ ...e.detail, qty: 1 });
        }
        localStorage.setItem("rudraksha-cart", JSON.stringify(current));
        setCartItems(current);
        setIsOpen(true);
      } catch (err) {
        console.error(err);
      }
    };

    window.addEventListener("open-cart", handleOpenCart);
    window.addEventListener("add-to-cart", handleAddItem as EventListener);

    return () => {
      window.removeEventListener("open-cart", handleOpenCart);
      window.removeEventListener("add-to-cart", handleAddItem as EventListener);
    };
  }, []);

  const saveCart = (items: CartItem[]) => {
    localStorage.setItem("rudraksha-cart", JSON.stringify(items));
    setCartItems(items);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);
    saveCart(updated);
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const originalSubtotal = cartItems.reduce((acc, item) => acc + item.oldPrice * item.qty, 0);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // If subtotal is above 999, we show free gift item and free shipping
  const isFreeGiftUnlocked = subtotal >= 999;
  const isFreeShipping = subtotal >= 999;

  // Final totals (including free gift calculations if unlocked)
  const finalPrice = subtotal;
  const finalOldPrice = originalSubtotal + (isFreeGiftUnlocked ? 199 : 0);

  return (
    <>
      {/* Dark overlay backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Cart Drawer Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-55 w-full max-w-[460px] bg-[#FCFBF7] shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col justify-between text-zinc-900 font-sans",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-stone-200 bg-white flex items-center gap-4">
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5 text-stone-750" />
          </button>
          <h2 className="font-serif text-lg font-bold text-stone-900">
            Shopping Bag ({totalQty + (isFreeGiftUnlocked ? 1 : 0)})
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-4 space-y-4">
          {/* Unlock Offers Banner */}
          <div className="bg-[#2D1B10] text-[#E8D1B5] py-3.5 px-5 flex items-center justify-between text-xs font-sans tracking-wide">
            <div className="flex items-center gap-2.5">
              {/* Diamond Icon */}
              <svg className="w-5 h-5 text-[#c3a267] fill-current" viewBox="0 0 24 24">
                <polygon points="12 2 2 8.5 12 22 22 8.5" />
                <polyline points="2 8.5 12 13.5 22 8.5" />
                <line x1="12" y1="2" x2="12" y2="13.5" />
              </svg>
              <span>
                {subtotal < 1000 ? (
                  <>Shop worth <strong className="text-white">₹{1000 - subtotal}</strong> more to unlock best offers!</>
                ) : (
                  <>Congratulations! You have unlocked the best offers!</>
                )}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#c3a267]" />
          </div>

          {/* Promo Card: Bollywood Hungama Awards */}
          <div className="px-4">
            <div className="bg-white border border-stone-200/80 rounded-2xl p-4 flex gap-4 relative overflow-hidden shadow-2xs">
              {/* Left Column: Trophy Illustration & Text */}
              <div className="flex-1 text-left flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1">
                    Get a chance to attend
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug mb-1">
                    Bollywood Hungama <br /> Awards 26
                  </h3>
                  <p className="text-[10px] text-green-600 font-semibold mb-3">
                    Congrats! You have unlocked best discounts
                  </p>
                </div>
                
                {/* Progress bar */}
                <div className="w-full">
                  <div className="flex items-end gap-1 mb-1">
                    {/* Orange flag icon */}
                    <span className="text-sm">🚩</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min((subtotal / 1500) * 100, 100)}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Central Trophy Asset */}
              <div className="w-18 shrink-0 flex items-center justify-center">
                <img src="/gold_star_trophy.png" alt="Trophy" className="max-h-24 object-contain" />
              </div>

              {/* Vertical line divider */}
              <div className="w-[1px] bg-stone-200" />

              {/* Right Column: Gift Box Promotion */}
              <div className="w-24 shrink-0 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] text-stone-500 leading-tight block mb-1">
                  Bollywood Hungama <br /> Awards 2026
                </span>
                <img src="/gift_box_icon.png" alt="Gift Box" className="w-12 h-12 object-contain mb-1" />
                <span className="text-[9px] text-stone-600 font-bold tracking-tight block">
                  Your chance <br /> to be at
                </span>
              </div>
            </div>
          </div>

          {/* Product Items List */}
          <div className="px-4 space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white border border-stone-180 rounded-2xl p-4 flex gap-4 items-center">
                {/* Product Image Wrapper with Discount Badge */}
                <div className="relative w-20 h-20 bg-stone-50 rounded-xl overflow-hidden border border-stone-200/60 flex items-center justify-center p-2.5">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute top-1.5 left-1.5 bg-[#14532D] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                    {item.discount}
                  </span>
                </div>

                {/* Meta details */}
                <div className="flex-1 text-left flex flex-col justify-between h-20 py-0.5">
                  <div>
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-stone-900 leading-snug truncate max-w-[190px]">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-stone-400 block mt-0.5">
                      {item.subtitle || "Authentic Nepalese Bead"}
                    </span>
                  </div>

                  {/* Quantity Counter Block */}
                  <div className="flex items-center border border-stone-200 rounded-lg w-20 justify-between overflow-hidden bg-white mt-1 h-7">
                    <button 
                      onClick={() => handleUpdateQty(item.id, -1)}
                      className="w-6 h-full flex items-center justify-center text-stone-450 hover:bg-stone-50 cursor-pointer"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <span className="text-xs font-semibold">{item.qty}</span>
                    <button 
                      onClick={() => handleUpdateQty(item.id, 1)}
                      className="w-6 h-full flex items-center justify-center text-stone-450 hover:bg-stone-50 cursor-pointer"
                    >
                      <Plus className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>

                {/* Price indicators */}
                <div className="text-right flex flex-col justify-center">
                  <span className="text-xs sm:text-sm font-bold text-stone-900 font-sans">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </span>
                  <span className="text-[10px] text-stone-400 line-through mt-0.5 font-sans">
                    ₹{(item.oldPrice * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}

            {/* Free Gift Card (Always visible, conditionally unlocked) */}
            <div className={cn(
              "border rounded-2xl p-4 flex gap-4 items-center transition-all duration-300",
              isFreeGiftUnlocked 
                ? "bg-[#FAF5FF] border-purple-200" 
                : "bg-stone-50/50 border-dashed border-stone-300 opacity-60"
            )}>
              {/* Pearl Mala Image */}
              <div className="relative w-20 h-20 bg-white rounded-xl overflow-hidden border border-stone-250/50 flex items-center justify-center">
                <img src="/pearl_mala_gift.png" alt="Free Gift Pearl Mala" className="w-full h-full object-cover" />
              </div>

              {/* Gift Details */}
              <div className="flex-1 text-left flex flex-col justify-between h-20 py-0.5">
                <div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                    Free Gift on All Prepaid Orders
                  </h4>
                  <span className="text-[10px] text-stone-400 block mt-0.5">
                    Jap Mala
                  </span>
                </div>

                {/* Free Gift Tag */}
                <div className="inline-flex items-center gap-1 bg-purple-50 border border-purple-100 text-purple-600 text-[8px] font-bold px-2 py-0.5 rounded-full w-max">
                  🎁 FREE GIFT
                </div>
              </div>

              {/* Pricing details */}
              <div className="text-right flex flex-col justify-center">
                <span className="text-xs sm:text-sm font-bold text-[#b91c1c] font-sans">
                  ₹0
                </span>
                <span className="text-[10px] text-stone-400 line-through mt-0.5 font-sans">
                  ₹199
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="border-t border-stone-200 bg-white">
          {/* Trust Badges */}
          <div className="grid grid-cols-4 gap-1 py-3.5 border-b border-stone-150 text-center font-sans text-[8px] sm:text-[9px] text-stone-500 leading-normal max-w-full px-2">
            <div className="flex flex-col items-center border-r border-stone-200">
              <span className="text-stone-900 mb-0.5 text-xs">🛡️</span>
              <span className="font-bold text-stone-850">100% Original</span>
              <span>Products</span>
            </div>
            <div className="flex flex-col items-center border-r border-stone-200">
              <span className="text-stone-900 mb-0.5 text-xs">🔒</span>
              <span className="font-bold text-stone-850">Secure</span>
              <span>Payment</span>
            </div>
            <div className="flex flex-col items-center border-r border-stone-200">
              <span className="text-stone-900 mb-0.5 text-xs">🚚</span>
              <span className="font-bold text-stone-850">Free Shipping</span>
              <span>above ₹999</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-stone-900 mb-0.5 text-xs">🔄</span>
              <span className="font-bold text-stone-850">Easy Returns</span>
              <span>7 Days Policy</span>
            </div>
          </div>

          {/* Checkout Block */}
          <div className="p-4 bg-white flex flex-col gap-3">
            <div className="flex items-center justify-between">
              {/* Estimated Total Clickable Trigger */}
              <button 
                onClick={() => setIsTotalDetailsOpen(!isTotalDetailsOpen)}
                className="flex items-center gap-1 text-xs font-bold text-stone-500 tracking-wider hover:text-stone-800 cursor-pointer"
              >
                <span>Estimated Total</span>
                {isTotalDetailsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>
              
              {/* Price Tag */}
              <div className="flex items-baseline gap-2">
                <span className="text-stone-400 line-through text-xs font-sans">
                  ₹{finalOldPrice}
                </span>
                <span className="text-base sm:text-lg font-extrabold text-stone-900 font-sans">
                  ₹{finalPrice}
                </span>
              </div>
            </div>

            {/* Expanded Fee Details */}
            {isTotalDetailsOpen && (
              <div className="border-t border-stone-100 pt-2 space-y-1.5 text-xs text-stone-500 font-sans transition-all duration-300">
                <div className="flex justify-between">
                  <span>Cart Subtotal ({totalQty} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                {isFreeGiftUnlocked && (
                  <div className="flex justify-between text-purple-600">
                    <span>Free Pearl Mala Unlocked</span>
                    <span>₹0 (Saved ₹199)</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{isFreeShipping ? <span className="text-green-600 font-bold uppercase text-[10px]">FREE</span> : "₹99"}</span>
                </div>
              </div>
            )}

            {/* Buy Now Button */}
            <button className="w-full bg-[#2D1B10] hover:bg-black text-white font-bold text-sm tracking-[0.2em] uppercase h-14 rounded-xl transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
