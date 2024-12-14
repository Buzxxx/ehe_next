"use client"

import React, { useState } from "react"
import CreateLeadForm from "@/components/lead/features/createLead/createLeadForm"
import { Lead } from "../features/leadObject"
import LeadProfileHeader from "../ui/createLead/leadProfileHeader"
import LeadDetails from "../ui/createLead/leadDetails"
import UserAliasTable from "@/components/account/feature/userAliasTable"

const CreateLeadLayout = () => {
  const [lead, setLead] = useState<Lead>()
  const [isEditing, setIsEditing] = useState(true)

  const handleSave = (fieldKey: string, value: string | number | boolean) => {
    setLead((prev) => ({ ...prev!, [fieldKey]: value }))
  }

  return (
    <div>
      <LeadProfileHeader
        lead={lead}
        isEditing={isEditing}
        onSave={(fieldKey, value) => handleSave(fieldKey, value)}
        setIsEditing={setIsEditing}
      />
      {lead && (
        <LeadDetails isEditing={isEditing} lead={lead} setLead={setLead} />
      )}
      <UserAliasTable />
    </div>
  )
}

export default CreateLeadLayout
