import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Separator,
} from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { ProductTable } from "@/components/Dashboard/ProductTable"
import { getProductStats, getProducts } from "@/server/products/product.service"

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
  const [products, stats] = await Promise.all([getProducts(), getProductStats()])

  return (
    <SidebarInset className="bg-[#f6f2ea]">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-black/5 bg-[#f6f2ea]/90 px-4 backdrop-blur md:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-1 h-5" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <Badge variant="outline" className="border-black/10 bg-white text-zinc-700">
            {stats.totalCatalog} catalog items
          </Badge>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <ProductTable products={products} stats={stats} />
      </div>
    </SidebarInset>
  )
}
