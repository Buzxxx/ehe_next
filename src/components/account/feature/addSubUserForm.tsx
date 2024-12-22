// components/EmployeeForm.tsx
"use client"

import React, { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash } from "lucide-react"

import { Employee } from "./employeeColumn"
import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import CustomFormField from "@/components/dashboard/ui/customFormField"
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum"

// Zod Schema for Employee Validation
const employeeSchema = z.object({
  name: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Surname is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Enter a valid email address"),
  location: z.string().min(1, "Location is required"),
  manager: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  dob: z.date().optional(),
  aliasNames: z.array(z.string().min(1, "Alias cannot be empty")).optional(),
})

type EmployeeFormValues = z.infer<typeof employeeSchema>

export default function AddSubUserForm({
  onAddEmployee,
}: {
  onAddEmployee: (newEmployee: Employee) => void
}) {
  const [aliasNames, setAliasNames] = useState<string[]>([""])
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      surname: "",
      phoneNumber: "",
      email: "",
      location: "",
      manager: "",
      role: "",
      dob: undefined,
      aliasNames: [""],
    },
  })

  const addAliasName = () => setAliasNames([...aliasNames, ""])
  const removeAliasName = (index: number) => {
    setAliasNames(aliasNames.filter((_, i) => i !== index))
    form.setValue(
      "aliasNames",
      form.getValues("aliasNames")?.filter((_, i) => i !== index)
    )
  }

  const onSubmit = (data: EmployeeFormValues) => {
    const newEmployee: Employee = {
      id: 0, // ID will be set by the parent
      name: `${data.name} ${data.surname}`,
      email: data.email,
      phone: data.phoneNumber,
      status: "active",
      teamId: 1, // Adjust as needed
      role: data.role,
      date_joined: new Date().toISOString().split("T")[0],
    }
    onAddEmployee(newEmployee)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:p-0 p-4 w-full mx-auto bg-white shadow-lg "
      >
        <h2 className="text-xl font-semibold">Add Employee</h2>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Surname */}
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="Enter surname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <CustomFormField
          control={form.control}
          name="phoneNumber"
          fieldType={FormFieldType.PHONE}
          label="Phone Number"
        />

        {/* Email Address */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email address"
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Manager (Searchable Dropdown) */}
        <FormField
          control={form.control}
          name="manager"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manager</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Manager 1</SelectItem>
                    <SelectItem value="2">Manager 2</SelectItem>
                    <SelectItem value="3">Manager 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Department */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Software</SelectItem>
                    <SelectItem value="2">Cyber security</SelectItem>
                    <SelectItem value="3">IT</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of Birth */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP") // Format the date
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date)} // Handle date selection
                    disabled={
                      (date) =>
                        date > new Date() || date < new Date("1900-01-01") // Disable future and too old dates
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Alias Names */}
        <FormField
          control={form.control}
          name="aliasNames"
          render={() => (
            <FormItem>
              <FormLabel>Alias Names</FormLabel>
              <div className="space-y-2">
                {aliasNames.map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        placeholder={`Alias ${index + 1}`}
                        {...form.register(`aliasNames.${index}` as const)}
                      />
                    </FormControl>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => removeAliasName(index)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={addAliasName}
                className="mt-2"
              >
                <Plus size={16} /> Add Alias
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
          Submit
        </Button>
      </form>
    </Form>
  )
}
