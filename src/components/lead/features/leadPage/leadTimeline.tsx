"use client";
import { useEffect, useState } from "react";
import LeadStatusUpdateForm from "@/components/lead/features/leadPage/leadStatusUpdateForm";
import TimelineContainer from "./timelineContainer";
import TimelineTopbar from "../../ui/leadPage/timelineTopbar";
import { get_timeline_controller } from "../timelineObject";
import { useToast } from "@/components/ui/use-toast";
import { Spinner } from "@/components/ui/icons";

const LeadTimeLine = ({
  id,
  setShowCallback,
  setShowMeeting,
}: {
  id: string;
  setShowCallback: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMeeting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // New loading state
  const { toast } = useToast();

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
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchTimeline();
  }, [id, toast]);

  return (
    <div className="relative w-full h-[calc(75vh-4rem)] md:flex items-stretch overflow-auto justify-between gap-4 mt-4">
      {/* Lead Status Form Wrapper */}
      <div className="md:w-1/3 hidden md:flex flex-col bg-gray-100 rounded-md shadow-sm border h-full">
        <LeadStatusUpdateForm id={id} />
      </div>

      {/* Timeline Wrapper */}
      <div className="md:w-fit overflow-hidden max-h-full flex-1 border rounded-t-md bg-gray-100 rounded-md shadow-sm mx-2 flex flex-col">
        <TimelineTopbar leadId={id} />

        {/* Loading Spinner or Timeline */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner className="text-blue-500 w-8 h-8" /> {/* Show Spinner */}
            </div>
          ) : (
            <TimelineContainer events={timelineEvents} /> // Show timeline after loading
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadTimeLine;
