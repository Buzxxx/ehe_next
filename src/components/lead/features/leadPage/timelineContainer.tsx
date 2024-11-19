"use client"

import { useEffect, useRef, useState } from "react"
import TimelineUI from "../../ui/leadPage/timelineUI"

const groupEventsByMonth = (events: {
  eventname: string
  date: string
  description: string
  username: string
  category: string
}[]) => {
  const groupedEvents: { [key: string]: any[] } = {}
  events.forEach((event) => {
    const date = new Date(event.date)
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })
    groupedEvents[monthYear] = groupedEvents[monthYear] || []
    groupedEvents[monthYear].push(event)
  })
  return groupedEvents
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
  const timelineLineRef = useRef<HTMLElement | null>(null)
  const firstEventRef = useRef<HTMLElement | null>(null)
  const lastEventRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observe = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setActiveMonth(entry.target.id)
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.25 }
    )

    for (const [monthYear, ref] of Object.entries(monthRefs.current)) {
      if (ref) observe.observe(ref)
    }

    return () => {
      observe.disconnect()
    }
  }, [groupedEvents, monthRefs])

  useEffect(() => {
    if (timelineLineRef.current && firstEventRef.current && lastEventRef.current) {
      const firstEventTop = firstEventRef.current.offsetTop
      const lastEventTop = lastEventRef.current.offsetTop
      timelineLineRef.current.style.top = `${firstEventTop}px`
      timelineLineRef.current.style.height = `${lastEventTop - firstEventTop}px`
    }
  }, [events, groupedEvents, timelineLineRef, firstEventRef, lastEventRef])

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
