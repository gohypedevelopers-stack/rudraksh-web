"use client"

import type { ComponentProps } from "react"
import {
  Boxes,
  LayoutDashboard,
  Package,
  ReceiptText,
  ShieldCheck,
  Users,
} from "lucide-react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import type { AuthUser } from "@/server/users/user.types"

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Boxes,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ReceiptText,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
]

export function AppSidebar({
  user,
  ...props
}: ComponentProps<typeof Sidebar> & { user: AuthUser }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/70 px-4 py-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
            <ShieldCheck className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm font-semibold tracking-[0.24em] text-sidebar-foreground uppercase">
              RudraLaksh
            </span>
            <span className="text-[10px] font-medium tracking-[0.22em] text-sidebar-foreground/60 uppercase">
              Admin Console
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/70">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
