/**
 * @path src/components/authentication/features/forms/stepForm.tsx
 */

import { Path, useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import InputField from "@/components/authentication/ui/inputField"
import { ZodType } from "zod"
import Link from "next/link"
import { paths } from "../../urls"

type StepFormProps<T> = {
  schema: ZodType<T>
  onSubmit: (values: T) => void
  title: string
  description?: string
  fields: {
    name: keyof T
    label?: string
    type: string
    placeholder?: string
    icon?: React.ReactNode
  }[]
  onBack?: () => void
}

const StepForm = <T extends Record<string, any>>({
  schema,
  onSubmit,
  title,
  fields,
  onBack,
  description,
}: StepFormProps<T>) => {
  const form: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
  })

  const {
    formState: { errors },
  } = form

  return (
    <Form {...form}>
      <div className="flex flex-col h-full justify-between w-full">
        <div className="text-center">
          <h1 className="text-center font-bold md:text-2xl text-xl uppercase">
            {title}
          </h1>
          <p className="text-gray-500 text-sm mb-10 text-pretty">
            {description}
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full text-sm flex-1 mt-10"
        >
          {fields.map((field) => (
            <div key={String(field.name)} className="space-y-1">
              <InputField
                label={field.label}
                placeholder={field.placeholder || ""}
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

          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-2 rounded-md transition-all block w-full mt-4"
          >
            Next
          </Button>
          <div className="flex items-center justify-end text-gray-500 text-sm gap-4 mt-2">
            <Link
              href={paths.login}
              className="hover:text-sky-700 transition-colors"
            >
              Login{" "}
            </Link>
            <Link href={"/"} className="hover:text-sky-700 transition-colors">
              Register{" "}
            </Link>
          </div>
        </form>
      </div>
    </Form>
  )
}

export default StepForm
