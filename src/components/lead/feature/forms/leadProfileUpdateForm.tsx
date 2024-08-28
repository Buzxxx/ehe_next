// /components/lead/feature/LeadProfileUpdateForm.tsx

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import filterCategories from "@/components/dashboard/library/filterCategories"
import CustomFormField from "@/components/dashboard/ui/customFormField"
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum"
import { LeadProfileFormSchema } from "@/lib/validation"
import { SelectItem } from "@/components/ui/select"

const LeadProfileUpdateForm = ({ id }: { id: string }) => {
  const form = useForm<z.infer<typeof LeadProfileFormSchema>>({
    resolver: zodResolver(LeadProfileFormSchema),
    defaultValues: {
      id: id,
      name: "",
      email: "",
      contact: "",
      lead_type: "A",
      query: "",
      interested_in: "",
      budget: "",
      assigned_to: "",
      product_code: "",
      received_date: new Date(Date.now()),
      status: "1",
      source: "",
      product_type: "A",
    },
  })

  const onSubmit = async (data: z.infer<typeof LeadProfileFormSchema>) => {
    try {
      console.log("Form data:", { ...data, id })
      // Add your submission logic here, e.g., API call
    } catch (error) {
      console.error("Submission error:", error)
    }
  }

  // Filter to get only the status field
  const statusCategory = filterCategories.find(
    (category) => category.name === "status"
  )

  const sourceCategory = filterCategories.find(
    (category) => category.name === "source"
  )

  const leadTypeOptions = ["A", "B", "C", "D", "E", "F"]

  return (
    <div className="form-wrapper py-2">
      {/* Make sure form props are passed correctly */}
      <Form {...form}>
        <h2 className="pt-4 font-bold">Profile</h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)} // Corrected submit handler
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
              fieldType={FormFieldType.PHONE}
              name="contact" // Correct field name for phone number
              label="Phone Number"
              placeholder="+91 12345 67890"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email"
              placeholder="example@user.com"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="assigned_to" // Correct field name
              label="Assigned To"
              placeholder="Virat Kohli"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4 md:max-w-[50%]">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="budget"
              label="Budget (in ₹)"
              placeholder="5,00,00,000"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            {statusCategory && (
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="status"
                label="Follow Up Status"
                placeholder={statusCategory.placeholder}
              >
                {statusCategory.options.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {String(option)}
                  </SelectItem>
                ))}
              </CustomFormField>
            )}

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="interested_in"
              label="Interested In"
              placeholder="34432 Helium Fields, New York, NY"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="lead_type"
              label="Lead Type"
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
              fieldType={FormFieldType.INPUT}
              name="product_code"
              label="Product Code"
              placeholder="sfsdf"
            />
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
              fieldType={FormFieldType.DATE_PICKER}
              name="received_date"
              label="Received Date"
              placeholder="2024-08-13 14:45:57"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="query"
              label="Query"
              placeholder="D"
            />
            {sourceCategory && (
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="source"
                label="Source"
                placeholder="99 Acre"
              >
                {sourceCategory.options.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </CustomFormField>
            )}
          </div>

          <Button
            type="submit"
            className="mx-auto block bg-dashboard-primary border border-dashboard-primary text-white hover:text-dashboard-primary"
          >
            Update & Close
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LeadProfileUpdateForm
