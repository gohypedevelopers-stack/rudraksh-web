"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { readApiError } from "@/components/Dashboard/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import type { UserRole } from "@/lib/dashboard-types"

const roleLabels: Record<UserRole, string> = {
  USER: "User",
  ADMIN: "Admin",
}

type UserRoleSelectProps = {
  userId: string
  userLabel: string
  role: UserRole
  canDemoteAdmin?: boolean
  className?: string
}

export function UserRoleSelect({
  userId,
  userLabel,
  role,
  canDemoteAdmin = true,
  className,
}: UserRoleSelectProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const isAdminProtected = role === "ADMIN" && !canDemoteAdmin

  async function handleChange(nextRole: UserRole) {
    if (nextRole === role) {
      return
    }

    setIsSubmitting(true)
    const loadingToast = toast.loading("Saving user role…")

    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: nextRole,
        }),
      })

      if (!response.ok) {
        const message = await readApiError(
          response,
          "Unable to save the user role.",
        )

        if (response.status === 401) {
          toast.dismiss(loadingToast)
          router.replace("/login")
          return
        }

        if (response.status === 403) {
          toast.dismiss(loadingToast)
          router.replace("/")
          return
        }

        throw new Error(message)
      }

      toast.success("User role updated.", {
        id: loadingToast,
      })
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to save the user role.",
        {
          id: loadingToast,
        },
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Select
      value={role}
      disabled={isSubmitting || isAdminProtected}
      aria-label={`Change role for ${userLabel}`}
      onValueChange={(value) => handleChange(value as UserRole)}
    >
      <SelectTrigger size="sm" className={className}>
        {isSubmitting && <Spinner className="mr-1.5 size-3.5" />}
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USER" disabled={isAdminProtected && role === "ADMIN"}>
          {roleLabels.USER}
        </SelectItem>
        <SelectItem value="ADMIN">{roleLabels.ADMIN}</SelectItem>
      </SelectContent>
    </Select>
  )
}
