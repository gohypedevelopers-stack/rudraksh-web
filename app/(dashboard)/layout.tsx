import type { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/sonner"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { getAuthUserFromCookieStore } from "@/server/auth/auth.cookies"
import { getCurrentUser } from "@/server/auth/auth.service"

export const metadata: Metadata = {
  title: "Dashboard | RudraLaksh",
  description: "Internal dashboard for RudraLaksh store operations.",
}

export const dynamic = "force-dynamic"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const session = getAuthUserFromCookieStore(cookieStore)

  if (!session) {
    redirect("/login")
  }

  const user = await getCurrentUser(session.id)

  if (!user) {
    redirect("/login")
  }

  if (user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <AppSidebar user={user} />
        {children}
        <Toaster position="top-right" richColors closeButton />
      </SidebarProvider>
    </TooltipProvider>
  )
}
