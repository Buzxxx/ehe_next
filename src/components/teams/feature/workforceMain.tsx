"use client"

import { useState } from "react"
import { WorkCard } from "../ui/workCard"
import ChatWindow from "../ui/chatWindow"
import { Employee } from "@/components/account/feature/employeeColumn"
import { Edit, Filter } from "lucide-react"
import {
  additionalEmployeesData,
  employeeData,
} from "@/components/teams/lib/employees"

const WorkplaceMain = () => {
  const [selectedContact, setSelectedContact] = useState<Employee | null>(null)
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)
  const [isNewChatMode, setIsNewChatMode] = useState(false)
  const [additionalEmployees, setAdditionalEmployees] = useState<Employee[]>(
    additionalEmployeesData
  )

  const handleWorkCardClick = (contact: Employee) => {
    setSelectedContact(contact)
    setIsNewChatMode(false) // Exit "new chat" mode on contact selection
    if (window.innerWidth < 768) {
      setIsMobileModalOpen(true) // Open modal on mobile
    }
  }

  const handleNewChatClick = () => {
    setSelectedContact(null)
    setIsNewChatMode(true) // Enter "new chat" mode
    if (window.innerWidth < 768) {
      setIsMobileModalOpen(true)
    }
  }

  const closeMobileModal = () => {
    setIsMobileModalOpen(false)
    setSelectedContact(null)
    setIsNewChatMode(false) // Exit "new chat" mode
  }

  return (
    <div className="flex flex-col md:flex-row h-full gap-2">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 border-r flex flex-col">
        {/* Sidebar Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b bg-white sticky top-0 z-10">
          <h4 className="text-lg font-semibold">Chats</h4>
          <div className="flex items-center gap-2">
            <button aria-label="Filter chats">
              <Filter size={16} />
            </button>
            <button
              aria-label="New chat"
              onClick={handleNewChatClick}
              className="p-2 bg-sky-700 hover:bg-sky-600 rounded-full text-white newChat"
            >
              <Edit size={16} />
            </button>
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {employeeData.length > 0 ? (
            employeeData.map((employee) => (
              <WorkCard
                key={employee.id}
                name={employee.name}
                email={employee.email}
                phone={employee.phone}
                onClick={() => handleWorkCardClick(employee)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No contacts found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window - Desktop */}
      <div className="flex-1 border-l hidden md:flex">
        <ChatWindow
          contact={selectedContact}
          isNewChatMode={isNewChatMode}
          onContactSelect={handleWorkCardClick}
          additionalEmployees={additionalEmployees}
          setAdditionalEmployees={setAdditionalEmployees}
        />
      </div>

      {/* Chat Modal - Mobile */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col py-2 max-h-full">
          <ChatWindow
            contact={selectedContact}
            isNewChatMode={isNewChatMode}
            onContactSelect={handleWorkCardClick}
            additionalEmployees={additionalEmployees}
            setAdditionalEmployees={setAdditionalEmployees}
          />
        </div>
      )}
    </div>
  )
}

export default WorkplaceMain
