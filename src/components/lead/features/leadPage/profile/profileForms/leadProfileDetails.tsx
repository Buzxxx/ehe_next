import React, { forwardRef, useImperativeHandle, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext"
import { useToast } from "@/components/ui/use-toast"
import { update_lead_on_server } from "../../../leadObject"

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty("Name is required"),
  contact: z.string().nonempty("Contact is required"),
  email: z.string().email("Invalid email address").optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

export interface LeadProfileDetailsRef {
  submit: () => void
}

interface LeadProfileDetailsProps {
  isEditing: boolean
}

const LeadProfileDetails = forwardRef<
  LeadProfileDetailsRef,
  LeadProfileDetailsProps
>(({ isEditing }, ref) => {
  const { leadProfile, setLeadProfile } = useLeadProfile()
  const { toast } = useToast()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: leadProfile.name || "",
      contact: leadProfile.contact || "",
      email: leadProfile.email || "",
      id: leadProfile.id.toString(),
    },
  })

  useEffect(() => {
    if (leadProfile) {
      form.reset({
        id: leadProfile?.id?.toString() || "",
        name: leadProfile?.name || "",
        contact: leadProfile?.contact?.toString() || "",
        email: leadProfile?.email || "",
      })
    }
  }, [leadProfile, form])

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data)
    try {
      const isLeadSaved = await update_lead_on_server(data)
      if (isLeadSaved) {
        setLeadProfile((prev) => ({
          ...prev,
          id: data.id || prev.id,
          name: data.name || prev.name,
          contact: data.contact || prev.contact,
          email: data.email || prev.email,
        }))
        toast({ title: "Profile updated successfully!", variant: "success" })
      } else {
        toast({ title: "Error updating database", variant: "destructive" })
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({ title: "An unexpected error occurred", variant: "destructive" })
    }
  }

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(onSubmit)()
    },
  }))

  return (
    <Form {...form}>
      <form className="space-y-2 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={!isEditing}
                  placeholder="Enter name"
                  {...field}
                  className="w-full disabled:cursor-default"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input
                  disabled={!isEditing}
                  placeholder="Enter contact"
                  {...field}
                  className="w-full disabled:cursor-default"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={!isEditing}
                  placeholder="Enter email"
                  {...field}
                  className="w-full disabled:cursor-default"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
})

LeadProfileDetails.displayName = "LeadProfileDetails"
export default LeadProfileDetails
