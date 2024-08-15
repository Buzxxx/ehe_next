// LeadTimeLine.js
"use client"
import React, { useEffect, useState } from "react"
import LeadStatusUpdateForm from "./leadStatusUpdateForm"
import { getCurrentTimeInLocaleString } from "@/lib/getCurrentTimeInLocaleString"

const timelineEvents = [
  {
    eventname: "client added",
    date: "12/12/2020",
    description: "Initial lead created by X",
    username: "admin",
  },
  {
    eventname: "client visited",
    date: "15/12/2020",
    description: "Lead visited by X",
    username: "admin",
  },
  {
    eventname: "client closed",
    date: "20/12/2020",
    description: "Lead closed by Y",
    username: "admin",
  },
]

const LeadTimeLine = () => {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const formattedTime = getCurrentTimeInLocaleString()
    setCurrentTime(formattedTime)
  }, [])
  return (
    <div className="timeline-wrapper py-2 max-md:px-4">
      <div className="relative w-full my-12 py-8">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[3%] md:left-1/4 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>

        {/* Current Time and Status Update Form */}
        <div className="relative mb-16 flex items-center justify-start w-full">
          <div className="absolute max-md:top-0 left-[3%] md:left-1/4 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
          {/* Current Time on the Left */}
          <div className="md:w-1/4 text-right pr-8 max-md:absolute max-md:left-8 max-md:top-0">
            <p className="text-sm font-bold text-gray-700">{currentTime}</p>
          </div>
          <div className="ml-8 max-md:mt-8 p-4 pt-2 bg-white border border-gray-300 rounded-lg shadow-md w-full md:w-1/2">
            <LeadStatusUpdateForm />
          </div>
        </div>
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className="relative mb-16 flex items-center justify-start w-full"
          >
            {/* Date on the Left */}
            <div className="w-1/4 max-md:absolute max-md:left-8 max-md:-top-[10%] text-right pr-8">
              <p className="text-sm font-bold text-gray-700">{event.date}</p>
            </div>
            {/* Circle Marker */}
            <div className="absolute max-md:-top-[10%] left-[3%] md:left-1/4 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
            {/* Event Card on the Right */}
            <div className="ml-8 p-4 max-md:mt-4 pt-2 bg-white border border-gray-300 rounded-lg shadow-md w-full md:w-1/2">
              <h4 className="text-md font-semibold">{event.eventname}</h4>
              <p className="text-xs text-gray-600">{event.description}</p>
              <p className="text-xs text-gray-600">By: {event.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeadTimeLine
