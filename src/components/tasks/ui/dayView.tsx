// components/DayView.js
import React from "react"
import { format, isWithinInterval } from "date-fns"
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
    <div className="flex flex-col border-l">
      {/* Display the selected day at the top */}
      <div className="p-4 bg-blue-100 text-center text-lg font-semibold text-blue-700">
        {format(currentDate, "EEEE, MMMM dd, yyyy")}
      </div>

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
              .filter((event) =>
                isWithinInterval(hour, { start: event.start, end: event.end })
              )
              .map((event) => (
                <div
                  key={event.id}
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
