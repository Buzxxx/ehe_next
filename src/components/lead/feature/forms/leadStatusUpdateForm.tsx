// LeadStatusUpdateForm.tsx
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import filterCategories from "@/components/dashboard/library/filterCategories"
import CustomFormField from "@/components/dashboard/ui/customFormField"
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum"
import { LeadStatusUpdateFormSchema } from "@/lib/validation"
import { SelectItem } from "@/components/ui/select"

const LeadStatusUpdateForm = ({ id }: { id: string }) => {
  const form = useForm<z.infer<typeof LeadStatusUpdateFormSchema>>({
    resolver: zodResolver(LeadStatusUpdateFormSchema),
    defaultValues: {
      id: id,
      status: "",
      priority: "",
      description: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof LeadStatusUpdateFormSchema>) => {
    console.log({ ...data })
  }

  // Filter to get only the status field
  const statusCategory = filterCategories.find(
    (category) => category.name === "status"
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex  gap-4">
          {statusCategory && (
            <CustomFormField
              key={statusCategory.name}
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name={statusCategory.name}
              label={statusCategory.label}
              placeholder={statusCategory.placeholder}
            >
              {statusCategory.options.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </CustomFormField>
          )}

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="priority"
            label="Priority"
            placeholder="Priority"
          >
            <SelectItem key={"cold"} value={"cold"}>
              {"cold"}
            </SelectItem>
          </CustomFormField>
        </div>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="description"
          label="Description"
          placeholder="Description"
        ></CustomFormField>
        <Button
          type="submit"
          className=" border border-dashboard-primary text-white bg-dashboard-primary hover:text-dashboard-primary"
        >
          Update
        </Button>
        <Button type="button" className="ml-4" variant={"destructive"}>
          Cancel
        </Button>
      </form>
    </Form>
  )
}

export default LeadStatusUpdateForm
