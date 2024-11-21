/**
 * @path src/components/lead/features/leadPage/leadPageHeader.tsx
 */


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
  DotIcon,
  Edit,
} from "@/components/ui/icons"
import EditableField from "@/components/ui/editableField"
import Avataar from "@/components/dashboard/ui/avataar"
import {
  individualLead,
  defaultIndividualLead,
} from "@/components/lead/features/leadObject"
import { useState } from "react"
import LeadDetail from "../../ui/leadDetail"
import { useLeadProfile } from "@/components/lead/context/leadProfileContext"

const LeadPageHeader = ({
  id,
  leadResponse = defaultIndividualLead,
  navItems,
  activeTab,
  setActiveTab,
  isEditing,
  setIsEditing,
}: {
  id: number
  leadResponse: individualLead
  navItems: { name: string; component: React.ReactNode }[]
  activeTab: number
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const router = useRouter()
  const [localLeadResponse, setLocalLeadResponse] = useState(leadResponse)
   const { leadProfile } = useLeadProfile()

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

  // Cancel edit
  const handleCancel = () => {
    setLocalLeadResponse(leadResponse) // Revert to original values
    setIsEditing(false)
  }

  return (
    <section className="p-2 md:p-4 md:pt-2 md:pb-0 pb-0 bg-white shadow-sm rounded-lg">
      <header className="flex justify-between items-center md:mb-4 mt-8 md:mt-0">
        <div className="flex items-center gap-2">
          <BackIcon
            onClick={() => router.back()}
            className="p-1 cursor-pointer hover:bg-gray-200 rounded-full"
          />
          <h1 className="text-lg font-semibold text-gray-800">Lead Details</h1>
          {activeTab === 1 && (
            <div className="flex items-center gap-2 ml-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={() => {
                      console.log("Lead Profile:", leadProfile)
                      setIsEditing(false)
                    }}
                    className="h-fit bg-transparent border text-sky-600 hover:text-sky-700 py-1 border-sky-600 hover:border-sky-700 hover:bg-transparent"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="h-fit bg-transparent border text-gray-500 hover:text-gray-700 py-1 border-gray-500 hover:border-gray-700 hover:bg-transparent"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="h-fit bg-transparent border text-slate-400 hover:text-slate-600 py-1 border-slate-400 hover:border-slate-600 hover:bg-transparent"
                >
                  <Edit /> Edit
                </Button>
              )}
            </div>
          )}
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center gap-4">
          <Avataar
            src={localLeadResponse.img ?? "/base/profile.webp"}
            className="h-16 w-16 rounded-full border border-sky-800 p-1"
          />
          <div className="flex flex-col gap-1 ">
            {isEditing ? (
              <EditableField
                value={leadResponse.name}
                textSize="xl"
                fontWeight="semibold"
                onSave={() => saveField}
              />
            ) : (
              <h4 className="font-semibold text-xl">
                {leadResponse.name ?? "Unknown"}
              </h4>
            )}

            <div className="flex gap-2 items-center text-gray-500 text-sm">
              <Mail size={16} />
              {isEditing ? (
                <EditableField
                  value={leadResponse.email}
                  textSize="sm"
                  onSave={() => saveField}
                />
              ) : (
                <p>{localLeadResponse.email}</p>
              )}
            </div>

            <div className="flex gap-2 items-center text-gray-500 text-sm">
              <div className="flex gap-2 items-center">
                <Phone size={16} />
                {isEditing ? (
                  <EditableField
                    value={leadResponse.phone}
                    textSize="sm"
                    onSave={() => saveField}
                  />
                ) : (
                  <p>{localLeadResponse.phone}</p>
                )}
              </div>
              <span className="text-gray-300 h-4 overflow-hidden my-auto">
                |
              </span>
              <div className="flex gap-2 items-center">
                <BriefCase size={16} />
                {isEditing ? (
                  <EditableField
                    value={leadResponse.company}
                    textSize="sm"
                    onSave={() => saveField}
                  />
                ) : (
                  <p>{localLeadResponse.company}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button
            variant="outline"
            className="border border-sky-600 text-sky-600 hover:bg-sky-50 hover:text-sky-700 rounded-md"
          >
            <Mail size={16} />
            Send Mail
          </Button>
          <Button
            variant="outline"
            className="border border-sky-600 text-sky-600 hover:bg-sky-50 hover:text-sky-700 rounded-md"
          >
            <Phone size={16} />
            Call
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-2 gap-2 md:gap-6 md:mt-4 mt-2 py-2">
        <LeadDetail
          isEditMode={isEditing}
          title="Priority"
          type="select"
          value={
            <div className="flex gap-2 items-center">
              <DotIcon color="red" className="w-3" size={8} /> High
            </div>
          }
          options={["Low", "Medium", "High"]}
          onSave={(newValue) => console.log("Saved Priority:", newValue)}
        />
        <LeadDetail
          isEditMode={isEditing}
          title="Date"
          type="date"
          value="Jan 03, 2024"
          onSave={(newValue) => console.log("Saved Date:", newValue)}
        />
        <LeadDetail
          isEditMode={isEditing}
          title="Approx Budget"
          value="₹ 1,00,000"
          onSave={(newValue) => console.log("Saved Budget:", newValue)}
        />
        <LeadDetail
          isEditMode={isEditing}
          title="Agent"
          type="select"
          value="John Doe"
          options={["John Doe", "Jane Smith", "Alice Johnson"]}
          onSave={(newValue) => console.log("Saved Agent:", newValue)}
        />
      </div>

      <nav className="md:pt-2 md:mt-4 flex items-center justify-start bg-white w-full ">
        {navItems.map((item, index) => (
          <button
            key={item.name}
            className={`relative text-sm text-gray-700 border-b-2 transition-all  px-4 py-2 ${
              activeTab === index
                ? "border-b-sky-600 text-sky-600 "
                : "border-transparent"
            } ${index === 0 ? "rounded-tl-lg" : ""} ${
              index === navItems.length - 1 ? "rounded-tr-lg" : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {item.name}

            {index !== navItems.length - 1 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-gray-200"></span>
            )}
          </button>
        ))}
      </nav>
    </section>
  )
}

export default LeadPageHeader
