import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { InventoryTable } from "@/components/Dashboard/InventoryTable"
import { getInventory, getInventoryStats } from "@/server/inventory/inventory.service"

export const dynamic = "force-dynamic"

export default async function InventoryPage() {
  const [inventory, stats] = await Promise.all([
    getInventory(),
    getInventoryStats(),
  ])

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
              <BreadcrumbPage>Inventory</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <Badge variant="outline" className="border-black/10 bg-white text-zinc-700">
            {stats.totalSkus} records
          </Badge>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <InventoryTable inventory={inventory} stats={stats} />
      </div>
    </SidebarInset>
  )
}
