// components/FilterForm.tsx

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import ReusableSelect from "@/components/dashboard/ui/reusableSelect"
import filterCategories from "../library/filterCategories"

const FormSchema = z.object({
  status: z.string(),
  user: z.string(),
  source: z.string(),
  location: z.string(),
  date: z.string(),
})

const FilterForm = ({ className }: { className: string }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  return (
    <Form {...form}>
      <form
        method="GET"
        className={`w-1/4 ml-auto space-y-4 absolute right-0 border-x h-screen border-slate-300 p-4 duration-300 transition-all ${className}`}
      >
        {filterCategories.map((category) => (
          <ReusableSelect
            key={category.name}
            name={category.name}
            label={category.label}
            control={form.control}
            options={category.options}
            placeholder={category.placeholder}
          />
        ))}
        <Button type="submit" className="py-1 ml-1">
          Filter
        </Button>
      </form>
    </Form>
  )
}

export default FilterForm
