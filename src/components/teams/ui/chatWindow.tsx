import Avataar from "@/components/dashboard/ui/avataar"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Employee } from "@/components/account/feature/employeeColumn"
import { employeeData } from "../lib/employees"
import UserProfileModal from "./userProfileModal"

import { EllipsisVertical, Phone, Video } from "@/components/ui/icons"

const ChatWindow = ({
  contact,
  isNewChatMode,
  onContactSelect,
  additionalEmployees,
  setAdditionalEmployees,
}: {
  contact: Employee | null
  isNewChatMode: boolean
  onContactSelect: (contact: Employee) => void
  additionalEmployees: Employee[]
  setAdditionalEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
}) => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  )
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Combine employeeData and additionalEmployees for searching
  const combinedEmployees = [...employeeData, ...additionalEmployees]

  const filteredMembers = combinedEmployees.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectMember = (member: Employee) => {
    // Ensure the member is added to additionalEmployees if not already present
    if (
      !additionalEmployees.some((emp) => emp.id === member.id) &&
      !employeeData.some((emp) => emp.id === member.id)
    ) {
      setAdditionalEmployees([...additionalEmployees, member])
    }
    onContactSelect(member) // Set selected contact
    setSearchQuery("") // Clear search
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-1 flex flex-col border-b">
        {isNewChatMode ? (
          <>
            <Input
              placeholder="Search and add team members"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2"
            />
            {searchQuery && (
              <div className="border rounded bg-white shadow-md max-h-40 overflow-y-auto relative z-10">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                    onClick={() => handleSelectMember(member)}
                  >
                    {member.name}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : contact ? (
          <div className=" flex items-center justify-between">
            <UserProfileModal employee={contact}>
              <div className=" flex gap-2 items-center">
                <Avataar className="w-10 h-10" />
                <div>
                  <h3 className="font-medium leading-5">{contact.name}</h3>
                  <p className="text-gray-500 text-sm">{contact.email}</p>
                </div>
              </div>
            </UserProfileModal>
            <div className="flex items-center gap-2 justify-between">
              <button className="rounded-full border p-2 bg-slate-200 hover:bg-slate-200/75">
                <Phone size={16} />
              </button>
              <button className="rounded-full border p-2 bg-slate-200 hover:bg-slate-200/75">
                <Video size={16} />
              </button>
              <button className="rounded-full border p-2 bg-slate-200 hover:bg-slate-200/75">
                <EllipsisVertical size={16} />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Select a contact to chat</p>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.sender === "me"
                  ? "bg-blue-100 self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            No messages yet. Start the conversation!
          </p>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2 bg-white">
        <input
          type="text"
          className="flex-1 border-2 disabled:bg-gray-100 rounded-sm p-2 text-sm"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={isNewChatMode || !contact}
        />
        <button
          onClick={() => {
            setMessages([...messages, { sender: "me", text: newMessage }])
            setNewMessage("")
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-500"
          disabled={isNewChatMode || !contact}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatWindow
