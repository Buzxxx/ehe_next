// PropertyFormUI.tsx
"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"

interface PropertyFormUIProps {
  form: UseFormReturn<any>
  onSubmit: (values: any) => void
  bgClassName?: string
  formClassName?: string
}

const PropertyFormUI: React.FC<PropertyFormUIProps> = ({
  form,
  onSubmit,
  bgClassName = "",
  formClassName = "",
}) => (
  <Form {...form}>
    <div className={`relative w-full rounded-2xl shadow-xl ${bgClassName}`}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "bg-black/50 backdrop-blur-sm backdrop-grayscale-[.25] rounded-2xl p-6 md:p-8 xl:p-12 xl:py-16 shadow-sm",
          formClassName
        )}
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Name*"
                    {...field}
                    className="placeholder:text-xs bg-white/95 border rounded-md shadow-sm text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Email Address"
                    {...field}
                    className="placeholder:text-xs bg-white/95 border rounded-md shadow-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Phone Number*"
                    {...field}
                    className="placeholder:text-xs bg-white/95 border rounded-md shadow-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="mt-10 w-full bg-slate-950 hover:bg-slate-900 text-white py-2 rounded-md shadow-md shadow-slate-600/40 hover:shadow-slate-500/50 transition duration-200"
        >
          Submit
        </Button>
      </form>
    </div>
  </Form>
)

export default PropertyFormUI
