const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatPrice(value) {
  if (value === undefined || value === null || Number(value) <= 0) {
    return 'Best Price on Order'
  }
  return inrFormatter.format(Number(value))
}

export function formatWeight(value) {
  if (value === undefined || value === null) return '—'
  return `${Number(value).toFixed(2)} g`
}
