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

const LeadCallbackForm = () => {
  const form = useForm<z.infer<typeof FilterFormSchema>>({
    resolver: zodResolver(FilterFormSchema),
  })

  const onSubmit = async (data: z.infer<typeof FilterFormSchema>) => {
    console.log(data)
  }

  return (
    <div className="form-wrapper py-2 max-md:px-4">
      <Form {...form}>
        <h2 className="pt-4 font-bold">Follow Up Call</h2>
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
            placeholder="dd-mm-yyyy h:mm"
            dateFormat="dd-MM-yyyy h:mm aa"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="description"
            label="Description"
            placeholder="Add a description (if required)"
          ></CustomFormField>

          <Button
            type="submit"
            className="mx-auto block text-white border border-dashboard-primary  bg-dashboard-primary hover:text-dashboard-primary"
          >
            Set A Follow Up
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LeadCallbackForm
