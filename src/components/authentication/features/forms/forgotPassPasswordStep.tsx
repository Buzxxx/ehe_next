/**
 * @path src/components/authentication/layouts/forgotPasswordLayouts/PasswordStep.tsx
 */

"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import InputField from "../../ui/inputField"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { paths } from "../../urls"

const resetPasswordSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})

const ForgotPassPasswordStep = ({
  setLoading,
  onBack,
  onSuccess,
  isLoggedIn,
}: {
  setLoading: (loading: boolean) => void
  onBack: () => void
  onSuccess: () => void
  isLoggedIn: boolean
}) => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password.length < 6 || confirmPassword.length < 6) {
      setError("Passwords must be at least 6 characters.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate API call
      onSuccess()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="gap-4 flex flex-col items-center justify-center border-0 md:border max-w-sm mx-auto shadow-none sm:shadow-none">
      <Form {...form}>
        <CardContent className="py-6 w-full min-w-80">
          <CardTitle className="text-center font-medium md:text-xl text-lg text-gray-700">
            Reset Password
          </CardTitle>
          <p className="text-gray-600 text-sm mb-8 text-center">
            Please set your new password.
          </p>
          <form onSubmit={handleSubmit}>
            <InputField
              isPassword={true}
              field={form.register("password")}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded"
            />

            <InputField
              isPassword={true}
              field={form.register("confirmPassword")}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit
            </Button>
          </form>
          {!isLoggedIn && (
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
          )}
        </CardContent>
      </Form>
    </Card>
  )
}

export default ForgotPassPasswordStep
