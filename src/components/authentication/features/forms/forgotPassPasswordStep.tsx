"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import InputField from "../../ui/inputField"
import { Form } from "@/components/ui/form"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { paths } from "../../urls"

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long."),
  confirmPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters long."),
})

const ForgotPassPasswordStep = ({
  setLoading,
  onSuccess,
  isLoggedIn,
}: {
  setLoading: (loading: boolean) => void
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

  const { control, handleSubmit, register, setError, clearErrors, formState } =
    form
  const { errors } = formState

  // Watch for real-time validation
  const password = useWatch({ control, name: "password" })
  const confirmPassword = useWatch({ control, name: "confirmPassword" })

  // Validate passwords in real-time
  const handleValidation = () => {
    if (confirmPassword === "") {
      clearErrors("confirmPassword")
    } else if (password !== confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match." })
    } else {
      clearErrors("confirmPassword")
    }
  }

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      onSuccess()
      form.reset()
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
          <form onSubmit={handleSubmit(onSubmit)} onChange={handleValidation}>
            <InputField
              isPassword={true}
              field={register("password")}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <InputField
              isPassword={true}
              field={register("confirmPassword")}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}

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
