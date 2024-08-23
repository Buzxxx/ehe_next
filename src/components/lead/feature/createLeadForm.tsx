// /components/lead/feature/CreateLeadForm.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import filterCategories from "@/components/dashboard/library/filterCategories"
import CustomFormField from "@/components/dashboard/ui/customFormField"
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum"
import { CreateLeadFormSchema } from "@/lib/validation"
import { SelectItem } from "@/components/ui/select"
import LeadApiClient from "@/lib/leadApiClient"

const CreateLeadForm = () => {
  const form = useForm<z.infer<typeof CreateLeadFormSchema>>({
    resolver: zodResolver(CreateLeadFormSchema),
  })

  const onSubmit = async (data: z.infer<typeof CreateLeadFormSchema>) => {
    console.log("Form data:", data) // Log form data on submit
    const leadData = {
      ...data,
      status: data.status ?? 1, // Default to 1 if not provided
      source: data.source ?? "4", // Default to "4" if not provided
    }

    console.log("Prepared Lead Data:", leadData) // Log the data before submission

    try {
      const result = await LeadApiClient.createLead(leadData)
      console.log("Lead created successfully:", result)
    } catch (error) {
      console.error("Error creating lead:", error)
    }
  }

  const leadTypeOptions = ["A", "B", "C", "D", "E", "F"]

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 py-8 px-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Name"
            placeholder="Kapil Dev"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email"
            placeholder="example@user.com"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE}
            name="contact"
            label="Phone Number"
            placeholder="+91 12345 67890"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="lead_type"
            label="Lead Type"
            placeholder="D"
          >
            {["A", "B", "C", "D", "E", "F"].map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="query"
            label="Query"
            placeholder="D"
          ></CustomFormField>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="interested_in"
            label="Interested In"
            placeholder="34432 Helium Fields, New York, NY"
          ></CustomFormField>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="assigned_to"
            label="Assigned To"
            placeholder="Virat Kohli"
          >
            <SelectItem key={"Avinash"} value={"Avinash Jha"}>
              {"Avinash Jha"}
            </SelectItem>
          </CustomFormField>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="product_code"
            label="Product Code"
            placeholder="sfsdf"
          ></CustomFormField>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="product_type"
            label="Product Type"
            placeholder="D"
          >
            {leadTypeOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="priority"
            label="Priority"
            placeholder="Cold"
          >
            <SelectItem key={"cold"} value={"cold"}>
              {"cold"}
            </SelectItem>
          </CustomFormField>
        </div>

        <Button
          type="submit"
          className="mx-auto block bg-dashboard-primary border border-dashboard-primary text-white hover:text-dashboard-primary"
        >
          Create
        </Button>
      </form>
    </Form>
  )
}

export default CreateLeadForm
