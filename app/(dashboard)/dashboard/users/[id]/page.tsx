import Link from "next/link"
import { notFound } from "next/navigation"

import { UserOrdersTable } from "@/components/Dashboard/UserOrdersTable"
import { UserRoleSelect } from "@/components/Dashboard/UserRoleSelect"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { formatCurrency, formatDateTime } from "@/lib/format"
import { getAdminCount, getUserByIdWithOrders } from "@/server/users/user.service"

export const dynamic = "force-dynamic"

type UserDetailPageProps = {
  params: Promise<{ id: string }> | { id: string }
}

function getRoleBadgeClass(role: string) {
  switch (role) {
    case "ADMIN":
      return "border-sky-200 bg-sky-50 text-sky-700"
    case "USER":
      return "border-emerald-200 bg-emerald-50 text-emerald-700"
    default:
      return "border-zinc-200 bg-zinc-50 text-zinc-600"
  }
}

function getInitials(name: string | null, email: string) {
  const normalizedName = name?.trim() ?? ""
  const parts =
    normalizedName.length > 0
      ? normalizedName.split(/\s+/).filter(Boolean)
      : []

  if (parts.length > 0) {
    return parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("")
  }

  return email.slice(0, 2).toUpperCase()
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params
  const [user, adminCount] = await Promise.all([
    getUserByIdWithOrders(id),
    getAdminCount(),
  ])

  if (!user) {
    notFound()
  }

  const canDemoteAdmin = adminCount > 1
  const displayName = user.name ?? user.email

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
              <BreadcrumbLink href="/dashboard/users">Users</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{displayName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <Badge variant="outline" className="border-black/10 bg-white text-zinc-700">
            {user.ordersCount} orders
          </Badge>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="space-y-4 border-b border-black/5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <Avatar className="size-14 rounded-3xl ring-1 ring-black/5">
                    <AvatarFallback className="rounded-3xl bg-sidebar-primary/10 text-sidebar-primary">
                      {getInitials(user.name, user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <CardDescription>User profile</CardDescription>
                    <CardTitle className="truncate text-3xl">{displayName}</CardTitle>
                    <p className="mt-1 truncate text-sm text-zinc-500">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                    getRoleBadgeClass(user.role),
                  )}
                >
                  {user.role}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 p-6">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-black/5 bg-[#faf8f2] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Orders
                  </p>
                  <p className="mt-2 text-2xl font-semibold tabular-nums text-zinc-950">
                    {user.ordersCount}
                  </p>
                </div>
                <div className="rounded-2xl border border-black/5 bg-[#faf8f2] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Total spent
                  </p>
                  <p className="mt-2 text-2xl font-semibold tabular-nums text-zinc-950">
                    {formatCurrency(user.totalSpent)}
                  </p>
                </div>
                <div className="rounded-2xl border border-black/5 bg-[#faf8f2] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Joined
                  </p>
                  <p className="mt-2 text-lg font-medium text-zinc-950">
                    {formatDateTime(user.createdAt)}
                  </p>
                </div>
                <div className="rounded-2xl border border-black/5 bg-[#faf8f2] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Last order
                  </p>
                  <p className="mt-2 text-lg font-medium text-zinc-950">
                    {user.latestOrderDate
                      ? formatDateTime(user.latestOrderDate)
                      : "No orders yet"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <UserRoleSelect
                  userId={user.id}
                  userLabel={displayName}
                  role={user.role}
                  canDemoteAdmin={canDemoteAdmin}
                  className="w-full sm:w-44"
                />
                <Link
                  href="/dashboard/users"
                  className="inline-flex h-10 w-full items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50 sm:w-auto"
                >
                  Back to users
                </Link>
              </div>

              {user.role === "ADMIN" && !canDemoteAdmin ? (
                <p className="text-sm text-zinc-500">
                  This is the last admin account, so role changes are locked until
                  another admin exists.
                </p>
              ) : null}
            </CardContent>
          </Card>

          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="space-y-1 border-b border-black/5">
              <CardTitle>Account timeline</CardTitle>
              <CardDescription>
                The latest timestamps and account health for this profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 p-6 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-black/5 bg-[#faf8f2] p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Updated
                </p>
                <p className="mt-2 text-lg font-medium text-zinc-950">
                  {formatDateTime(user.updatedAt)}
                </p>
              </div>
              <div className="rounded-2xl border border-black/5 bg-[#faf8f2] p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Role
                </p>
                <p className="mt-2 text-lg font-medium text-zinc-950">
                  {user.role}
                </p>
              </div>
              <div className="rounded-2xl border border-black/5 bg-[#faf8f2] p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                  User ID
                </p>
                <p className="mt-2 break-all text-sm font-medium text-zinc-950">
                  {user.id}
                </p>
              </div>
              <div className="rounded-2xl border border-black/5 bg-[#faf8f2] p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Admin coverage
                </p>
                <p className="mt-2 text-lg font-medium text-zinc-950">
                  {adminCount} admin{adminCount === 1 ? "" : "s"}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <UserOrdersTable orders={user.orders} />
      </div>
    </SidebarInset>
  )
}
