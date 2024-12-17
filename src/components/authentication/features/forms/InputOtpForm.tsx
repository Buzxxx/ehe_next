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

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export function InputOTPForm({
  onBack,
  onSubmit,
}: {
  onBack?: () => void
  onSubmit: (values: { otp: string }) => Promise<void>
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  })

  return (
    <Form {...form}>
      <div className="flex flex-col">
        <h1 className="text-center font-bold md:text-2xl text-xl mb-8">
          One-Time Password
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <div className="mt-16">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="flex items-center justify-center w-fit mx-auto">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="mt-4">
                    Please enter the one-time password sent to your phone.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center w-full  mt-16">
            {onBack && (
              <Button
                type="button"
                onClick={onBack}
                className=" hover:bg-transparent bg-transparent hover:border-gray-500 bgtr text-gray-600 px-0 py-2 rounded-md transition"
              >
                <ArrowLeft />
                Back to Login
              </Button>
            )}
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-2 rounded-md transition-all block ml-auto"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </Form>
  )
}
