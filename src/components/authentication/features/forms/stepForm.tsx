/**
 * @path src/components/authentication/features/forms/stepForm.tsx
 */

import { Path, useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import InputField from "@/components/authentication/ui/inputField"
import { ZodType } from "zod"
import { Mail } from "@/components/ui/icons"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type StepFormProps<T> = {
  schema: ZodType<T>
  onSubmit: (values: T) => void
  title: string
  fields: { name: keyof T; label: string; type: string; placeholder?: string, icon?: React.ReactNode }[]
  onBack?: () => void
}

const StepForm = <T extends Record<string, any>>({
  schema,
  onSubmit,
  title,
  fields,
  onBack,
}: StepFormProps<T>) => {
  const form: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
  })

  const {
    formState: { errors },
  } = form

  return (
    <Form {...form}>
      <div className="flex flex-col h-full justify-between ">
        <div className="text-center">
          <h1 className="text-center font-bold md:text-2xl text-xl uppercase">
            {title}
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Please enter your registered email address{" "}
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full text-sm flex-1 mt-12"
        >
          {fields.map((field) => (
            <div key={String(field.name)} className="space-y-1">
              <InputField
                label={field.label}
                placeholder={field.placeholder || field.label}
                field={form.register(field.name as Path<T>)}
                isPassword={field.type === "password"}
                icon={field.icon || null}
              />
              {errors[field.name as Path<T>] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name as Path<T>]?.message as string}
                </p>
              )}
            </div>
          ))}

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

          <p className="mt-16 text-gray-600 text-center">
            Not a member yet?{" "}
            <Link href="#" className="text-indigo-600 font-medium">
              {" "}
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default StepForm
