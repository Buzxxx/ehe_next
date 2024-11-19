/**
 * @path src/components/lead/features/leadPage/leadTimeline.tsx
 */

import LeadStatusUpdateForm from "@/components/lead/features/leadPage/leadStatusUpdateForm"
import TimelineContainer from "./timelineContainer"
import TimelineTopbar from "../../ui/leadPage/timelineTopbar"

const timelineEvents = [
  {
    eventname: "client added",
    date: "2020-11-12T23:21:00",
    description: "Initial lead created by X",
    username: "admin",
    category: "created",
  },
  {
    eventname: "client visited",
    date: "2020-12-15T14:45:00",
    description: "Lead visited by X",
    username: "admin",
    category: "contacted",
  },
  {
    eventname: "client closed",
    date: "2020-12-20T09:30:00",
    description: "Lead closed by Y",
    username: "admin",
    category: "qualified",
  },
].reverse()

const LeadTimeLine = ({
  id,
  setShowCallback,
  setShowMeeting,
}: {
  id: string
  setShowCallback: React.Dispatch<React.SetStateAction<boolean>>
  setShowMeeting: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className="w-full h-full mt-4">
      <div className="relative w-full flex justify-between gap-4 ">
        <div className="w-1/3 bg-white p-4 rounded-md shadow-sm border">
          <LeadStatusUpdateForm id={id} />
        </div>

        <div className="w-fit h-full flex-1 border rounded-t-md bg-white rounded-md shadow-sm">
          <TimelineTopbar setShowCallback={setShowCallback} setShowMeeting={setShowMeeting} />
          <TimelineContainer events={timelineEvents} />
        </div>
      </div>
    </div>
  )
}

export default LeadTimeLine
