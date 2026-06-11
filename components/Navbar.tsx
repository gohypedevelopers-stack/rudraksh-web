"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LogOut,
  Search, 
  ShoppingBag, 
  Menu, 
  UserRound,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { AuthUser } from "@/server/users/user.types";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [cartCount, setCartCount] = React.useState(2);
  const [authUser, setAuthUser] = React.useState<AuthUser | null>(null);

  React.useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem("rudraksha-cart");
        if (stored) {
          const items: Array<{ qty: number }> = JSON.parse(stored);
          const total = items.reduce((acc: number, item) => acc + item.qty, 0);
          setCartCount(total);
        } else {
          setCartCount(2); // seed value
        }
      } catch (e) {
        console.error(e);
      }
    };
    updateCount();
    window.addEventListener("open-cart", updateCount);
    window.addEventListener("add-to-cart", updateCount);
    return () => {
      window.removeEventListener("open-cart", updateCount);
      window.removeEventListener("add-to-cart", updateCount);
    };
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    let isMounted = true;

    const syncAuthState = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!response.ok) {
          if (isMounted) {
            setAuthUser(null);
          }
          return;
        }

        const data = (await response.json().catch(() => null)) as { user?: AuthUser } | null;

        if (isMounted) {
          setAuthUser(data?.user ?? null);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setAuthUser(null);
        }
      }
    };

    syncAuthState();
    window.addEventListener("auth-changed", syncAuthState);

    return () => {
      isMounted = false;
      window.removeEventListener("auth-changed", syncAuthState);
    };
  }, []);

  const isHomeActive = pathname === "/";
  const isShopActive = pathname === "/shop";
  const isAboutActive = pathname === "/about-us";
  const isContactActive = pathname === "/contact";

  const showDarkNavbar = isScrolled || pathname !== "/";

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setAuthUser(null);
      window.dispatchEvent(new Event("auth-changed"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-45 w-full transition-all duration-500 border-b",
          showDarkNavbar
            ? "bg-[#FCFBF7]/95 backdrop-blur-md border-zinc-200/80 py-3 shadow-xs text-zinc-900"
            : "bg-transparent border-transparent py-5 text-white"
        )}
      >
        <div className="w-full px-5 md:px-20 flex items-center justify-between">
          
          {/* Logo / Branding (Mandala + RUDRAKSHA + Subtitle) */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Sacred Geometry Mandala Outline SVG */}
            <svg 
              className={cn(
                "w-8 h-8 transition-transform duration-500 group-hover:rotate-45",
                showDarkNavbar ? "text-zinc-950" : "text-white"
              )}
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              {/* Outer dotted ring */}
              <circle cx="50" cy="50" r="46" strokeDasharray="3 3" opacity="0.4" />
              {/* Outer solid ring */}
              <circle cx="50" cy="50" r="41" opacity="0.7" />
              {/* Intersecting petals (8-point symmetry) */}
              <circle cx="50" cy="29" r="12" opacity="0.6" />
              <circle cx="50" cy="71" r="12" opacity="0.6" />
              <circle cx="29" cy="50" r="12" opacity="0.6" />
              <circle cx="71" cy="50" r="12" opacity="0.6" />
              <circle cx="35" cy="35" r="12" opacity="0.4" />
              <circle cx="65" cy="65" r="12" opacity="0.4" />
              <circle cx="35" cy="65" r="12" opacity="0.4" />
              <circle cx="65" cy="35" r="12" opacity="0.4" />
              {/* Inner core */}
              <circle cx="50" cy="50" r="8" fill="currentColor" />
            </svg>
            <div className="flex flex-col">
              <span className={cn(
                "font-serif text-[19px] font-bold tracking-[0.25em] leading-none transition-colors duration-500",
                showDarkNavbar ? "text-zinc-950" : "text-white"
              )}>
                RUDRAKSHA
              </span>
              <span className={cn(
                "text-[7.5px] tracking-[0.22em] font-sans font-bold uppercase mt-1 leading-none transition-colors duration-500",
                showDarkNavbar ? "text-zinc-500" : "text-zinc-400"
              )}>
                AUTHENTIC. RARE. POWERFUL.
              </span>
            </div>
          </Link>
 
          {/* Desktop Navigation (HOME, SHOP, ABOUT US, BENEFITS, GUIDE, CONTACT) */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu className="max-w-max">
              <NavigationMenuList className="gap-6">
                
                {/* HOME */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className={cn(
                        "relative text-[11px] font-bold tracking-[0.2em] uppercase transition-colors py-2 block hover:bg-transparent! focus:bg-transparent! active:bg-transparent! bg-transparent!",
                        showDarkNavbar 
                          ? (isHomeActive ? "text-zinc-950" : "text-zinc-600 hover:text-zinc-950")
                          : (isHomeActive ? "text-white" : "text-zinc-300 hover:text-white")
                      )}
                    >
                      HOME
                      {isHomeActive && (
                        <span className={cn(
                          "absolute bottom-0 left-0 w-full h-[2px] transition-colors duration-555",
                          showDarkNavbar ? "bg-zinc-950" : "bg-white"
                        )} />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
 
                {/* SHOP */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/shop"
                      className={cn(
                        "relative text-[11px] font-bold tracking-[0.2em] uppercase transition-colors py-2 block hover:bg-transparent! focus:bg-transparent! active:bg-transparent! bg-transparent!",
                        showDarkNavbar 
                          ? (isShopActive ? "text-zinc-950" : "text-zinc-600 hover:text-zinc-950")
                          : (isShopActive ? "text-white" : "text-zinc-300 hover:text-white")
                      )}
                    >
                      SHOP
                      {isShopActive && (
                        <span className={cn(
                          "absolute bottom-0 left-0 w-full h-[2px] transition-colors duration-555",
                          showDarkNavbar ? "bg-zinc-950" : "bg-white"
                        )} />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
 
                {/* ABOUT US */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about-us"
                      className={cn(
                        "relative text-[11px] font-bold tracking-[0.2em] uppercase transition-colors py-2 block hover:bg-transparent! focus:bg-transparent! active:bg-transparent! bg-transparent!",
                        showDarkNavbar 
                          ? (isAboutActive ? "text-zinc-950" : "text-zinc-650 hover:text-zinc-950")
                          : (isAboutActive ? "text-white" : "text-zinc-300 hover:text-white")
                      )}
                    >
                      ABOUT US
                      {isAboutActive && (
                        <span className={cn(
                          "absolute bottom-0 left-0 w-full h-[2px] transition-colors duration-555",
                          showDarkNavbar ? "bg-zinc-950" : "bg-white"
                        )} />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
 
                {/* CONTACT */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className={cn(
                        "relative text-[11px] font-bold tracking-[0.2em] uppercase transition-colors py-2 block hover:bg-transparent! focus:bg-transparent! active:bg-transparent! bg-transparent!",
                        showDarkNavbar 
                          ? (isContactActive ? "text-zinc-950" : "text-zinc-655 hover:text-zinc-950")
                          : (isContactActive ? "text-white" : "text-zinc-300 hover:text-white")
                      )}
                    >
                      CONTACT
                      {isContactActive && (
                        <span className={cn(
                          "absolute bottom-0 left-0 w-full h-[2px] transition-colors duration-555",
                          showDarkNavbar ? "bg-zinc-950" : "bg-white"
                        )} />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
 
              </NavigationMenuList>
            </NavigationMenu>
          </div>
 
          {/* Action Icons (Search, Profile, Cart, Hamburger) */}
          <div className="flex items-center gap-2 md:gap-5">
            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={cn(
                "cursor-pointer h-8 w-8 hover:bg-transparent!",
                showDarkNavbar ? "text-zinc-900 hover:text-amber-700" : "text-white hover:text-amber-400"
              )}
            >
              <Search className="w-[18px] h-[18px] stroke-[1.8]" />
              <span className="sr-only">Search</span>
            </Button>
 
            {/* Auth Icon */}
            {!authUser ? (
              <Button
                asChild
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 hover:bg-transparent!",
                  showDarkNavbar ? "text-zinc-900 hover:text-amber-700" : "text-white hover:text-amber-400"
                )}
              >
                <Link href="/login" aria-label="Login">
                  <UserRound className="w-[18px] h-[18px] stroke-[1.8]" />
                  <span className="sr-only">Login</span>
                </Link>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className={cn(
                  "h-8 w-8 hover:bg-transparent!",
                  showDarkNavbar ? "text-zinc-900 hover:text-amber-700" : "text-white hover:text-amber-400"
                )}
              >
                <LogOut className="w-[18px] h-[18px] stroke-[1.8]" />
                <span className="sr-only">Logout</span>
              </Button>
            )}
 
            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.dispatchEvent(new Event("open-cart"))}
              className={cn(
                "relative h-8 w-8 hover:bg-transparent! cursor-pointer",
                showDarkNavbar ? "text-zinc-900 hover:text-amber-700" : "text-white hover:text-amber-400"
              )}
            >
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.8]" />
              {cartCount > 0 && (
                <span className={cn(
                  "absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold transition-colors duration-500",
                  showDarkNavbar ? "bg-zinc-950 text-white" : "bg-white text-black"
                )}>
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
 
            {/* Mobile Hamburger menu */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 hover:bg-transparent!",
                      showDarkNavbar ? "text-zinc-900 hover:text-amber-700" : "text-white hover:text-amber-400"
                    )}
                  >
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Open Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] p-6 bg-white text-zinc-900 border-zinc-100">
                  <SheetHeader className="text-left border-b border-zinc-150 pb-4 mb-4">
                    <SheetTitle className="font-serif font-bold text-lg text-zinc-950 flex items-center gap-2">
                      🔱 RUDRAKSHA MENU
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-5 text-sm font-semibold tracking-wider uppercase">
                    <Link href="/" className="hover:text-amber-750 py-1.5 border-b border-zinc-100">
                      HOME
                    </Link>
                    <Link href="/shop" className="hover:text-amber-750 py-1.5 border-b border-zinc-100">
                      SHOP RUDRAKSHA
                    </Link>
                    <Link href="/pooja" className="hover:text-amber-750 py-1.5 border-b border-zinc-100">
                      POOJA ITEMS
                    </Link>
                    <Link href="/astro" className="hover:text-amber-750 py-1.5 border-b border-zinc-100">
                      ASTRO SERVICES
                    </Link>
                    <Link href="/about-us" className="hover:text-amber-750 py-1.5 border-b border-zinc-100">
                      ABOUT US
                    </Link>

                    <Link href="/contact" className="hover:text-amber-750 py-1.5 border-b border-zinc-100">
                      CONTACT
                    </Link>
                    {!authUser ? (
                      <Link href="/login" className="hover:text-amber-750 py-1.5 border-b border-zinc-100">
                        LOGIN
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-left hover:text-amber-750 py-1.5 border-b border-zinc-100 cursor-pointer"
                      >
                        LOGOUT
                      </button>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-24 px-4 transition-all duration-300">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-6 border border-zinc-100 animate-in fade-in-0 slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-zinc-900 tracking-wider text-sm uppercase">Search E-Store</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
                className="h-8 w-8 text-zinc-455 hover:text-zinc-950 hover:bg-transparent!"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search Nepali Rudraksha, Japa Malas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg outline-none focus:ring-1 focus:ring-amber-700 text-sm text-zinc-900"
                autoFocus
              />
            </div>
            <div className="mt-4">
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                Popular Searches:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {["5 Mukhi Mala", "Siddha Kavach", "Shree Yantra", "Ganesha Idol"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSearchQuery(item)}
                    className="text-xs bg-zinc-50 hover:bg-zinc-100 text-zinc-650 hover:text-zinc-900 px-3 py-1.5 rounded-md transition-colors font-medium border border-zinc-200"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
