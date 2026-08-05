export function formatDateToYYYYMMDD(date: Date): string {
  return date.toISOString().substring(0, 10)
}

/** Local timezone YYYY-MM-DD (avoids UTC day shift). */
export function formatDateToLocalYYYYMMDD(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
