// components/MonthView.js
import React from "react"
import { format, isSameMonth, isSameDay } from "date-fns"
import { generateMonthDates } from "../utils/dateUtils"

export default function MonthView({
  currentDate,
  events,
  onSlotClick,
}: {
  currentDate: Date
  events: any[]
  onSlotClick: (date: Date) => void
}) {
  const days = generateMonthDates(currentDate)

  // Day names for the week header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow p-4">
      {/* Weekday Header */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {dayNames.map((day) => (
          <span
            key={day}
            className="text-gray-500 font-medium text-sm md:text-base lg:text-lg"
          >
            <span className="hidden md:inline">{day}</span>
            <span className="md:hidden">{day[0]}</span>
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div
            onClick={() => onSlotClick(day)}
            key={day.toISOString()}
            className={`h-24 sm:h-32 border p-2 rounded-lg flex flex-col justify-between ${
              isSameMonth(day, currentDate) ? "bg-white" : "bg-gray-200/50"
            } ${
              format(day, "EEE") === "Sat" || format(day, "EEE") === "Sun"
                ? "bg-blue-50"
                : ""
            }`}
          >
            <p
              className={`text-xs font-semibold ${
                isSameMonth(day, currentDate)
                  ? "text-gray-600"
                  : "text-gray-400"
              }`}
            >
              {format(day, "dd")}
            </p>
            <div className="mt-2 space-y-1">
              {events
                .filter((event) => isSameDay(event.start, day))
                .map((event) => (
                  <span
                    key={event.id}
                    className={`block ${event.color} text-white text-xs px-2 py-1 rounded-full`}
                  >
                    {event.title}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
