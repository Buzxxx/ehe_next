import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import CustomFormField from "@/components/dashboard/ui/customFormField"
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum"
import { SelectItem } from "@/components/ui/select"
import OverlayLoading from "@/components/ui/overlayLoading"
import { Spinner } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import { useLeadProfile } from "../context/leadProfileContext"
import {
  LeadStatus,
  DefaultLeadStatus,
  get_lead_status_controller,
} from "../statusObject"

export const LeadStatusUpdateFormSchema = z.object({
  id: z.string(),
  status: z.string(),
  priority: z.string(),
  description: z.string().optional(),
})

const LeadStatusUpdateForm = ({
  id,
  setOpen,
}: {
  id: string
  setOpen?: (arg0: boolean) => void
}) => {
  const { leadProfile } = useLeadProfile()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [statusList, setStatusList] = useState<LeadStatus[]>([
    DefaultLeadStatus,
  ])

  useEffect(() => {
    const fetchStatusList = async () => {
      try {
        setIsLoading(true)
        const statusList = await get_lead_status_controller()
        setStatusList(statusList.statusList)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStatusList()
  }, [])

  // Use `useForm` with dynamic default values
  const form = useForm<z.infer<typeof LeadStatusUpdateFormSchema>>({
    resolver: zodResolver(LeadStatusUpdateFormSchema),
    defaultValues: {
      id: id,
      status: leadProfile?.status?.status || DefaultLeadStatus.status,
      priority: "cold",
      description: "",
    },
  })

  // Update `status` default value if `leadProfile` updates
  useEffect(() => {
    if (leadProfile?.status?.status) {
      form.reset({
        ...form.getValues(),
        status: leadProfile.status.id.toString(),
      })
    }
  }, [leadProfile, form])

  const onSubmit = async (data: z.infer<typeof LeadStatusUpdateFormSchema>) => {
    setIsLoading(true)
    console.log({ ...data, id })
    setTimeout(() => {
      setIsLoading(false)
      setOpen && setOpen(false)

      toast({
        title: `Timeline updated!`,
      })
    }, 1000)
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full bg-gray-50 h-fit my-auto border p-4 rounded-md"
        >
          <div className="flex  gap-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="status"
              label="Status"
              placeholder="Status"
            >
              {statusList.map((status) => (
                <SelectItem
                  key={status.id}
                  value={status.id.toString()}
                  disabled={status.status === "New"}
                >
                  {status.status}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="priority"
              label="Priority"
              placeholder="Priority"
            >
              <SelectItem key="cold" value="cold">
                Cold
              </SelectItem>
              <SelectItem key="warm" value="warm">
                Warm
              </SelectItem>
              <SelectItem key="hot" value="hot">
                Hot
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
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              onClick={() => form.reset()}
              className=" text-slate-800 bg-transparent border border-slate-600 hover:border-slate-900 hover:text-slate-900"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className=" bg-sky-600 border border-sky-600 text-white hover:bg-sky-500"
            >
              Update
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default LeadStatusUpdateForm
