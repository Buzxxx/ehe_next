/**
 * @path src/components/tasks/ui/weekView.tsx
 */

import React from "react"
import { format, isSameDay } from "date-fns"
import { generateWeekDates, generateDayHours } from "../utils/dateUtils"
import { Event } from "../noSql/events"

export default function WeekView({
  currentDate,
  events,
  onSlotClick,
  handleEventClick,
}: {
  currentDate: Date
  events: Event[]
  onSlotClick: (date: Date) => void
  handleEventClick: (event: Event) => void
}) {
  console.log(events)
  const days = generateWeekDates(currentDate) // Generates the dates for the current week
  const hours = generateDayHours(currentDate) // Generates hourly intervals for each day

  const SLOT_HEIGHT = 5 // Height of one hour in `rem`

  const handleSlotClick = (day: Date, hour: Date) => {
    // Compute the event time directly
    const newEventTime = new Date(day)
    newEventTime.setHours(hour.getHours(), hour.getMinutes())
    onSlotClick(newEventTime) // Pass the calculated date to the parent
  }

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow p-2 md:px-4">
      {/* Weekday Header with Date */}
      <div className="grid grid-cols-8 gap-0 text-center">
        <span className="col-span-1 text-gray-500 font-medium text-sm md:text-base text-left pl-4">
          Time
        </span>
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className="text-gray-500 font-medium text-sm md:text-base border-l border-gray-300 pb-2"
          >
            <span className="block md:hidden">{format(day, "EEE")[0]}</span>
            <span className="hidden md:block">{format(day, "EEE")}</span>
            <span className="block text-xs text-gray-400">
              {format(day, "MMM dd")}
            </span>
          </div>
        ))}
      </div>

      {/* Time Slots and Days Grid */}
      <div className="grid grid-cols-8 gap-0 relative">
        {/* Time Column */}
        {hours.map((hour, rowIndex) => (
          <React.Fragment key={hour.toISOString()}>
            <div
              className="col-span-1 text-xs text-gray-500 pl-4 text-left border-t"
              style={{
                gridRow: rowIndex + 1,
                position: "relative",
              }}
            >
              <span
                className="absolute top-0 left-0 bg-gray-50 px-2"
                style={{ transform: "translateY(-50%)" }}
              >
                {format(hour, "h aa")}
              </span>
            </div>
            {/* Daily Time Slots */}
            {days.map((day) => (
              <div
                key={`${day.toISOString()}-${hour.toISOString()}`}
                onClick={() => handleSlotClick(day, hour)}
                className="relative h-16 sm:h-20 border-t border-l"
                style={{ gridRow: rowIndex + 1 }}
              >
                {events
                  .filter((event) => isSameDay(event.start, day)) 
                  .map((event) => {
                    const eventStartMinutes =
                      event.start.getHours() * 60 + event.start.getMinutes()
                    const eventEndMinutes =
                      event.end.getHours() * 60 + event.end.getMinutes()
                    const slotStartMinutes = rowIndex * 60 // Start of the slot in minutes
                    const slotEndMinutes = (rowIndex + 1) * 60 // End of the slot in minutes

                    if (
                      eventEndMinutes <= slotStartMinutes ||
                      eventStartMinutes >= slotEndMinutes
                    ) {
                      // Event doesn't overlap with this time slot
                      return null
                    }

                    const top = ((eventStartMinutes % 60) / 60) * SLOT_HEIGHT
                    const height =
                      ((eventEndMinutes - eventStartMinutes) / 60) * SLOT_HEIGHT

                    return (
                      <div
                        key={event.id}
                        className={`absolute left-1 ${event.color ?? "bg-blue-500"} text-white text-xs rounded-md px-2 cursor-pointer`}
                        style={{
                          top: `${top}rem`,
                          height: `${height}rem`,
                          width: "calc(100% - 0.5rem)", // Leave some padding
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEventClick(event) // Edit event
                        }}
                      >
                        {event.title}
                      </div>
                    )
                  })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
