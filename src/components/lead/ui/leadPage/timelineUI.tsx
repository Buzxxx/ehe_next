"use client";

import { Plus, Mail, Check, Edit } from "@/components/ui/icons";
import { FaUser } from "react-icons/fa";
import { LegacyRef } from "react";
import Avataar from "./avataar";

// Define a type for the event names
type EventName =
  | "Lead Creation"
  | "Lead Assigned"
  | "Lead Updated"
  | "User Comment"
  | "Lead Edited";

const TimelineUI = ({
  groupedEvents,
  activeMonth,
  monthRefs,
  timelineLineRef,
  firstEventRef,
  lastEventRef,
  formatDate,
}: {
  groupedEvents: { [key: string]: any[] };
  activeMonth: string;
  monthRefs: React.MutableRefObject<Record<string, HTMLElement>>;
  timelineLineRef: React.RefObject<HTMLElement>;
  firstEventRef: React.RefObject<HTMLElement>;
  lastEventRef: React.RefObject<HTMLElement>;
  formatDate: (date: string) => string;
}) => {
  // Mapping icons and colors based on event names
  const eventIcons: Record<EventName, JSX.Element> = {
    "Lead Creation": <Plus size={16} className="text-white" />,
    "Lead Assigned": <FaUser size={16} className="text-white" />,
    "Lead Updated": <Check size={16} className="text-white" />,
    "User Comment": <Mail size={16} className="text-white" />,
    "Lead Edited": <Edit size={16} className="text-white" />, // Example for another event type
  };

  const eventColors: Record<EventName, string> = {
    "Lead Creation": "bg-green-500",
    "Lead Assigned": "bg-blue-500",
    "Lead Updated": "bg-yellow-500",
    "User Comment": "bg-gray-500",
    "Lead Edited": "bg-purple-500", // Color for 'Lead Edited'
  };

  return (
    <div className="timeline-wrapper relative px-4">
      {/* Floating Month/Year Marker */}
      {activeMonth && (
        <div className="fixed top-0 left-0 w-full bg-white z-10 shadow-md py-2 px-4">
          <h3 className="text-lg font-semibold text-gray-700">{activeMonth}</h3>
        </div>
      )}

      {/* Vertical Timeline Line */}
      <div
        ref={timelineLineRef as LegacyRef<HTMLDivElement>}
        className="absolute md:right-0 md:left-20 left-4 -translate-x-1/2 w-[2px] bg-gray-300"
      ></div>

      <div className="relative">
        {/* Check if there are no events */}
        {Object.keys(groupedEvents).length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No Activity present</p>
          </div>
        ) : (
          Object.entries(groupedEvents).map(
            ([monthYear, events], groupIndex) => (
              <div
                key={groupIndex}
                ref={(el) => {
                  if (el) {
                    monthRefs.current[monthYear] = el;
                  }
                }}
              >
                {/* Month/Year Header */}
                <div className="sticky top-0 md:w-full z-10 mb-2 w-fit mx-auto">
                  <h3 className="text-xs font-medium bg-white shadow-sm py-1 px-4 rounded-md text-center w-fit md:relative md:left-1/2 text-gray-700">
                    {monthYear}
                  </h3>
                </div>

                {events.map((event, index) => (
                  <div
                    key={index}
                    ref={
                      index === 0 && groupIndex === 0
                        ? (firstEventRef as React.RefObject<HTMLDivElement>)
                        : index === events.length - 1 &&
                          groupIndex === Object.keys(groupedEvents).length - 1
                        ? (lastEventRef as React.RefObject<HTMLDivElement>)
                        : null
                    }
                    className="relative mb-16 flex justify-start w-full px-6"
                  >
                    {/* Icon Marker */}
                    <div
                      className={`absolute max-md:-top-[12%] left-0 md:left-16 -translate-x-1/2 p-1 rounded-sm flex gap-2 items-center justify-center ${
                        eventColors[event.eventname as EventName] ||
                        "bg-gray-500"
                      } ${
                        index === events.length - 1 &&
                        groupIndex === Object.keys(groupedEvents).length - 1 &&
                        "self-start"
                      }`}
                    >
                      {eventIcons[event.eventname as EventName] || (
                        <Mail size={16} className="text-white" />
                      )}
                    </div>

                    {/* Event Card */}
                    <div className={`flex flex-col gap-2 w-full md:ml-16`}>
                      {/* Date on the Left */}
                      <div className="max-md:absolute max-md:left-0 max-md:-top-[10%] max-md:px-6 text-right flex justify-between items-center w-full text-sm text-gray-500">
                        <p className="capitalize">{event.eventname}</p>
                        <p>{formatDate(event.date)}</p>
                      </div>
                      <div className="p-4 mt-4 pt-2 bg-white border border-gray-300 rounded-lg w-full md:w-5/6 mx-auto">
                        <div className="text-sm font-semibold capitalize flex items-start gap-3">
                          <Avataar className="size-5 border-2" />
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">
                              {event.username}
                            </span>
                            <span className="text-sm font-normal text-gray-500">
                              {event.description}
                              <div className="p-2 rounded-md mt-2">
                                {Object.entries(event.changes).map(
                                  ([key, value]) => (
                                    <p
                                      key={key}
                                      className="text-sm text-gray-700"
                                    >
                                      <span className="font-normal">
                                        {key}:{" "}
                                      </span>
                                      <span className="text-gray-400">
                                        {value.from
                                          ? `${value.to} was ${value.from}`
                                          : value.to}
                                      </span>
                                    </p>
                                  )
                                )}
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default TimelineUI;
