/**
 * @path src/components/authentication/features/forms/otpInputForm
 */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { paths } from "../../urls"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export default function ForgotPassOtpStep({
  onNext,
  onBack,
  setLoading,
  isLoggedIn,
}: {
  onNext: () => void
  onBack?: () => void
  setLoading: (loading: boolean) => void
  isLoggedIn: boolean
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate API call
      onNext()
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="gap-4 flex flex-col items-center justify-center border-0 md:border max-w-sm mx-auto shadow-none sm:shadow-none">
      <Form {...form}>
        <CardContent className="py-6">
          <CardTitle className="text-center font-medium md:text-xl text-lg text-gray-700">
            One-Time Password
          </CardTitle>
          <p className="text-gray-600 text-sm mb-8 text-center">
            Please enter the one-time password sent to your phone.
          </p>

          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="flex items-center justify-center w-fit mx-auto ">
                        <InputOTPSlot className=" border-gray-400" index={0} />
                        <InputOTPSlot className=" border-gray-400" index={1} />
                        <InputOTPSlot className=" border-gray-400" index={2} />
                        <InputOTPSlot className=" border-gray-400" index={3} />
                        <InputOTPSlot className=" border-gray-400" index={4} />
                        <InputOTPSlot className=" border-gray-400" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-2 rounded-md transition-all block w-full mt-6"
            >
              Next
            </Button>
          </form>
          {!isLoggedIn && (
            <div className="flex items-center justify-end text-gray-500 text-sm gap-4 mt-2">
              <Link
                href={paths.login}
                className="hover:text-sky-700 transition-colors"
              >
                Login
              </Link>
              <Link href={"/"} className="hover:text-sky-700 transition-colors">
                Register
              </Link>
            </div>
          )}
        </CardContent>
      </Form>
    </Card>
  )
}
