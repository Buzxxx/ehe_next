/**
 * @path src/components/tasks/feature/calendar.tsx
 */

"use client"

import React, { useState } from "react"
import { format, addMonths, subMonths, addWeeks, subWeeks } from "date-fns"
import MonthView from "../ui/monthView"
import WeekView from "../ui/weekView"
import DayView from "../ui/dayView"
import { initialEvents } from "../noSql/events"
import EventModal from "../ui/createEventModal"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Calendar() {
  const [view, setView] = useState("week")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [events, setEvents] = useState(initialEvents)
  const [selectedDateTime, setSelectedDateTime] = useState(new Date())

  const handleNext = () => {
    setCurrentDate((prevDate) => {
      let newDate
      if (view === "month") {
        newDate = addMonths(prevDate, 1)
      } else if (view === "week") {
        newDate = addWeeks(prevDate, 1)
      } else {
        newDate = new Date(prevDate)
        newDate.setDate(prevDate.getDate() + 1)
      }

      // Fix for skipping days
      if (newDate.getDate() !== prevDate.getDate() + 1) {
        newDate.setHours(0, 0, 0, 0)
      }

      return newDate
    })
  }

  const handlePrevious = () => {
    setCurrentDate((prevDate) => {
      if (view === "month") return subMonths(prevDate, 1)
      if (view === "week") return subWeeks(prevDate, 1)
      return new Date(prevDate.setDate(prevDate.getDate() - 1))
    })
  }

  // Opens the modal with default date/time from clicked slot
  const handleSlotClick = (dateTime: Date) => {
    console.log('first')
    setSelectedDateTime(dateTime)
    setIsModalOpen(true)
  }

  // Adds the new event to events array
  const handleSaveEvent = (newEvent: any) => {
    setEvents((prevEvents) => [...prevEvents, newEvent])
    setIsModalOpen(false) // Close modal after saving
  }

  return (
    <>
      <header className="sticky top-16 bg-white z-10 md:py-2 md:px-4 px-1 rounded-md py-2 mb-2 md:shadow-sm flex items-center justify-between">
        <div className="flex gap-2 items-center md:w-1/3 ">
          <Button
            onClick={handlePrevious}
            variant={"outline"}
            className="h-fit w-fit p-2  "
          >
            &lt; <span className="hidden md:inline">Prev</span>
          </Button>
          <Button
            variant={"outline"}
            onClick={handleNext}
            className="h-fit w-fit p-2  "
          >
            <span className="hidden md:inline"> Next</span> &gt;
          </Button>
        </div>

        {view !== "day" ? (
          <h2 className="md:text-2xl text-lg font-semibold text-gray-800 md:w-1/3 text-center">
            {format(currentDate, "MMMM yyyy")}
          </h2>
        ) : (
          <div className="flex flex-col  md:w-1/3">
            <h2 className="md:text-2xl text-lg font-semibold text-gray-800 text-center">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <p className="text-center">{format(currentDate, "EEEE, MMM dd")}</p>
          </div>
        )}

        <div className=" space-x-2 md:w-1/3 justify-end hidden md:flex">
          <Button
            onClick={() => setView("day")}
            className={`px-3 py-1 rounded-3xl ${
              view === "day"
                ? "bg-sky-600 text-white"
                : "bg-gray-300/75 hover:bg-gray-300"
            }`}
          >
            Day
          </Button>
          <Button
            onClick={() => setView("week")}
            className={`px-3 py-1 rounded-3xl ${
              view === "week"
                ? "bg-sky-600 text-white"
                : "bg-gray-300/75 hover:bg-gray-300"
            }`}
          >
            Week
          </Button>
          {/* <Button
            onClick={() => setView("month")}
            className={`px-3 py-1 rounded-3xl ${
              view === "month"
                ? "bg-sky-600 text-white"
                : "bg-gray-300/75 hover:bg-gray-300"
            }`}
          >
            Month
          </Button> */}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden border p-2 text-xs rounded-lg">
            view
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:hidden">
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setView("day")}>
              Day
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView("week")}>
              Week
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView("month")}>
              Month
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main>
        {/* {view === "month" && (
          <MonthView
            currentDate={currentDate}
            events={events}
            onSlotClick={handleSlotClick} // Pass the slot click handler
          />
        )} */}
        {view === "week" && (
          <WeekView
            currentDate={currentDate}
            events={events}
            onSlotClick={handleSlotClick} // Pass the slot click handler
          />
        )}
        {view === "day" && (
          <DayView
            currentDate={currentDate}
            events={events}
            onSlotClick={handleSlotClick} // Pass the slot click handler
          />
        )}
      </main>
    
    </>
  )
}
