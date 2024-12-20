/**
 * @path src/components/account/feature/addLocationForm.tsx
 */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { DialogTitle } from "@/components/ui/dialog"
import InputField from "@/components/authentication/ui/inputField"
import { MapPin } from "lucide-react"

const formSchema = z.object({
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
})

export function AddLocationForm({
  onAddLocation,
  onCancel,
}: {
  onAddLocation: (newLocation: {
    location: string
    totalEmployees: number
    activeEmployees: number
  }) => void
  onCancel: () => void
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
  })

 const onSubmit = (data: z.infer<typeof formSchema>) => {
   onAddLocation({
     location: data.location,
     totalEmployees: 0, // Default values for now
     activeEmployees: 0,
   })
 }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:space-y-8 space-y-4 sm:min-w-80 min-w-72"
      >
        <DialogTitle className="text-xl">Add a new Location</DialogTitle>
        <InputField
          field={form.register("location")}
          placeholder="Add a new Location"
          icon={<MapPin size={16} color="gray" />}
        />
        <Button type="submit" className="bg-sky-600 hover:bg-sky-700">
          Submit
        </Button>
      </form>
    </Form>
  )
}
