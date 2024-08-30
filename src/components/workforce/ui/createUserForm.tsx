// /components/lead/feature/CreateLeadForm.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import CreateUserCustomFormField from "@/components/dashboard/ui/createUserCustomFormField"
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum"
import { SelectItem } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

const workerFormSchema = z.object({
  first_name: z.string().min(1, { message: "First Name is required" }),
  second_name: z.string().optional(),
  last_name: z.string().min(1, { message: "Last Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email format"),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  supervisor: z.string().optional(),
})

const CreateWorkerForm = ({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof workerFormSchema>>({
    resolver: zodResolver(workerFormSchema),
    defaultValues: {
      first_name: "", // Default to an empty string or a sensible default
      second_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      supervisor: "D",
    },
  })

  async function onSubmit(values: z.infer<typeof workerFormSchema>) {
    setIsLoading(true)
    console.log({ ...values })
    try {
      toast({
        title: "User Created",
        variant: "dashboard",
      })
      form.reset()
      setIsLoading(false)
    } catch (error) {
      console.error("Error", error)
      setIsLoading(false)
    }
  }

  const supervisorOptions = ["A", "B", "C", "D", "E", "F"]

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 py-8 shadow-md px-12 mx-16 mt-8 "
      >
        <h6 className="text-sm font-bold">
          <span className="text-red-600">*</span> Required
        </h6>
        <Separator />
        <div className="flex flex-col md:flex-row gap-4">
          <p className="font-semibold text-sm mt-2 w-32 text-slate-800">
            {" "}
            Name:
          </p>
          <CreateUserCustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="first_name"
            label="First Name"
            placeholder="Avinash"
            required={true}
          />
          <CreateUserCustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="second_name"
            label="Second Name"
            placeholder="Kumar"
          />
          <CreateUserCustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="last_name"
            label="Last Name"
            placeholder="Jha"
            required={true}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <p className="font-semibold text-sm mt-2 w-32 before:content-['*'] before:text-red-600 text-slate-800">
            Username:
          </p>
          <CreateUserCustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="username"
            placeholder="Aj"
            required={true}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <p className="font-semibold text-sm mt-2 w-32 before:content-['*'] before:text-red-600 text-slate-800">
            Email:
          </p>
          <CreateUserCustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            placeholder="user@example.com"
            required={true}
          />

          {/* <CreateUserCustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="supervisor"
            placeholder="D"
          >
            {supervisorOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </CreateUserCustomFormField> */}
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <p className="font-semibold text-sm mt-2 w-32 before:content-['*'] before:text-red-600 text-slate-800">
            Phone:
          </p>
          <CreateUserCustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE}
            name="phone_number"
            placeholder="+91 9876543210"
            required={true}
          />
        </div>

        <Button
          type="submit"
          className="mx-auto block bg-dashboard-primary border border-dashboard-primary text-white hover:bg-dashboard-secondary"
        >
          Create
        </Button>
      </form>
    </Form>
  )
}

export default CreateWorkerForm
