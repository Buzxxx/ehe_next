"use client"

import { useState } from "react"
import { WorkCard } from "../ui/workCard"
import ChatWindow from "../ui/chatWindow"
import { Employee } from "@/components/account/feature/employeeColumn"
import { Edit, Filter } from "lucide-react"
import { employeeData } from "@/components/teams/lib/employees"

const WorkplaceMain = () => {
  const [selectedContact, setSelectedContact] = useState<Employee | null>(null)


  return (
    <div className="flex h-full gap-2">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 border-r">
        {/* Sidebar Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h4 className="text-lg font-semibold">Chats</h4>
          <div className="flex items-center justify-between gap-2">
            <button>
              <Filter size={16} />
            </button>
            <button className="p-2 bg-sky-700 hover:bg-sky-600 rounded-full text-white">
              <Edit size={16} />
            </button>
          </div>
        </div>
        {employeeData.length > 0 ? (
          employeeData.map((employee) => (
            <WorkCard
              key={employee.id}
              name={employee.name}
              email={employee.email}
              phone={employee.phone}
              onClick={() => setSelectedContact(employee)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No contacts found.</p>
          </div>
        )}
      </div>

      {/* Chat Window */}
      <div className="flex-1 border-l">
        {selectedContact ? (
          <ChatWindow contact={selectedContact} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            {employeeData.length > 0
              ? "Select a contact to start chatting."
              : "No contacts found."}
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkplaceMain
