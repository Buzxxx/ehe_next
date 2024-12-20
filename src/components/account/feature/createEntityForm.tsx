// components/EntityForm.tsx
"use client"

import React, { useState } from "react"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash } from "lucide-react"
import { Entity } from "../entities"

const entitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  detail: z.string().optional(),
  headquarters: z.string().min(1, "Headquarters is required"),
  field: z.enum(["Technology", "Healthcare", "Finance", "Retail", "Other"], {
    errorMap: () => ({ message: "Select a valid business field" }),
  }),
  locations: z
    .array(z.string().min(1, "Location cannot be empty"))
    .min(1, "At least one location is required"),
})

type EntityFormValues = z.infer<typeof entitySchema>

export default function CreateEntityForm({
  onAddEntity,
}: {
  onAddEntity: (newEntity: Entity) => void
}) {
  const [locations, setLocations] = useState<string[]>([""])

  const form = useForm<EntityFormValues>({
    resolver: zodResolver(entitySchema),
    defaultValues: {
      name: "",
      detail: "",
      headquarters: "",
      field: undefined,
      locations: [""],
    },
  })

  const addLocation = () => setLocations([...locations, ""])
  const removeLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index))
    form.setValue(
      "locations",
      form.getValues("locations").filter((_, i) => i !== index)
    )
  }

const onSubmit = (data: EntityFormValues) => {
  const newEntity: Entity = {
    id: Date.now(), // Generate a unique ID for the entity
    name: data.name,
    description: data.detail || "",
    locations: data.locations.map((loc) => ({
      location: loc,
      totalEmployees: 0,
      activeEmployees: 0,
    })),
  }

  onAddEntity(newEntity)
}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:p-6 p-4 w-full mx-auto bg-white overflow-auto"
      >
        <h2 className="md:text-2xl text-lg font-semibold">Create Entity</h2>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entity Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter entity name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Details */}
        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter entity details (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Headquarters */}
        <FormField
          control={form.control}
          name="headquarters"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headquarters</FormLabel>
              <FormControl>
                <Input placeholder="Enter headquarters location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Business Field */}
        <FormField
          control={form.control}
          name="field"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Field</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Locations */}
        <FormField
          control={form.control}
          name="locations"
          render={() => (
            <FormItem>
              <FormLabel>Locations</FormLabel>
              <div className="space-y-2">
                {locations.map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        placeholder={`Location ${index + 1}`}
                        {...form.register(`locations.${index}` as const)}
                      />
                    </FormControl>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => removeLocation(index)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={addLocation}
                className="mt-2"
              >
                <Plus size={16} /> Add Location
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
