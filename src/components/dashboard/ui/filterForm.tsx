import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import filterCategories from "../library/filterCategories"
import CustomFormField from "./customFormField"
import { FormFieldType } from "../library/formFieldEnum"
import { FilterFormSchema } from "@/lib/validation"
import { SelectItem } from "@/components/ui/select"
import leadApiClient, { Lead } from "@/lib/leadApiClient"

const FilterForm = ({ className }: { className: string }) => {
  const form = useForm<z.infer<typeof FilterFormSchema>>({
    resolver: zodResolver(FilterFormSchema),
  })

  const formValues = useWatch({ control: form.control })

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Use the router only if on the client-side

      const queryParams = new URLSearchParams()
      Object.entries(formValues).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value.toString())
        }
      })

      const newUrl = `${window.location.pathname}?${queryParams.toString()}`
      window.history.replaceState(null, "", newUrl)
    }
  }, [formValues])

  const onSubmit = async (data: z.infer<typeof FilterFormSchema>) => {
    try {
      // Initialize a new Lead instance
      const lead = new Lead()

      // Map form data to the API request fields
      const filterParams = []

      if (data.status) filterParams.push(`status:${data.status}`)
      if (data.user) filterParams.push(`user:${data.user}`)
      if (data.source) filterParams.push(`source:${data.source}`)
      if (data.location) filterParams.push(`location:${data.location}`)
      if (data.date) {
        if (typeof data.date === "string") {
          filterParams.push(`date:${data.date}`)
        } else {
          filterParams.push(`date:${data.date.start},${data.date.end}`)
        }
      }

      if (filterParams.length > 0) {
        lead.setFilterBy(filterParams.join(";"))
      }

      // Fetch leads using the API client
      const fetchedLeads = await leadApiClient.getLeads(lead)
      console.log("Fetched Leads:", fetchedLeads)

      // Handle the fetched leads (e.g., update UI)
    } catch (error) {
      console.error("Error fetching leads:", error)
      // Handle error (e.g., show a notification)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        method="GET"
        className={`w-3/4 md:w-1/4 ml-auto space-y-4 absolute min-h-full top-[6.5rem] right-0 border-x  border-slate-300 p-4 pb-16 duration-300 transition-all bg-charcoal-foregroundAccent overflow-scroll z-50 ${className}`}
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
                    <SelectItem key={option} value={option.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </CustomFormField>
                {formValues.date === "Custom" && (
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
                <SelectItem key={option} value={option.toString()}>
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
