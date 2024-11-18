"use client"

import { Button } from "@/components/ui/button"
import BackIcon from "@/components/ui/icons/back"
import { useRouter } from "next/navigation"
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  BriefCase,
  Share2,
} from "@/components/ui/icons"
import EditableField from "@/components/ui/editableField"
import Avataar from "@/components/dashboard/ui/avataar"
import {
  individualLead,
  defaultIndividualLead,
} from "@/components/lead/features/leadObject"
import { useState } from "react"

const LeadPageHeader = ({
  id,
  leadResponse = defaultIndividualLead,
}: {
  id: number
  leadResponse: individualLead
}) => {
  const router = useRouter()
  const [localLeadResponse, setLocalLeadResponse] = useState(leadResponse)

  // Function to handle navigation
  const handleNavigation = (direction: "prev" | "next") => {
    const newId = direction === "prev" ? id - 1 : id + 1
    if (newId > 0) {
      router.push(`/lead/${newId}`)
    }
  }

  // Generic save function
  const saveField = (field: keyof individualLead, value: string) => {
    setLocalLeadResponse({ ...localLeadResponse, [field]: value })
  }

  return (
    <section className="p-4 pt-2 bg-white shadow-sm rounded-lg">
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <BackIcon
            onClick={() => router.back()}
            className="p-1 cursor-pointer hover:bg-gray-200 rounded-full"
          />
          <h1 className="text-lg font-semibold text-gray-800">Lead Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="p-1 bg-transparent text-gray-600 hover:bg-gray-200 rounded-md h-fit"
            onClick={() => handleNavigation("prev")} // Navigate to previous ID
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            className="p-1 bg-transparent text-gray-600 hover:bg-gray-200 rounded-md h-fit"
            onClick={() => handleNavigation("next")} // Navigate to next ID
          >
            <ChevronRight size={20} />
          </Button>
          <Button className="p-1 bg-transparent text-blue-600 hover:bg-blue-100 rounded-md h-fit">
            <Share2 size={20} />
          </Button>
          <Button className="p-1 bg-transparent text-yellow-600 hover:bg-yellow-100 rounded-md h-fit">
            <Bookmark size={20} />
          </Button>
        </div>
      </header>

      <div className="flex items-center gap-4">
        <Avataar
          src={localLeadResponse.img ?? "/base/profile.webp"}
          className="h-16 w-16 rounded-full border border-sky-800 p-1"
        />
        <div className="flex flex-col gap-1 ">
          <EditableField
            value={localLeadResponse.name}
            onSave={(value) => saveField("name", value)}
            placeholder="Enter name"
            textSize="xl"
            fontWeight="semibold"
          />
          <div className="flex gap-2 items-center text-gray-500 text-sm">
            <Mail size={16} />
            <EditableField
              value={localLeadResponse.email}
              onSave={(value) => saveField("email", value)}
              placeholder="Enter email"
              textSize="sm"
            />
          </div>

          <div className="flex gap-2 items-center text-gray-500 text-sm">
            <div className="flex gap-2 items-center">
              <Phone size={16} />
              <EditableField
                value={localLeadResponse.phone}
                onSave={(value) => saveField("phone", value)}
                placeholder="Enter phone"
                textSize="sm"
              />
            </div>
            <span className="text-gray-300 h-4 overflow-hidden my-auto">|</span>
            <div className="flex gap-2 items-center">
              <BriefCase size={16} />
              <EditableField
                value={localLeadResponse.company}
                onSave={(value) => saveField("company", value)}
                placeholder="Enter company"
                textSize="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeadPageHeader
