/**
 * @path src/components/authentication/layouts/forgotPasswordLayouts/EmailStep.tsx
 */

"use client"

import { Form } from "@/components/ui/form"
import { z } from "zod"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import InputField from "../../ui/inputField"
import { Button } from "@/components/ui/button"
import { paths } from "../../urls"
import Link from "next/link"
import { Mail } from "lucide-react"

const ForgotPassEmailStepFormSchema = z.object({
  email: z.string().email({
    message: "Invalid Email Address.",
  }),
})

const ForgotPassEmailStep = ({
  onNext,
  setLoading,
  onBack,
}: {
  onNext: (email: string) => void
  setLoading: (loading: boolean) => void
  onBack: () => void
}) => {
  const form = useForm<z.infer<typeof ForgotPassEmailStepFormSchema>>({
    resolver: zodResolver(ForgotPassEmailStepFormSchema),
    defaultValues: {
      email: "",
    },
  })
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate API call
      onNext(email)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="gap-4 flex flex-col items-center justify-center border-0 md:border">
      <Form {...form}>
        <CardContent className="py-6">
          <CardTitle className="text-center font-medium md:text-xl text-lg text-gray-700">
            Password Reset
          </CardTitle>
          <p className="text-gray-600 text-sm mb-8 text-center">
            Please enter your registered email address to reset your password
          </p>

          <form onSubmit={handleSubmit}>
            <InputField
              field={form.register("email")}
              placeholder="Enter your email"
              icon={<Mail size={16} color="gray" />}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Next
            </Button>
          </form>
          <div className="flex gap-4 items-center justify-end text-sm mt-2">
            <Link
              href={paths.login}
              className=" text-gray-500 hover:text-sky-500 "
            >
              Login
            </Link>
            <Link href={"#"} className="text-gray-500 hover:text-sky-500 ">
              Register
            </Link>
          </div>
        </CardContent>
      </Form>
    </Card>
  )
}

export default ForgotPassEmailStep
