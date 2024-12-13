/**
 * @path src/components/lead/features/leadPage/leadTimeline.tsx
 */

import LeadStatusUpdateForm from "@/components/lead/features/leadPage/leadStatusUpdateForm";
import TimelineContainer from "./timelineContainer";
import TimelineTopbar from "../../ui/leadPage/timelineTopbar";

const timelineEvents = [
  {
    eventname: "client added",
    date: "2020-11-12T23:21:00",
    description: "Initial lead created",
    username: "admin",
    category: "created",
  },
  {
    eventname: "client visited",
    date: "2020-12-15T14:45:00",
    description: "Lead visited",
    username: "admin",
    category: "contacted",
  },
  {
    eventname: "client closed",
    date: "2020-12-20T09:30:00",
    description: "Lead closed",
    username: "admin",
    category: "qualified",
  },
  {
    eventname: "client closed",
    date: "2025-12-20T09:30:00",
    description: "Lead closed by Y",
    username: "admin",
    category: "qualified",
  },
].reverse();

const LeadTimeLine = ({
  id,
  setShowCallback,
  setShowMeeting,
}: {
  id: string;
  setShowCallback: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMeeting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="relative w-full h-[calc(75vh-4rem)] md:flex items-stretch overflow-auto justify-between gap-4 mt-4">
      {/* Lead Status Form Wrapper */}

      <div className="md:w-1/3 hidden md:flex flex-col bg-gray-100 rounded-md shadow-sm border h-full">
        <LeadStatusUpdateForm id={id} />
      </div>

      {/* Timeline Wrapper */}
      <div className="md:w-fit overflow-hidden max-h-full flex-1 border rounded-t-md bg-gray-100 rounded-md shadow-sm mx-2 flex flex-col">
        <TimelineTopbar leadId={id} />
        <div className="flex-1 overflow-y-auto">
          <TimelineContainer events={timelineEvents} />
        </div>
      </div>
    </div>
  );
};

export default LeadTimeLine;
