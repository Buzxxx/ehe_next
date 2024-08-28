import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import filterCategories from "@/components/dashboard/library/filterCategories"
import CustomFormField from "@/components/dashboard/ui/customFormField"
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum"
import { LeadMeetingFormValidation } from "@/lib/validation"
import { SelectItem } from "@/components/ui/select"

const LeadMeetingForm = ({id}:{id:string}) => {
  const form = useForm<z.infer<typeof LeadMeetingFormValidation>>({
    resolver: zodResolver(LeadMeetingFormValidation),
    defaultValues: {
      id:id,
      date: new Date(Date.now()),
      location: '',
      meeting_reason: '',
      description: '',
    }
  })

  const onSubmit = async (data: z.infer<typeof LeadMeetingFormValidation>) => {
    console.log(data)
  }

  const meetingReasons = [
    "Meeting Requested",
    "Meeting Planned",
    "Follow up meeting",
    "Site Visit",
  ]

  return (
    <div className="form-wrapper py-2">
      <Form {...form}>
        <h2 className="pt-4 font-bold">Set Meeting</h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 py-8 px-4"
        >
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="date"
            label="Preferred Date & Time"
            showTimeSelect
            placeholder="dd-MM-yyyy h-mm"
            dateFormat="dd-MM-yyyy h:mm aa"
          ></CustomFormField>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="location"
            label="Location(Optional)"
            placeholder="Add a location (if required)"
          ></CustomFormField>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="meeting_reason"
            label="Reason for Meet"
            placeholder={meetingReasons[0]}
          >
            {meetingReasons.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="description"
            label="Description(Optional)"
            placeholder="Add a description (if required)"
          ></CustomFormField>

          <Button
            type="submit"
            className="mx-auto block bg-dashboard-primary border border-dashboard-primary text-white hover:text-dashboard-primary"
          >
            Set A Follow Up
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LeadMeetingForm
