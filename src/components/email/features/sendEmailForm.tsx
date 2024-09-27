"use client"

import React, { Dispatch, SetStateAction, useState } from "react"
import CustomFormField from "@/components/dashboard/ui/customFormField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum"
import { Label } from "@/components/ui/label"
import EmailTemplateViewer from "./emailTemplateViewer"

// Validation schema for the form
const EmailFormSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  send_to: z.string().min(1, "At least one email address is required"),
  message: z.string().min(1, "Message is required"),
})

type SendEmailFormProps = {
  setMessagePreview: (message: string) => void
  recipientType: "single" | "multiple"
  selectedTemplate: React.ReactNode | null
  setSelectedTemplate: Dispatch<SetStateAction<React.ReactNode | null>>
  messagePreview: string
}

const SendEmailForm: React.FC<SendEmailFormProps> = ({
  setMessagePreview,
  recipientType,
  selectedTemplate,
  setSelectedTemplate,
  messagePreview,
}) => {
  const form = useForm<z.infer<typeof EmailFormSchema>>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      subject: "",
      send_to: "",
      message: "",
    },
  })

  const splitEmails = (emailString: string): string[] => {
    return emailString
      .split(";")
      .map((email) => email.trim())
      .filter((email) => email)
  }

  async function onSubmit(values: z.infer<typeof EmailFormSchema>) {
    const emailList = splitEmails(values.send_to)
    console.log("Emails to send to:", emailList)
    console.log("Subject:", values.subject)
    console.log("Message:", values.message)
  }

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessagePreview(event.target.value)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="send_to"
          placeholder="To"
        />
        <span className="text-xs text-gray-500 pl-2">
          Enter emails separated by semicolon &apos;;&apos;
        </span>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="subject"
          placeholder="Subject"
        />

        <div className="">
          <Label className=" text-gray-500 mb-2 block">Choose a template</Label>
          <EmailTemplateViewer
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            messagePreview={messagePreview}
          />
        </div>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="message"
          placeholder="Message"
          onChange={handleMessageChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Send Email
        </button>
      </form>
    </Form>
  )
}

export default SendEmailForm
