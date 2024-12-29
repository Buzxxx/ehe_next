"use client";

import { useEffect, useRef, useState } from "react";
import TimelineUI from "../../../ui/leadPage/timelineUI";
import { get_timeline_controller, TimelineEvents } from "../../timelineObject";
import { useToast } from "@/components/ui/use-toast";
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext";
import { Spinner } from "@/components/ui/icons";

const groupEventsByMonth = (events: TimelineEvents[]) => {
  const groupedEvents: { [key: string]: any[] } = {};
  events.forEach((event) => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    groupedEvents[monthYear] = groupedEvents[monthYear] || [];
    groupedEvents[monthYear].push(event);
  });
  return groupedEvents;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const TimelineContainer = () => {
  const { leadId, leadProfile, timelineEvents, setTimelineEvents } =
    useLeadProfile();
  const [activeMonth, setActiveMonth] = useState("");
  const monthRefs = useRef<Record<string, HTMLElement>>({});
  const timelineLineRef = useRef<HTMLElement | null>(null);
  const firstEventRef = useRef<HTMLElement | null>(null);
  const lastEventRef = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // New loading state
  const { toast } = useToast();
  const id = leadId?.toString() || "";

  useEffect(() => {
    const fetchTimeline = async () => {
      setLoading(true); // Start loading
      try {
        const result = await get_timeline_controller(id);
        if (result && Array.isArray(result)) {
          setTimelineEvents(result.reverse()); // Reverse the events if needed
        } else {
          toast({
            title: "Error fetching timeline",
            variant: "destructive",
            description: "Could not load timeline events.",
          });
        }
      } catch (error) {
        console.error("Error fetching timeline:", error);
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to fetch timeline data.",
        });
      }
      //  finally {
      //   setLoading(false);
      // }
    };
    fetchTimeline();
  }, [leadProfile, id, toast]);

  const groupedEvents = groupEventsByMonth(timelineEvents);

  useEffect(() => {
    const observe = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setActiveMonth(entry.target.id);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.25 }
    );

    for (const [monthYear, ref] of Object.entries(monthRefs.current)) {
      if (ref) observe.observe(ref);
    }

    return () => {
      observe.disconnect();
    };
  }, [groupedEvents, monthRefs]);

  useEffect(() => {
    if (
      timelineLineRef.current &&
      firstEventRef.current &&
      lastEventRef.current
    ) {
      const firstEventTop = firstEventRef.current.offsetTop;
      const lastEventTop = lastEventRef.current.offsetTop;
      timelineLineRef.current.style.top = `${firstEventTop}px`;
      timelineLineRef.current.style.height = `${lastEventTop - firstEventTop
        }px`;
    }
  }, [
    timelineEvents,
    groupedEvents,
    timelineLineRef,
    firstEventRef,
    lastEventRef,
  ]);

  return (
    <div className="h-[calc(100%-8rem)] ">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner className="text-gray-400 w-8 h-8" /> {/* Show Spinner */}
        </div>
      ) : (
        <TimelineUI
          groupedEvents={groupedEvents}
          activeMonth={activeMonth}
          monthRefs={monthRefs}
          timelineLineRef={timelineLineRef}
          firstEventRef={firstEventRef}
          lastEventRef={lastEventRef}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

export default TimelineContainer;
