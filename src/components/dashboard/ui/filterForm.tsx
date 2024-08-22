// components/FilterForm.tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import filterCategories from "../library/filterCategories"
import CustomFormField from "./customFormField"
import { FormFieldType } from "../library/formFieldEnum"
import { FilterFormSchema } from "@/lib/validation"
import { SelectItem } from "@/components/ui/select"

const FilterForm = ({ className }: { className: string }) => {
  const form = useForm<z.infer<typeof FilterFormSchema>>({
    resolver: zodResolver(FilterFormSchema),
  })

  // Watch the value of the "date" field
  const selectedDateOption = form.watch("date")

  const onSubmit = async (data: z.infer<typeof FilterFormSchema>) => {
    try {
      const response = await fetch("/api/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to send filter data")
      }
      console.log("good")
      // Handle success (e.g., updating UI or navigating)
    } catch (error) {
      console.error("Error:", error)
      // Handle error (e.g., show a notification)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        method="GET"
        className={`w-3/4 md:w-1/4 ml-auto space-y-4 absolute top-36 right-0 border-x h-screen border-slate-300 p-4 pb-16 duration-300 transition-all bg-charcoal-foregroundAccent overflow-scroll z-50 ${className}`}
      >
        {filterCategories.map((category) => {
          if (category.name === "date") {
            return (
              <div key={category.name}>
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.SELECT}
                  name={category.name}
                  label={category.label}
                  placeholder={category.placeholder}
                >
                  {category.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </CustomFormField>
                {/* Conditionally render date pickers if "Custom" is selected */}
                {selectedDateOption === "Custom" && (
                  <div className="flex gap-2 mt-2 flex-col space-y-2">
                    <CustomFormField
                      control={form.control}
                      fieldType={FormFieldType.DATE_PICKER}
                      name="dateFrom"
                      label="From"
                      placeholder="Select start date"
                    />
                    <CustomFormField
                      control={form.control}
                      fieldType={FormFieldType.DATE_PICKER}
                      name="dateTo"
                      label="To"
                      placeholder="Select end date"
                    />
                  </div>
                )}
              </div>
            )
          }

          return (
            <CustomFormField
              key={category.name}
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name={category.name}
              label={category.label}
              placeholder={category.placeholder}
            >
              {category.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </CustomFormField>
          )
        })}
        <Button
          type="submit"
          className="py-1 ml-1 bg-dashboard-primary hover:bg-dashboard-secondary"
        >
          Filter
        </Button>
      </form>
    </Form>
  )
}

export default FilterForm
