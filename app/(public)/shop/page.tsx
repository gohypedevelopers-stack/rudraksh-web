import ProductGrid from "@/components/Shop/ProductGrid";
import ShopHeroSection from "@/components/Shop/ShopHeroSection";
import { type ProductCardData } from "@/components/Shop/ProductCard";

const products: ProductCardData[] = [
  { name: "NIRAKAR", origin: "Origin: Nepal", img: "/nirakar.png" },
  { name: "1 MUKHI", origin: "Origin: Nepal", img: "/one_mukhi.png" },
  { name: "2 MUKHI", origin: "Origin: Nepal", img: "/nirakar.png" },
  { name: "3 MUKHI", origin: "Origin: Nepal", img: "/collector_bead.png" },
  { name: "4 MUKHI", origin: "Origin: Nepal", img: "/garbh_gauri.png" },
  { name: "5 MUKHI", origin: "Origin: Nepal", img: "/nirakar.png" },
  { name: "6 MUKHI", origin: "Origin: Nepal", img: "/fourteen_mukhi.png" },
  { name: "7 MUKHI", origin: "Origin: Nepal", img: "/one_mukhi.png" },
  { name: "9 MUKHI", origin: "Origin: Nepal", img: "/collector_bead.png" },
  { name: "10 MUKHI", origin: "Origin: Nepal", img: "/garbh_gauri.png" },
  { name: "12 MUKHI", origin: "Origin: Nepal", img: "/one_mukhi.png" },
  { name: "13 MUKHI", origin: "Origin: Nepal", img: "/collector_bead.png" },
  { name: "14 MUKHI", origin: "Origin: Nepal", img: "/fourteen_mukhi.png" },
  { name: "15 MUKHI", origin: "Origin: Nepal", img: "/garbh_gauri.png" },
  { name: "16 MUKHI", origin: "Origin: Nepal", img: "/nirakar.png" },
  { name: "17 MUKHI", origin: "Origin: Nepal", img: "/one_mukhi.png" },
  { name: "18 MUKHI", origin: "Origin: Nepal", img: "/collector_bead.png" },
  { name: "19 MUKHI", origin: "Origin: Nepal", img: "/garbh_gauri.png" },
  { name: "20 MUKHI", origin: "Origin: Nepal", img: "/nirakar.png" },
  { name: "21 MUKHI", origin: "Origin: Nepal", img: "/collector_bead.png" },
  { name: "GAURI SHANKAR", origin: "Origin: Nepal", img: "/gauri_shankar.png" },
  { name: "GANESH", origin: "Origin: Nepal", img: "/ganesh_rudraksha.png" },
  { name: "TRIJUTI", origin: "Origin: Nepal", img: "/trijuti.png" },
  { name: "SAWAR", origin: "Origin: Nepal", img: "/savar.png" },
  { name: "GARBH GAURI", origin: "Origin: Nepal", img: "/garbh_gauri.png" },
];

export default function ShopPage() {
  return (
    <main className="flex flex-col w-full bg-[#FCFBF7] text-zinc-900 overflow-hidden min-h-screen pt-20">
      <ShopHeroSection />
      <ProductGrid products={products} />
    </main>
  );
}
