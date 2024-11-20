/**
 * @path src/components/lead/context/leadProfileContext.tsx
 */

import { createContext, useContext, useState } from "react"

export interface LeadProfileForm {
  id: string
  name: string
  email: string
  contact: string
  lead_type: string
  query?: string
  interested_in?: string
  budget?: string
  assigned_to: string
  product_code?: string
  received_date?: Date
  product_type: string
  status: string
  source?: string
  address?: string
}

// Context to store lead profile state
const LeadProfileContext = createContext<{
  leadProfile: LeadProfileForm
  setLeadProfile: React.Dispatch<React.SetStateAction<LeadProfileForm>>
} | null>(null)

// Context provider
export const LeadProfileProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [leadProfile, setLeadProfile] = useState<LeadProfileForm>({
    id: "123", // Example default values
    name: "",
    email: "",
    contact: "",
    lead_type: "A",
    assigned_to: "",
    product_type: "A",
    status: "Active",
    address: "",
  })

  return (
    <LeadProfileContext.Provider value={{ leadProfile, setLeadProfile }}>
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
