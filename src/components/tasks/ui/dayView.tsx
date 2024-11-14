/**
 * @path src/components/tasks/ui/dayView.tsx
 */

import { format, isSameHour } from "date-fns"
import { generateDayHours } from "../utils/dateUtils"

export default function DayView({
  currentDate,
  events,
  onSlotClick,
}: {
  currentDate: Date
  events: any[]
  onSlotClick: (date: Date) => void
}) {
  const hours = generateDayHours(currentDate)

  return (
    <div className="flex flex-col border-l w-full mx-auto bg-white rounded-lg shadow p-4">
      {hours.map((hour) => (
        <div
          onClick={() => onSlotClick(hour)}
          key={hour.toISOString()}
          className="flex border-b h-16 items-center hover:bg-blue-50 cursor-pointer"
        >
          <span className="text-xs w-12 text-gray-500 px-2">
            {format(hour, "h aa")}
          </span>
          <div className="flex-grow p-2 border-l relative">
            {events
              .filter((event) => isSameHour(event.start, hour))
              .map((event) => (
                <div
                  key={
                    event.id || `${event.title}-${event.start.toISOString()}`
                  }
                  className={`absolute ${event.color} text-white text-sm font-medium rounded px-2`}
                >
                  {event.title}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
