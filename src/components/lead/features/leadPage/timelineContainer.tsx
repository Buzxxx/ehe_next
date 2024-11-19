"use client"

import { useEffect, useRef, useState } from "react"
import TimelineUI from "../../ui/leadPage/timelineUI"

const groupEventsByMonth = (
  events: {
    eventname: string
    date: string
    description: string
    username: string
    category: string
  }[]
) => {
  return events.reduce((acc: { [key: string]: any[] }, event) => {
    const date = new Date(event.date)
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })
    if (!acc[monthYear]) acc[monthYear] = []
    acc[monthYear].push(event)
    return acc
  }, {})
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

const TimelineContainer = ({
  events,
}: {
  events: {
    eventname: string
    date: string
    description: string
    username: string
    category: string
  }[]
}) => {
  const groupedEvents = groupEventsByMonth(events)
  const [activeMonth, setActiveMonth] = useState("")
  const monthRefs = useRef<Record<string, HTMLElement>>({})
  const timelineLineRef = useRef(null)
  const firstEventRef = useRef(null)
  const lastEventRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      let currentMonth = ""
      for (const [monthYear, ref] of Object.entries(monthRefs.current)) {
        if (ref && ref.offsetTop - 100 <= scrollPosition) {
          currentMonth = monthYear
        }
      }
      setActiveMonth(currentMonth)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (
      firstEventRef.current &&
      lastEventRef.current &&
      timelineLineRef.current
    ) {
      const firstEventTop = (firstEventRef.current as HTMLElement).offsetTop
      const lastEventTop = (lastEventRef.current as HTMLElement).offsetTop
      ;(timelineLineRef.current as HTMLElement).style.top = `${firstEventTop}px`
      ;(timelineLineRef.current as HTMLElement).style.height = `${
        lastEventTop - firstEventTop
      }px`
    }
  }, [events, groupedEvents])

  return (
    <TimelineUI
      groupedEvents={groupedEvents}
      activeMonth={activeMonth}
      monthRefs={monthRefs}
      timelineLineRef={timelineLineRef}
      firstEventRef={firstEventRef}
      lastEventRef={lastEventRef}
      formatDate={formatDate}
    />
  )
}

export default TimelineContainer
