import { Path, useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import InputField from "@/components/authentication/ui/inputField"
import { ZodType } from "zod"

type StepFormProps<T> = {
  schema: ZodType<T>
  onSubmit: (values: T) => void
  title: string
  fields: { name: keyof T; label: string; type: string }[]
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  mx-auto  p-6 space-y-6"
      >
        <h2 className="text-center font-bold text-xl text-gray-800">
          {title}
        </h2>
        {fields.map((field) => (
          <div key={String(field.name)} className="space-y-1">
            <InputField
              label={field.label}
              placeholder={field.label}
              field={form.register(field.name as Path<T>)}
              isPassword={field.type === "password"}
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors[field.name as Path<T>] && (
              <p className="text-red-500 text-sm">
                {errors[field.name as Path<T>]?.message as string}
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center">
          {onBack && (
            <Button
              type="button"
              onClick={onBack}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-2 rounded-md transition-all"
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default StepForm
