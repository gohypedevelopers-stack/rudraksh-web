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
import {
  orderStatusValues,
  type OrderStatus,
} from "@/lib/dashboard-types"

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
}

type OrderStatusSelectProps = {
  orderId: string
  status: OrderStatus
}

export function OrderStatusSelect({ orderId, status }: OrderStatusSelectProps) {
  const router = useRouter()
  const [currentStatus, setCurrentStatus] = React.useState<OrderStatus>(status)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  async function handleChange(nextStatus: OrderStatus) {
    const previousStatus = currentStatus
    setCurrentStatus(nextStatus)
    setIsSubmitting(true)
    const loadingToast = toast.loading("Saving order status…")

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: nextStatus,
        }),
      })

      if (!response.ok) {
        const message = await readApiError(
          response,
          "Unable to save order status.",
        )

        if (response.status === 401) {
          router.replace("/login")
          return
        }

        if (response.status === 403) {
          router.replace("/")
          return
        }

        throw new Error(message)
      }

      toast.success("Order status saved.", {
        id: loadingToast,
      })
      router.refresh()
    } catch (error) {
      setCurrentStatus(previousStatus)
      toast.error(
        error instanceof Error ? error.message : "Unable to save order status.",
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
      value={currentStatus}
      disabled={isSubmitting}
      aria-label={`Update status for order ${orderId}`}
      onValueChange={(value) => handleChange(value as OrderStatus)}
    >
      <SelectTrigger size="sm" className="w-40">
        {isSubmitting && <Spinner className="mr-1.5 size-3.5" />}
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {orderStatusValues.map((value) => (
          <SelectItem key={value} value={value}>
            {statusLabels[value]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
