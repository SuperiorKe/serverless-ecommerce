export function formatPrice(price: string | number): string {
  const amount = typeof price === 'string' ? parseFloat(price) : price
  return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` 
}

export function formatDiscount(original: string, current: string): number {
  const orig = parseFloat(original)
  const curr = parseFloat(current)
  return Math.round(((orig - curr) / orig) * 100)
}