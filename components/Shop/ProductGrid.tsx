import ProductCard, { type ProductCardData } from "./ProductCard";

interface ProductGridProps {
  products: ProductCardData[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="py-16 md:py-24 bg-[#FCFBF7]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 max-w-7xl mx-auto">
          {products.map((item) => {
            const slug = item.name.toLowerCase().replace(/ /g, "-");
            return <ProductCard key={item.name} item={item} href={`/rudraksha/${slug}`} />;
          })}
        </div>
      </div>
    </section>
  );
}
