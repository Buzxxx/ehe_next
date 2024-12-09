import Avataar from "@/components/dashboard/ui/avataar"
import {
  EllipsisVertical,
  Phone,
  Video,
} from "@/components/ui/icons"
import { useState } from "react"
import UserProfileModal from "./userProfileModal"
import { Employee } from "@/components/account/feature/employeeColumn"

const ChatWindow = ({
  contact,
}: {
  contact: Employee
}) => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  )
  const [newMessage, setNewMessage] = useState("")

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-1 flex items-center justify-between border-b  ">
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
          <p className="text-gray-500 text-sm mb-2"></p>
        )}
      </div>
      <div className="p-4 border-t flex gap-2 bg-white">
        <input
          type="text"
          className="flex-1 border rounded-md p-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={() => console.log(newMessage)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatWindow
