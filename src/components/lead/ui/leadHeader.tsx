"use client"
import OnlineTag from "@/components/dashboard/ui/onlineTag"
import ProfileTab from "@/components/dashboard/ui/profileTab"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import BackIcon from "@/components/ui/icons/back"
import { useRouter } from "next/navigation"
import WhatsAppIcon from "@/components/ui/icons/whatsAppIcon"
import { Phone, Share2 } from "@/components/ui/icons"
import LeadTimeLine from "./leadTimeline"
import LeadProfileUpdateForm from "../feature/leadProfileUpdateForm"
import LeadCallbackForm from "../feature/leadCallbackForm"
import LeadMeetingForm from "../feature/leadMeetingForm"

const navItems = ["Timeline", "Profile", "Call back", "Meeting"]

const LeadHeader = ({
  type = "Cold",
  status = "Closed",
  assignedTo = "Avinash Jha",
}: {
  type?: "Cold" | string
  status?: "Closed" | string
  assignedTo?: "Avinash Jha" | string
}) => {
  const [activeTab, setActiveTab] = useState(navItems[0]) // Set initial active tab
  const router = useRouter() // Initialize useRouter hook

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "Timeline":
        return <LeadTimeLine />
      case "Profile":
        return <LeadProfileUpdateForm />
      case "Call back":
        return <LeadCallbackForm/>
      case "Meeting":
        return <LeadMeetingForm/>
      default:
        return null
    }
  }

  return (
    <>
      <section className="md:w-4/5 mx-auto shadow-xl">
        <header className="flex py-4 justify-between items-center px-4 md:pl-0">
          <BackIcon
            className="p-0 w-6 h-6 md:ml-4 font-extrabold"
            onClick={router.back}
          />

          <div className="flex items-center gap-4">
            <Button className=" w-fit h-fit p-0 bg-inherit fill-sky-500">
              <WhatsAppIcon color="sky-500" />
            </Button>

            <Button className=" w-fit h-fit p-0 bg-inherit text-sky-500">
              <Phone size={18} />
            </Button>

            <Button className=" w-fit h-fit p-0 bg-inherit text-sky-500">
              <Share2 size={18} />
            </Button>
          </div>
        </header>

        <ProfileTab
          className="justify-start ml-8 font-bold text-xl"
          avatarClass="rounded-full border border-sky-800 p-1 pb-0"
        />
        <div className="flex gap-2 mt-2 text-center px-8 text-xs">
          <p className="inline">
            <OnlineTag text="" />
            {type}
          </p>
          |<p>{status}</p> |<p>Assigned to {assignedTo}</p>
        </div>

        <nav className="py-2 px-2 md:px-8 mt-8 flex items-center justify-start gap-4 bg-white w-full overflow-scroll max-md:pl-4">
          {navItems.map((item) => (
            <Button
              key={item}
              className={`text-xs px-2 h-8 ${
                activeTab === item
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </Button>
          ))}
        </nav>
      </section>

      <section className="mt-4 md:px-8 md:w-4/5 mx-auto shadow-xl min-h-80 min-w-80">
        {renderActiveTabContent()}
      </section>
    </>
  )
}

export default LeadHeader
