import Link from "next/link"

import { UserRoleSelect } from "@/components/Dashboard/UserRoleSelect"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { AdminUserDTO, UserStats } from "@/lib/dashboard-types"
import { formatCurrency, formatDate } from "@/lib/format"
import { cn } from "@/lib/utils"

type UserTableProps = {
  users: AdminUserDTO[]
  stats: UserStats
}

function getInitials(user: AdminUserDTO) {
  const normalizedName = user.name?.trim() ?? ""
  const nameParts = normalizedName.length > 0 ? normalizedName.split(/\s+/).filter(Boolean) : []

  if (nameParts.length > 0) {
    return nameParts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("")
  }

  return user.email.slice(0, 2).toUpperCase()
}

function getRoleBadgeClass(role: AdminUserDTO["role"]) {
  switch (role) {
    case "ADMIN":
      return "border-sky-200 bg-sky-50 text-sky-700"
    case "USER":
      return "border-emerald-200 bg-emerald-50 text-emerald-700"
    default:
      return "border-zinc-200 bg-zinc-50 text-zinc-600"
  }
}

export function UserTable({ users, stats }: UserTableProps) {
  const canDemoteAdmin = stats.adminUsers > 1

  return (
    <Card className="border-black/5 bg-white/90 shadow-sm">
      <CardHeader className="space-y-1 border-b border-black/5">
        <CardTitle>Registered users</CardTitle>
        <CardDescription>
          See every registered account and review their order history.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Total users</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {stats.totalUsers}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-zinc-500">
              {stats.newUsersThisMonth} joined this month.
            </CardContent>
          </Card>
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Admin users</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {stats.adminUsers}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-zinc-500">
              Privileged accounts with dashboard access.
            </CardContent>
          </Card>
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Customer users</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {stats.customerUsers}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-zinc-500">
              Standard shopping accounts.
            </CardContent>
          </Card>
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Users with orders</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {stats.usersWithOrders}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-zinc-500">
              Accounts that have placed at least one order.
            </CardContent>
          </Card>
        </div>

        {users.length === 0 ? (
          <div className="px-4 pb-4 md:px-6 md:pb-6">
            <Empty className="border-border/70 bg-muted/20">
              <EmptyHeader>
                <EmptyTitle>No users found.</EmptyTitle>
                <EmptyDescription>
                  New accounts will appear here automatically from the database.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <p className="text-sm text-muted-foreground">
                  No user records are available yet.
                </p>
              </EmptyContent>
            </Empty>
          </div>
        ) : (
          <>
            <div className="md:hidden">
              <div className="space-y-4 px-4 pb-4">
                {users.map((user) => (
                  <article
                    key={user.id}
                    className="rounded-2xl border border-black/5 bg-[#faf8f2] p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-11 w-11 rounded-2xl ring-1 ring-black/5">
                        <AvatarFallback className="rounded-2xl bg-sidebar-primary/10 text-sidebar-primary">
                          {getInitials(user)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate font-medium text-zinc-950">
                            {user.name ?? "Unnamed user"}
                          </p>
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
                        <p className="truncate text-sm text-zinc-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl border border-black/5 bg-white px-3 py-2">
                        <p className="text-xs text-zinc-500">Orders</p>
                        <p className="mt-1 font-medium text-zinc-950">
                          {user.ordersCount}
                        </p>
                      </div>
                      <div className="rounded-xl border border-black/5 bg-white px-3 py-2">
                        <p className="text-xs text-zinc-500">Total spent</p>
                        <p className="mt-1 font-medium text-zinc-950">
                          {formatCurrency(user.totalSpent)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-black/5 bg-white px-3 py-2">
                        <p className="text-xs text-zinc-500">Joined</p>
                        <p className="mt-1 font-medium text-zinc-950">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-black/5 bg-white px-3 py-2">
                        <p className="text-xs text-zinc-500">Latest order</p>
                        <p className="mt-1 font-medium text-zinc-950">
                          {user.latestOrderDate
                            ? formatDate(user.latestOrderDate)
                            : "No orders yet"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <Link
                        href={`/dashboard/users/${user.id}`}
                        className="inline-flex h-10 w-full items-center justify-center rounded-full border border-black/10 bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                      >
                        View Orders
                      </Link>
                      <UserRoleSelect
                        userId={user.id}
                        userLabel={user.name ?? user.email}
                        role={user.role}
                        canDemoteAdmin={canDemoteAdmin}
                        className="w-full"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <div className="px-6 pb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Latest Order</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="align-top">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 rounded-2xl ring-1 ring-black/5">
                              <AvatarFallback className="rounded-2xl bg-sidebar-primary/10 text-sidebar-primary">
                                {getInitials(user)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-zinc-950">
                                {user.name ?? "Unnamed user"}
                              </p>
                              <p className="truncate text-xs text-zinc-500">
                                {user.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="align-top text-zinc-600">
                          {user.email}
                        </TableCell>
                        <TableCell className="align-top">
                          <Badge
                            variant="outline"
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                              getRoleBadgeClass(user.role),
                            )}
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="align-top tabular-nums font-medium">
                          {user.ordersCount}
                        </TableCell>
                        <TableCell className="align-top tabular-nums font-medium">
                          {formatCurrency(user.totalSpent)}
                        </TableCell>
                        <TableCell className="align-top text-zinc-500">
                          {formatDate(user.createdAt)}
                        </TableCell>
                        <TableCell className="align-top text-zinc-500">
                          {user.latestOrderDate
                            ? formatDate(user.latestOrderDate)
                            : "No orders yet"}
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="flex flex-col items-end gap-2">
                            <Link
                              href={`/dashboard/users/${user.id}`}
                              className="inline-flex h-8 items-center justify-center rounded-md border border-black/10 bg-white px-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50"
                            >
                              View Orders
                            </Link>
                            <UserRoleSelect
                              userId={user.id}
                              userLabel={user.name ?? user.email}
                              role={user.role}
                              canDemoteAdmin={canDemoteAdmin}
                              className="w-40"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
