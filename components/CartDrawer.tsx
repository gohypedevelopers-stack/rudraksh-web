"use client";

import * as React from "react";
import { X, ChevronRight, Plus, Minus, ChevronDown, ChevronUp, ArrowLeft, Check, CreditCard, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
  const [step, setStep] = React.useState(0); // 0: Cart, 1: Address, 2: Summary, 3: Payment
  const [checkoutMode, setCheckoutMode] = React.useState<"cart" | "direct">("cart");
  const [directItem, setDirectItem] = React.useState<CartItem | null>(null);
  
  // Form States
  const [address, setAddress] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [paymentMethod, setPaymentMethod] = React.useState("online"); // 'online' or 'cod'

  const [cartItems, setCartItems] = React.useState<CartItem[]>([
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
  ]);
  const [isTotalDetailsOpen, setIsTotalDetailsOpen] = React.useState(false);

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
    const handleOpenCart = () => {
      loadCart();
      setCheckoutMode("cart");
      setIsOpen(true);
      if (step > 0) setStep(0);
    };

    const handleAddItem = (e: CustomEvent<Omit<CartItem, "qty">>) => {
      try {
        const stored = localStorage.getItem("rudraksha-cart");
        const current: CartItem[] = stored ? JSON.parse(stored) : [];
        const existingIdx = current.findIndex((item) => item.id === e.detail.id);
        if (existingIdx > -1) {
          current[existingIdx].qty += 1;
        } else {
          current.push({ ...e.detail, qty: 1 });
        }
        localStorage.setItem("rudraksha-cart", JSON.stringify(current));
        setCartItems(current);
        setCheckoutMode("cart");
        setIsOpen(true);
        if (step > 0) setStep(0);
      } catch (err) {
        console.error(err);
      }
    };

    const handleBuyNow = (e: CustomEvent<Omit<CartItem, "qty">>) => {
      try {
        setDirectItem({ ...e.detail, qty: 1 });
        setCheckoutMode("direct");
        setIsOpen(true);
        setStep(1); // Go straight to checkout address form
      } catch (err) {
        console.error(err);
      }
    };

    window.addEventListener("open-cart", handleOpenCart);
    window.addEventListener("add-to-cart", handleAddItem as EventListener);
    window.addEventListener("buy-now", handleBuyNow as EventListener);

    return () => {
      window.removeEventListener("open-cart", handleOpenCart);
      window.removeEventListener("add-to-cart", handleAddItem as EventListener);
      window.removeEventListener("buy-now", handleBuyNow as EventListener);
    };
  }, [step]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Calculations
  const activeItems = checkoutMode === "direct" && directItem ? [directItem] : cartItems;
  const subtotal = activeItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const originalSubtotal = activeItems.reduce((acc, item) => acc + item.oldPrice * item.qty, 0);
  const totalQty = activeItems.reduce((acc, item) => acc + item.qty, 0);

  const isFreeGiftUnlocked = subtotal >= 999;
  const isFreeShipping = subtotal >= 999;
  const shippingFee = isFreeShipping ? 0 : 99;

  const finalPrice = subtotal + shippingFee;
  const finalOldPrice = originalSubtotal + (isFreeGiftUnlocked ? 199 : 0);

  const steps = [
    { id: 1, name: "Address" },
    { id: 2, name: "Summary" },
    { id: 3, name: "Payment" }
  ];

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-55 w-full max-w-[460px] bg-[#FCFBF7] shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col justify-between text-zinc-900 font-sans",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-stone-750" />
              </button>
            ) : (
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5 text-stone-750" />
              </button>
            )}
            <h2 className="font-serif text-lg font-bold text-stone-900">
              {step === 0 ? `Shopping Bag (${totalQty})` : "Checkout"}
            </h2>
          </div>
        </div>

        {/* Progress Bar (Only visible during checkout) */}
        {step > 0 && (
          <div className="bg-white px-6 py-4 border-b border-stone-200">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-stone-200 -z-10" />
              {steps.map((s) => {
                const isActive = step === s.id;
                const isCompleted = step > s.id;
                return (
                  <div key={s.id} className="flex flex-col items-center gap-2 bg-white px-2">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors",
                        isActive ? "bg-[#1c1917] text-white ring-4 ring-stone-200" : 
                        isCompleted ? "bg-[#1c1917] text-white" : "bg-stone-100 text-stone-400 border border-stone-300"
                      )}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.id}
                    </div>
                    <span className={cn(
                      "text-[10px] uppercase tracking-wider font-bold",
                      isActive ? "text-[#1c1917]" : isCompleted ? "text-stone-800" : "text-stone-400"
                    )}>
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-4">
          
          {/* STEP 0: CART */}
          {step === 0 && (
            <div className="space-y-4 h-full flex flex-col">
              {totalQty === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 h-full min-h-[300px] text-center px-4 pt-10">
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">Your cart is empty</h3>
                  <p className="text-stone-500 text-sm font-sans">Looks like you haven't added anything yet.</p>
                </div>
              ) : (
              <div className="px-4 space-y-3 pt-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white border border-stone-180 rounded-2xl p-4 flex gap-4 items-center">
                    <div className="relative w-20 h-20 bg-stone-50 rounded-xl overflow-hidden border border-stone-200/60 flex items-center justify-center p-2.5">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute top-1.5 left-1.5 bg-[#14532D] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                        {item.discount}
                      </span>
                    </div>

                    <div className="flex-1 text-left flex flex-col justify-between h-20 py-0.5">
                      <div>
                        <h4 className="font-serif text-xs sm:text-sm font-bold text-stone-900 leading-snug truncate max-w-[190px]">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-stone-400 block mt-0.5">
                          {item.subtitle || "Authentic Nepalese Bead"}
                        </span>
                      </div>

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
              </div>
              )}
            </div>
          )}

          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <div className="p-5 space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">Delivery Details</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-wide text-stone-700">Full Name *</label>
                  <input required name="fullName" value={address.fullName} onChange={handleInputChange} type="text" className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-[#8c4f1c]/50 transition-colors" placeholder="Enter full name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold tracking-wide text-stone-700">Phone *</label>
                    <input required name="phone" value={address.phone} onChange={handleInputChange} type="tel" className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-[#8c4f1c]/50 transition-colors" placeholder="10-digit number" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold tracking-wide text-stone-700">PIN Code *</label>
                    <input required name="pincode" value={address.pincode} onChange={handleInputChange} type="text" className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-[#8c4f1c]/50 transition-colors" placeholder="e.g. 110001" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-wide text-stone-700">Email Address *</label>
                  <input required name="email" value={address.email} onChange={handleInputChange} type="email" className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-[#8c4f1c]/50 transition-colors" placeholder="For order updates" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-wide text-stone-700">Address (House No, Building, Street) *</label>
                  <input required name="addressLine" value={address.addressLine} onChange={handleInputChange} type="text" className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-[#8c4f1c]/50 transition-colors" placeholder="Complete address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold tracking-wide text-stone-700">City *</label>
                    <input required name="city" value={address.city} onChange={handleInputChange} type="text" className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-[#8c4f1c]/50 transition-colors" placeholder="City" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold tracking-wide text-stone-700">State *</label>
                    <input required name="state" value={address.state} onChange={handleInputChange} type="text" className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-[#8c4f1c]/50 transition-colors" placeholder="State" />
                  </div>
                </div>
                
                {/* Hidden submit button to allow enter key submission */}
                <button type="submit" className="hidden" id="submit-address" />
              </form>
            </div>
          )}

          {/* STEP 2: ORDER SUMMARY */}
          {step === 2 && (
            <div className="p-5 space-y-5">
              <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-stone-900 text-sm">Delivery Address</h3>
                  <button onClick={() => setStep(1)} className="text-[#8c4f1c] text-xs font-bold uppercase hover:underline">Edit</button>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">
                  <span className="font-semibold text-stone-800">{address.fullName || "John Doe"}</span><br />
                  {address.addressLine || "123 Main Street"}<br />
                  {address.city || "New Delhi"}, {address.state || "Delhi"} - {address.pincode || "110001"}<br />
                  Phone: {address.phone || "+91 9876543210"}
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-stone-900 text-sm mb-3">Items in Order ({totalQty})</h3>
                <div className="space-y-3">
                  {activeItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-stone-50 rounded-lg overflow-hidden border border-stone-100 flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-stone-800 truncate max-w-[180px]">{item.name}</h4>
                        <span className="text-[10px] text-stone-500">Qty: {item.qty}</span>
                      </div>
                      <span className="text-xs font-bold">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <div className="p-5 space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">Payment Method</h3>
              
              <div className="space-y-3">
                <label className={cn(
                  "flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-colors",
                  paymentMethod === "online" ? "border-[#c3a267] bg-[#f4ebd9]/30" : "border-stone-200 bg-white hover:border-stone-300"
                )}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="online" 
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="mt-1 w-4 h-4 text-[#c3a267] accent-[#c3a267]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#8c4f1c]" /> Pay Online
                      </h4>
                      <div className="flex gap-1">
                        <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded">EXTRA 5% OFF</span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">Pay securely via UPI, Credit/Debit Card, or Netbanking.</p>
                  </div>
                </label>

                <label className={cn(
                  "flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-colors",
                  paymentMethod === "cod" ? "border-[#c3a267] bg-[#f4ebd9]/30" : "border-stone-200 bg-white hover:border-stone-300"
                )}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 w-4 h-4 text-[#c3a267] accent-[#c3a267]"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-[#8c4f1c]" /> Cash on Delivery (COD)
                    </h4>
                    <p className="text-xs text-stone-500 mt-1">Pay when your order is delivered to your doorstep.</p>
                  </div>
                </label>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Panel */}
        <div className="border-t border-stone-200 bg-white">
          <div className="p-4 flex flex-col gap-3">
            {totalQty > 0 && (
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setIsTotalDetailsOpen(!isTotalDetailsOpen)}
                  className="flex items-center gap-1 text-xs font-bold text-stone-500 tracking-wider hover:text-stone-800 cursor-pointer"
                >
                  <span>Estimated Total</span>
                  {isTotalDetailsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                </button>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-stone-400 line-through text-xs font-sans">
                    ₹{finalOldPrice}
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-stone-900 font-sans">
                    ₹{paymentMethod === "online" && step === 3 ? Math.floor(finalPrice * 0.95) : finalPrice}
                  </span>
                </div>
              </div>
            )}

            {totalQty > 0 && isTotalDetailsOpen && (
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
                {paymentMethod === "online" && step === 3 && (
                  <div className="flex justify-between text-green-600 font-bold">
                    <span>Prepaid Discount (5%)</span>
                    <span>-₹{Math.floor(finalPrice * 0.05)}</span>
                  </div>
                )}
              </div>
            )}

            {step === 0 && (
              totalQty === 0 ? (
                <Link href="/shop" onClick={() => setIsOpen(false)} className="w-full">
                  <button className="w-full bg-[#1c1917] hover:bg-black text-white font-bold text-sm tracking-[0.2em] uppercase h-14 rounded-xl transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center">
                    Shop Now
                  </button>
                </Link>
              ) : (
                <button 
                  onClick={() => {
                    setCheckoutMode("cart");
                    setStep(1);
                  }}
                  className="w-full bg-[#1c1917] hover:bg-black text-white font-bold text-sm tracking-[0.2em] uppercase h-14 rounded-xl transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center"
                >
                  Proceed to Checkout
                </button>
              )
            )}

            {step === 1 && (
              <button 
                onClick={() => {
                  document.getElementById("submit-address")?.click();
                }}
                className="w-full bg-[#1c1917] hover:bg-black text-white font-bold text-xs tracking-[0.2em] uppercase h-14 rounded-xl transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center"
              >
                Continue to Summary
              </button>
            )}

            {step === 2 && (
              <button 
                onClick={() => setStep(3)}
                className="w-full bg-[#1c1917] hover:bg-black text-white font-bold text-xs tracking-[0.2em] uppercase h-14 rounded-xl transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center"
              >
                Proceed to Payment
              </button>
            )}

            {step === 3 && (
              <button 
                onClick={() => {
                  alert("Order Placed Successfully!");
                  setStep(0);
                  setIsOpen(false);
                }}
                className="w-full bg-[#1c1917] hover:bg-black text-white font-bold text-xs tracking-[0.2em] uppercase h-14 rounded-xl transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center"
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
