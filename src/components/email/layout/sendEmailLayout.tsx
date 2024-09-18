"use client"

import React, { useState } from "react"
import SendEmailForm from "../features/sendEmailForm"
import { Button } from "@/components/ui/button"

type RecipientType = "single" | "multiple"

const SendEmailLayout = () => {
  const [messagePreview, setMessagePreview] = useState("")
  const [recipientType, setRecipientType] = useState<RecipientType>("single")
  const [selectedTemplate, setSelectedTemplate] =
    useState<React.ReactNode | null>(null)

  // Handle recipient type change
  const handleRecipientTypeChange = (type: RecipientType) => {
    setRecipientType(type)
  }

  return (
    <div className="py-4">
      <div className="flex justify-start gap-4 ">
        <Button
          className={`${
            recipientType === "single"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-400"
          }`}
          onClick={() => handleRecipientTypeChange("single")}
        >
          Single
        </Button>
        <Button
          className={`${
            recipientType === "multiple"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-400"
          }`}
          onClick={() => handleRecipientTypeChange("multiple")}
        >
          Multiple
        </Button>
      </div>
      <div className="flex flex-col md:flex-row py-6">
        {/* Form Section */}
        <div className="md:w-3/4 bg-white rounded-lg shadow-md p-6">
          <SendEmailForm
            setMessagePreview={setMessagePreview}
            recipientType={recipientType}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            messagePreview={messagePreview} // Pass messagePreview as prop
          />
        </div>

        {/* Preview Section */}
        <div className="md:w-1/4 md:ml-4 mt-6 md:mt-0 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Message Preview</h3>

          {/* If a template is selected, render it */}
          {selectedTemplate ? (
            <div className="border p-4 rounded shadow-md bg-gray-50 w-full">
              {/* Pass messagePreview dynamically to the selected template */}
              {React.cloneElement(selectedTemplate as React.ReactElement, {
                message: messagePreview,
              })}
            </div>
          ) : (
            <p className="text-gray-500">No template selected.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SendEmailLayout
