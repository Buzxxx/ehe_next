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
  Dot,
  DotIcon,
} from "@/components/ui/icons"
import EditableField from "@/components/ui/editableField"
import Avataar from "@/components/dashboard/ui/avataar"
import {
  individualLead,
  defaultIndividualLead,
} from "@/components/lead/features/leadObject"
import { useState } from "react"
import LeadDetail from "../../ui/leadDetail"

const LeadPageHeader = ({
  id,
  leadResponse = defaultIndividualLead,
  navItems,
  activeTab,
  setActiveTab,
}: {
  id: number
  leadResponse: individualLead
  navItems: { name: string; component: React.ReactNode }[]
  activeTab: number
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
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
    <section className="p-4 pt-2 pb-0 bg-white shadow-sm rounded-lg">
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
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
              <span className="text-gray-300 h-4 overflow-hidden my-auto">
                |
              </span>
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

      <div className="grid md:grid-cols-4 gap-6 mt-4 py-2">
        <LeadDetail
          title="Priority"
          value={
            <div className="flex gap-2 items-center">
              <DotIcon color="red" className="w-3" size={8} /> High
            </div>
          }
        />
        <LeadDetail title="Date" value="Jan 03, 2024" />
        <LeadDetail title="Approx Budget" value="₹ 1,00,000" />
        <LeadDetail
          title="Agent"
          value={
            <div className="flex items-center gap-2">
              <Avataar src="/base/profile.webp" className="size-4" /> John Doe
            </div>
          }
        />
      </div>

      <nav className="pt-2 mt-4 flex items-center justify-start bg-white w-full max-md:pl-4">
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
