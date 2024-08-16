// /components/lead/feature/LeadProfileUpdateForm.tsx

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import filterCategories from "@/components/dashboard/library/filterCategories"
import CustomFormField from "@/components/dashboard/ui/customFormField"
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum"
import { FilterFormSchema } from "@/lib/validation"
import { SelectItem } from "@/components/ui/select"

const LeadProfileUpdateForm = () => {
  const form = useForm<z.infer<typeof FilterFormSchema>>({
    resolver: zodResolver(FilterFormSchema),
  })

  const onSubmit = async (data: z.infer<typeof FilterFormSchema>) => {
    console.log(data)
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
    <div className="form-wrapper py-2 max-md:px-4">
      <Form {...form}>
        <h2 className="pt-4 font-bold">Profile</h2>
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
            ></CustomFormField>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PHONE}
              name="phone"
              label="Phone Number"
              placeholder="+91 12345 67890"
            ></CustomFormField>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email"
              placeholder="example@user.com"
            ></CustomFormField>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="assignedTo"
              label="Assigned To"
              placeholder="Virat Kohli"
            ></CustomFormField>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="budget"
              label="Budget (in ₹) "
              placeholder="5,00,00,000"
            ></CustomFormField>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="sourceAssignedTo"
              label="Source Assigned To"
              placeholder="Virat Kohli"
            ></CustomFormField>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            {statusCategory && (
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="followUpStatus"
                label="Follow Up Status"
                placeholder={statusCategory.placeholder}
              >
                {statusCategory.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </CustomFormField>
            )}

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="interestedIn"
              label="Interested In"
              placeholder="34432 Helium Fields, New York, NY"
            ></CustomFormField>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="leadType"
              label="Lead Type"
              placeholder={"D"}
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
              name="productCode"
              label="Product Code"
              placeholder="sfsdf"
            ></CustomFormField>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="productType"
              label="Product Type Type"
              placeholder={"D"}
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
              name="receivedDate"
              label="Received Date"
              placeholder="2024-08-13 14:45:57"
            ></CustomFormField>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="query"
              label="Query"
              placeholder={"D"}
            ></CustomFormField>
            {sourceCategory && (
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="source"
                label="Source"
                placeholder="99 Acre"
              >
                {sourceCategory.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </CustomFormField>
            )}
          </div>

          <Button type="submit" variant={"default"} className="ml-auto block">
            Update & Close
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LeadProfileUpdateForm
