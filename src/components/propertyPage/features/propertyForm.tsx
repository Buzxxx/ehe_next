"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(13, "Phone number should not exceed 13 digits."),
})

const PropertyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="md:mt-10 mt-4 flex-1">
      <Form {...form}>
        <h2 className="text-lg md:text-xl font-bold  mb-4">Inquire Now</h2>
        <div className="relative w-full bg-center rounded-2xl shadow-xl border-slate-400 bg-fixed bg-[url('/property/property1.webp')] bg-cover">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" bg-black/50 backdrop-blur-sm backdrop-grayscale-[.25] rounded-2xl p-6 md:p-8 xl:p-12 xl:py-16 shadow-sm"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-white font-medium">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name*"
                        {...field}
                        className="placeholder:text-xs bg-white/95 border  rounded-md shadow-sm"
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
                    <FormLabel className="text-white font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Email Address"
                        {...field}
                        className="placeholder:text-xs bg-white/95 border  rounded-md shadow-sm"
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
                    <FormLabel className="text-white font-medium ">
                      Phone
                    </FormLabel>
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
    </div>
  )
}

export default PropertyForm
