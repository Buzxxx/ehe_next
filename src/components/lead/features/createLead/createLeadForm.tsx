// /components/lead/feature/CreateLeadForm.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import CustomFormField from "@/components/dashboard/ui/customFormField"
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum"
import { CreateLeadFormSchema } from "@/lib/validation"
import { SelectItem } from "@/components/ui/select"
import { createLead } from "@/components/lead/features/leadApiClient"
import { useToast } from "@/components/ui/use-toast"

const CreateLeadForm = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof CreateLeadFormSchema>>({
    resolver: zodResolver(CreateLeadFormSchema),
    defaultValues: {
      name: "", // Default to an empty string or a sensible default
      email: "",
      contact: "",
      lead_type: "D", // Assuming "D" is a valid default
      query: "",
      interested_in: "",
      assigned_to: "Virat Kohli", // Default assigned person
      product_code: "",
      product_type: "A", // Assuming "A" is a valid default
      priority: "cold",
      status: 1,
    },
  })

  async function onSubmit(values: z.infer<typeof CreateLeadFormSchema>) {
    const leadData = {
      ...values,
      status: values.status ?? 1,
      source: values.source ?? "4",
    }

    try {
      const result = await createLead(leadData)
      if (result.lead) {
        console.log("Lead created successfully:", result)
        toast({
          title: "Lead created successfully",
          variant: "dashboard",
          description: `LeadId: ${result.lead}`,
        })
      } else {
        toast({
          title: "Something went wrong",
          variant: "destructive",
          description: `Please try again later or contact the administrator`,
        })
      }
    } catch (error) {
      console.error("Error creating lead:", error)
    } finally {
      form.reset()
    }
  }

  const leadTypeOptions = ["A", "B", "C", "D", "E", "F"]

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 px-4 py-8 md:shadow-md md:px-12 md:mx-8 mt-4 md:border-t border-gray-300"
      >
        <div className="grid grid-cols-fr md:grid-cols-3 sm:grid-cols-2 gap-4">
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
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="query"
            label="Query"
            placeholder="D"
          />
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
          />
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

          <div className="col-span-1  md:col-span-3">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name="interested_in"
              label="Interested In"
              placeholder="34432 Helium Fields, New York, NY"
              rows={1}
            />
          </div>
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
