/**
 * @path src/components/lead/context/leadProfileContext.tsx
 */

import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  DefaultLead,
  get_lead_details_controller,
  Lead,
} from "../features/leadObject"

// Context to store lead profile state
const LeadProfileContext = createContext<{
  leadProfile: Lead
  setLeadProfile: React.Dispatch<React.SetStateAction<Lead>>
  isEditing: boolean
  setIsEditing: React.Dispatch<SetStateAction<boolean>>
} | null>(null)

// Context provider
export const LeadProfileProvider = ({
  children,
  leadId,
}: {
  children: React.ReactNode
  leadId: string
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [leadProfile, setLeadProfile] = useState<Lead>(DefaultLead)

  // Fetch lead details when the component mounts or the `leadId` changes
  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        // const fetchedLeadDetails: Lead | false =
        //   await get_lead_details_controller(leadId)
        setLeadProfile(DefaultLead)
      } catch (error) {
        console.error("Error fetching lead details:", error)
        setLeadProfile(DefaultLead)
      }
    }

    fetchLeadDetails()
  }, [leadId, setLeadProfile])

  return (
    <LeadProfileContext.Provider
      value={{ leadProfile, setLeadProfile, isEditing, setIsEditing }}
    >
      {children}
    </LeadProfileContext.Provider>
  )
}

// Custom hook to access the context
export const useLeadProfile = () => {
  const context = useContext(LeadProfileContext)
  if (!context) {
    throw new Error("useLeadProfile must be used within a LeadProfileProvider")
  }
  return context
}
