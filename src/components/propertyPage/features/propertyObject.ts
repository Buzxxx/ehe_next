/**
 * @path src/components/propertyPage/features/propertyObject.ts
 */

import { format, addDays } from "date-fns"

export function generateMockSlots(daysCount: number): string[] {
  const times = ["11:00 AM", "3:00 PM", "5:00 PM"]
  const slots: string[] = []

    for (let i = 1; i <= daysCount; i++) {
      const date = addDays(new Date(), i)
      const formattedDate = format(date, "EEEE MMMM d")
      const randomTime = times[Math.floor(Math.random() * times.length)]
      slots.push(`${formattedDate} at ${randomTime}`)
    }

  return slots
}
