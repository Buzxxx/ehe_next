/**
 * @path src/components/lead/context/leadProfileContext.tsx
 */
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DefaultLead,
  get_lead_details_controller,
  Lead,
} from "@/components/lead/features/leadObject";
import { LeadStatus } from "@/components/lead/features/statusObject";
import { TimelineEvents } from "../../timelineObject";

// Context to store lead profile state
const LeadProfileContext = createContext<{
  leadProfile: Lead;
  setLeadProfile: React.Dispatch<React.SetStateAction<Lead>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<SetStateAction<boolean>>;
  statusList: LeadStatus[];
  setStatusList: React.Dispatch<SetStateAction<LeadStatus[]>>;
  users: { id: string; name: string }[];
  setUsers: React.Dispatch<SetStateAction<{ id: string; name: string }[]>>;
  timelineEvents: TimelineEvents[];
  setTimelineEvents: React.Dispatch<SetStateAction<TimelineEvents[]>>;
  leadId: string;
} | null>(null);

// Context provider
export const LeadProfileProvider = ({
  children,
  leadId,
}: {
  children: React.ReactNode;
  leadId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [leadProfile, setLeadProfile] = useState<Lead>(DefaultLead);
  const [statusList, setStatusList] = useState<LeadStatus[]>([]);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);

  // Fetch lead details when the component mounts or the `leadId` changes
  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        const fetchedLeadDetails = await get_lead_details_controller(leadId);
        setLeadProfile({ ...fetchedLeadDetails.leadDetails });
      } catch (error) {
        console.error("Error fetching lead details:", error);
        setLeadProfile(DefaultLead);
      }
    };

    fetchLeadDetails();
  }, [leadId, setLeadProfile]);

  return (
    <LeadProfileContext.Provider
      value={{
        leadProfile,
        setLeadProfile,
        isEditing,
        setIsEditing,
        statusList,
        setStatusList,
        users,
        setUsers,
        timelineEvents,
        setTimelineEvents,
        leadId,
      }}
    >
      {children}
    </LeadProfileContext.Provider>
  );
};

// Custom hook to access the context
export const useLeadProfile = () => {
  const context = useContext(LeadProfileContext);
  if (!context) {
    throw new Error("useLeadProfile must be used within a LeadProfileProvider");
  }
  return context;
};
