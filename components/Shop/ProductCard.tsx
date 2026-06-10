import Link from "next/link";

export interface ProductCardData {
  name: string;
  origin: string;
  img: string;
}

interface ProductCardProps {
  item: ProductCardData;
  href: string;
}

export default function ProductCard({ item, href }: ProductCardProps) {
  return (
    <Link
      href={href}
      className="bg-white border border-stone-200/50 rounded-[28px] p-5 sm:p-6 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-[#c3a267]/25 transition-all duration-300 group cursor-pointer"
    >
      <div className="relative group/circle flex items-center justify-center mb-4">
        <div className="absolute inset-0 rounded-full border border-[#c3a267]/50 group-hover/circle:scale-[1.04] transition-transform duration-300 pointer-events-none" />
        <div className="m-1 rounded-full overflow-hidden aspect-square w-24 h-24 sm:w-28 sm:h-28 border border-zinc-200/40 relative z-10 bg-white">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover/circle:scale-105" />
        </div>
      </div>

      <h3 className="font-serif text-sm sm:text-base md:text-lg text-stone-900 font-semibold tracking-wide uppercase mt-1 group-hover:text-[#c3a267] transition-colors duration-200">
        {item.name}
      </h3>

      <span className="text-[10px] sm:text-xs text-stone-500 tracking-wide font-sans mt-1.5 block">
        {item.origin}
      </span>

      <div className="border border-black text-black group-hover:bg-black group-hover:text-white transition-all duration-300 text-[10px] sm:text-xs tracking-wider px-5 py-1.5 rounded-full font-bold mt-5 uppercase">
        Shop Now
      </div>
    </Link>
  );
}
