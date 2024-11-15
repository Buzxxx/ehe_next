/**
 * @path src/components/propertyPage/features/propertyObject.ts
 */

import { format, addDays } from "date-fns"

export function generateMockSlots(daysCount: number): string[] {
  const times = ["11:00 AM", "3:00 PM", "5:00 PM"]
  const date = new Date()
  const slots = Array.from({ length: daysCount }, (_, i) => {
    const newDate = new Date(date.getTime() + i * 1000 * 60 * 60 * 24)
    const randomTime = times[Math.floor(Math.random() * times.length)]
    return `${format(newDate, "EEEE, MMMM d")} at ${randomTime}`
  })

  return slots
}

export const formatDate = (date?: Date | string | null): string => {
  if (!date) return "your selected date"

  if (date instanceof Date) {
    // Format Date object as "Wednesday, October 30"
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  // If it's a string, try to parse the date part and format it accordingly
  const dateParts = date.split(" at")[0] // Split at "at" to remove time if present
  return dateParts
}
