/**
 * @path src/components/tasks/ui/dayView.tsx
 */

import { Card } from "@/components/ui/card"
import React, { useState } from "react"
import { generateDayHours } from "../utils/dateUtils"
import { format, isSameHour } from "date-fns"
import EventModal from "./createEventModal"

interface DayViewProps {
  currentDate: Date
  events: Array<{
    title: string
    start: Date
    end: Date
    description?: string
    teamMembers?: string[]
  }>
  onSlotClick: (dateTime: Date) => void
}

const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  onSlotClick,
}) => {
  const hours = generateDayHours(currentDate)
  const SLOT_HEIGHT_REM = 4 // Each hour is represented by 4rem in height

  const [selectedEvent, setSelectedEvent] = useState<
    DayViewProps["events"][number] | null
  >(null)
  const [newEventTime, setNewEventTime] = useState<Date | null>(null)

  const handleSlotClick = (hour: Date) => {
    if (!selectedEvent) {
      // Open modal for new event creation
      setNewEventTime(hour)
      onSlotClick(hour)
    }
  }

  const handleEventClick = (event: DayViewProps["events"][number]) => {
    // Open modal for editing an event
    setNewEventTime(null)
    setSelectedEvent(event)
  }

  const handleSave = (event: {
    title: string
    start: Date
    end: Date
    description?: string
  }) => {
    setSelectedEvent(null)
    setNewEventTime(null)
  }

  return (
    <>
      <Card className="day-view-container relative w-full h-full bg-white pt-6 pb-4">
        <div className="time-slots grid grid-rows-24 relative h-full">
          {hours.map((hour) => {
            return (
              <div
                key={hour.toISOString()}
                onClick={() => handleSlotClick(hour)}
                className="time-slot-container relative h-16" // Each time slot's height is 4rem (16px x 4)
              >
                <div className="time-slot relative border-t border-gray-300 w-full h-full">
                  <span className="absolute -translate-y-1/2 left-0 text-xs text-gray-500 z-10 bg-gray-50 px-4 uppercase">
                    {format(hour, "h aa")}
                  </span>
                </div>

                {/* Events */}
                <div className="events-container relative top-0 left-0 w-full h-full">
                  {events
                    .filter((event) => isSameHour(event.start, hour))
                    .map((event, index) => {
                      // Calculate event offset and height
                      const eventStartOffset =
                        (event.start.getHours() - hour.getHours()) * 60 +
                        event.start.getMinutes()
                      const eventEndOffset =
                        (event.end.getHours() - hour.getHours()) * 60 +
                        event.end.getMinutes()

                      const eventHeight =
                        ((eventEndOffset - eventStartOffset) / 60) *
                        SLOT_HEIGHT_REM

                      return (
                        <div
                          key={index}
                          className="event absolute bg-sky-200 text-sky-900 rounded-lg shadow-md p-2 text-sm flex items-center w-[calc(100%-4.5rem)] cursor-pointer z-40"
                          style={{
                            top: `${
                              (eventStartOffset / 60) * SLOT_HEIGHT_REM
                            }rem`,
                            left: "4.5rem",
                            height: `${eventHeight}rem`,
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEventClick(event)
                          }}
                        >
                          {event.title}

                          {/* Tooltip */}
                          <div className="absolute top-0 left-[110%] bg-gray-800 text-white text-xs rounded-md p-2 shadow-lg z-50 hidden group-hover:block">
                            <p>
                              <strong>{event.title}</strong>
                            </p>
                            <p>
                              {format(event.start, "p")} -{" "}
                              {format(event.end, "p")}
                            </p>
                            {event.description && <p>{event.description}</p>}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Event Modal */}
      {(selectedEvent || newEventTime) && (
        <EventModal
          isOpen={!!(selectedEvent || newEventTime)} // Modal is open if either case is true
          onClose={() => {
            setSelectedEvent(null)
            setNewEventTime(null)
          }}
          onSave={handleSave}
          isEditing={!!selectedEvent} // Pass true if editing mode
          defaultEvent={
            selectedEvent
              ? selectedEvent
              : {
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

export default DayView
