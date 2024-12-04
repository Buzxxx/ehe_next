/**
 * @path src/components/tasks/feature/calendar.tsx
 */

"use client"

import React, { useState } from "react"
import { format, addMonths, subMonths, addWeeks, subWeeks } from "date-fns"
import WeekView from "../ui/weekView"
import DayView from "../ui/dayView"
import { initialEvents, Event } from "../noSql/events"
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
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [newEventTime, setNewEventTime] = useState<Date | null>(null)

  const handleNext = () => {
    setCurrentDate((prevDate) =>
      view === "month"
        ? addMonths(prevDate, 1)
        : view === "week"
        ? addWeeks(prevDate, 1)
        : new Date(prevDate.setDate(prevDate.getDate() + 1))
    )
  }

  const handlePrevious = () => {
    setCurrentDate((prevDate) =>
      view === "month"
        ? subMonths(prevDate, 1)
        : view === "week"
        ? subWeeks(prevDate, 1)
        : new Date(prevDate.setDate(prevDate.getDate() - 1))
    )
  }

  const handleSlotClick = (hour: Date) => {
    setSelectedEvent(null)
    setNewEventTime(hour)
    setIsModalOpen(true)
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setNewEventTime(null)
    setIsModalOpen(true)
  }

  const handleSaveEvent = (newEvent: Partial<Event>) => {
    const eventWithId = {
      ...newEvent,
      id: newEvent.start?.toISOString() || "",
    } as Event

    setEvents((prevEvents) => {
      if (selectedEvent) {
        // Update existing event
        return prevEvents.map((event) =>
          event.id === selectedEvent.id ? eventWithId : event
        )
      }
      // Add new event
      return [...prevEvents, eventWithId]
    })
    setSelectedEvent(null)
    setNewEventTime(null)
    setIsModalOpen(false) // Close the modal
  }

  return (
    <>
      <header className="sticky top-16 bg-white z-10 md:py-2 md:px-4 px-1 rounded-md py-2 mb-2 md:shadow-sm flex items-center justify-between">
        <div className="flex gap-2 items-center md:w-1/3 ">
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="h-fit w-fit p-2"
          >
            &lt; <span className="hidden md:inline">Prev</span>
          </Button>
          <Button
            onClick={handleNext}
            variant="outline"
            className="h-fit w-fit p-2"
          >
            <span className="hidden md:inline">Next</span> &gt;
          </Button>
        </div>

        {view !== "day" ? (
          <h2 className="md:text-2xl text-lg font-semibold text-gray-800 md:w-1/3 text-center">
            {format(currentDate, "MMMM yyyy")}
          </h2>
        ) : (
          <div className="flex flex-col md:w-1/3">
            <h2 className="md:text-2xl text-lg font-semibold text-gray-800 text-center">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <p className="text-center">{format(currentDate, "EEEE, MMM dd")}</p>
          </div>
        )}

        <div className="space-x-2 md:w-1/3 justify-end hidden md:flex">
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
        {view === "week" && (
          <WeekView
            currentDate={currentDate}
            events={events}
            onSlotClick={handleSlotClick}
            handleEventClick={handleEventClick}
          />
        )}
        {view === "day" && (
          <DayView
            handleEventClick={handleEventClick}
            currentDate={currentDate}
            events={events}
            onSlotClick={handleSlotClick}
          />
        )}
      </main>

      {/* Event Modal */}
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedEvent(null)
            setNewEventTime(null)
          }}
          onSave={handleSaveEvent}
          isEditing={!!selectedEvent}
          defaultEvent={
            selectedEvent || {
              title: "",
              description: "",
              start: newEventTime!,
              end: new Date(newEventTime!.getTime() + 60 * 60 * 1000), // Default 1-hour duration
              teamMembers: [],
            }
          }
        />
      )}
    </>
  )
}
