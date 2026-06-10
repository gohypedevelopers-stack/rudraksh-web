const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
})

const shortDateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

const dateTimeFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

export function formatCurrency(value: string | number | bigint) {
  const numericValue = typeof value === "string" ? Number(value) : Number(value)
  return currencyFormatter.format(Number.isFinite(numericValue) ? numericValue : 0)
}

export function formatDate(value: string | Date) {
  return shortDateFormatter.format(new Date(value))
}

export function formatDateTime(value: string | Date) {
  return dateTimeFormatter.format(new Date(value))
}
