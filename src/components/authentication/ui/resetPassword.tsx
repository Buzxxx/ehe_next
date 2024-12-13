"use client"

import { z } from "zod"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"

// Import dynamic from next/dynamic and InputFieldPlaceholder
import dynamic from "next/dynamic"
import InputFieldPlaceholder from "@/components/authentication/ui/inputFieldPlaceholder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const InputField = dynamic(
  () => import("@/components/authentication/ui/inputField"),
  {
    loading: () => <InputFieldPlaceholder />,
  }
)

const formSchema = z
  .object({
    oldPassword: z.string().nonempty("Old password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const ResetPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {}

  const handleCancel = () => {
    form.reset()
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="py-4">
        <CardTitle className="text-center font-semibold md:text-2xl text-lg">
          RESET PASSWORD
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <InputField
              label="Old Password"
              placeholder="old password"
              field={form.register("oldPassword")}
              isPassword={true}
            />
            <InputField
              label="New Password"
              placeholder="new password"
              field={form.register("newPassword")}
              isPassword={true}
            />
            <InputField
              label="Confirm New Password"
              placeholder="confirm new password"
              field={form.register("confirmPassword")}
              isPassword={true}
            />

            <div className="mt-4 text-slate-400 space-y-2 text-sm">
              <p>New password must contain:</p>
              <ul className="md:text-sm text-xs">
                <li>- At least 8 characters</li>
                <li>- At least 1 lowercase letter (a-z)</li>
                <li>- At least 1 uppercase letter (A-Z)</li>
                <li>- At least 1 number (0-9)</li>
                <li>- At least 1 special character</li>
              </ul>
            </div>
            <div className="gap-2 w-fit flex flex-row justify-between mt-4 h-10 items-center">
              <Button type="submit" className="bg-sky-600 hover:bg-sky-700">
                Change
              </Button>
              <Button
                type="button"
                className="text-gray-600 border border-gray-400 bg-transparent hover:bg-muted"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ResetPassword
