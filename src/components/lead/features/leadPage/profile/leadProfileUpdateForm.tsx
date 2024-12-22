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
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import OverlayLoading from "@/components/ui/overlayLoading"
import { Spinner } from "@/components/ui/icons"

const LeadProfileUpdateForm = ({
  id,
  isEditing,
}: {
  id: string
  isEditing: boolean
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
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
    {
      setIsLoading(true)
      console.log({ ...data, id })
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: `Lead Profile Updated Successfully!`,
        })
      }, 1000)
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

  const renderFieldView = (label: string, value: string | number) => (
    <div className="mb-4">
      <h3 className="text-sm text-gray-500">{label}</h3>
      <p className="text-lg text-gray-900">{value || "N/A"}</p>
    </div>
  )

  return (
    <div className="form-wrapper py-2">
      {isLoading ? (
        <OverlayLoading>
          <Spinner className="w-8 h-8 md:w-14 md:h-16 "></Spinner>
        </OverlayLoading>
      ) : null}
      <Form {...form}>
        <h2 className="pt-4 font-bold">Profile</h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 py-8 px-4"
        >
          <div className="grid grid-cols-fr  sm:grid-cols-2 gap-4">
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
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="budget"
              label="Budget (in ₹)"
              placeholder="5,00,00,000"
            />
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
            <div className="col-span-1  md:col-span-2">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="interested_in"
                label="Interested In"
                placeholder="34432 Helium Fields, New York, NY"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              onClick={() => form.reset()}
              className=" text-slate-800 bg-transparent border border-slate-600 hover:border-slate-900 hover:text-slate-900"
            >
              Reset All
            </Button>

            <Button
              type="submit"
              className=" bg-sky-600 border border-sky-600 text-white hover:bg-sky-500"
            >
              Update & Close
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default LeadProfileUpdateForm
