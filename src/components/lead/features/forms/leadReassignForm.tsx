"use client"

import CustomFormField from "@/components/dashboard/ui/customFormField"
import { LeadReassignFormSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum"
import { Button } from "@/components/ui/button"
import { SelectItem } from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface LeadReassignFormProps {
  leadIds: number[]
}
const LeadReassignForm: React.FC<LeadReassignFormProps> = ({ leadIds })=> {
  const router = useRouter()
  const form = useForm<z.infer<typeof LeadReassignFormSchema>>({
    resolver: zodResolver(LeadReassignFormSchema),
  })



  const onSubmit = async (data: z.infer<typeof LeadReassignFormSchema>) => {
    console.log(data, leadIds)
  }

  const users = Array.from({ length: 5 }, (_, i) => `User ${i + 1}`)

  return (
    <Form {...form}>
      <h2 className="text-2xl font-bold md:p-4">Reassign</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="assignTo"
          label="Assign to"
          placeholder="Select User"
        >
          {users.map((user) => (
            <SelectItem key={user} value={user}>
              {user}
            </SelectItem>
          ))}
        </CustomFormField>
        <div className="flex gap-2 justify-end">
          <Button
            type="reset"
            onClick={() => router.back()}
            className="bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 "
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className=" text-white border border-sky-600  bg-sky-600 hover:bg-sky-500"
          >
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default LeadReassignForm
