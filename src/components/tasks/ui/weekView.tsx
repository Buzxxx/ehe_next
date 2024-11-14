/**
 * @path src/components/tasks/ui/weekView.tsx
 */
import React from "react"
import { format, isSameDay, isWithinInterval, isSameWeek } from "date-fns"
import { generateWeekDates, generateDayHours } from "../utils/dateUtils"

export default function WeekView({
  currentDate,
  events,
  onSlotClick,
}: {
  currentDate: Date
  events: any[]
  onSlotClick: (date: Date) => void
}) {
  const days = generateWeekDates(currentDate) // Generates the dates for the current week
  const hours = generateDayHours(currentDate) // Generates hourly intervals for each day

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow md:p-4 p-2">
      {/* Weekday Header with Date */}
      <div className="grid grid-cols-8 gap-1 mb-2 text-center">
        <span className="col-span-1 text-gray-500 font-medium text-sm md:text-base l">
          Time
        </span>
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className="text-gray-500 font-medium text-sm md:text-base "
          >
            {/* Display day name and date */}
            <span className="block md:hidden">
              {format(day, "EEE")[0]}
            </span>{" "}
            {/* Single letter on smaller screens */}
            <span className="hidden md:block">{format(day, "EEE")}</span>{" "}
            {/* Full name on medium screens and up */}
            <span className="block text-xs text-gray-400">
              {format(day, "MMM dd")}
            </span>{" "}
            {/* Date below day name */}
          </div>
        ))}
      </div>

      {/* Time Slots and Days Grid */}
      <div className="grid grid-cols-8 gap-1">
        {/* Time Column */}
        {hours.map((hour) => (
          <React.Fragment key={hour.toISOString()}>
            <div className="col-span-1 text-xs text-gray-500 px-1 py-2 text-center">
              {format(hour, "h aa")}
            </div>
            {/* Daily Time Slots */}
            {days.map((day) => (
              <div
                key={`${day.toISOString()}-${hour.toISOString()}`}
                onClick={() => onSlotClick(day)} // Trigger the modal when a box is clicked
                className={`border h-16 sm:h-20 p-1 rounded-lg relative 
                  ${
                    isSameWeek(day, currentDate) ? "bg-white" : "bg-gray-200/50"
                  }
                  ${
                    ["Sat", "Sun"].includes(format(day, "EEE"))
                      ? "bg-blue-50"
                      : ""
                  }
                `}
              >
                {/* Render events within the box */}
                {events
                  .filter(
                    (event) =>
                      isSameDay(event.start, day) &&
                      isWithinInterval(hour, {
                        start: event.start,
                        end: event.end,
                      })
                  )
                  .map((event) => (
                    <div
                      key={
                        event.id ||
                        `${event.title}-${event.start.toISOString()}`
                      }
                      className={`absolute top-1 left-1 ${event.color} text-white text-xs rounded-full px-2`}
                    >
                      {event.title}
                    </div>
                  ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
