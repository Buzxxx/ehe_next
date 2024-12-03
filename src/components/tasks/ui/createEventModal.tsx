/**
 * @path src/components/tasks/ui/createEventModal.tsx
 */


"use client"
import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

// Schema for form validation
const eventSchema = z
  .object({
    title: z.string().min(2, "Title is too short").max(50, "Title is too long"),
    description: z.string().optional(),
    date: z.string().nonempty("Date is required"),
    startTime: z.string().nonempty("Start time is required"),
    endTime: z.string().nonempty("End time is required"),
    teamMembers: z.array(z.string()).optional(),
  })
  .refine(
    (data) =>
      new Date(`${data.date}T${data.endTime}`) >
      new Date(`${data.date}T${data.startTime}`),
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  )

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (event: {
    title: string
    description?: string
    start: Date
    end: Date
    teamMembers: string[]
  }) => void
  defaultEvent?: {
    title: string
    description?: string
    start: Date
    end: Date
    teamMembers?: string[]
  }
  isEditing?: boolean
}

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  isEditing, // Use the explicit prop
  defaultEvent,
}: EventModalProps) {
  const [teamSearch, setTeamSearch] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

const form = useForm<z.infer<typeof eventSchema>>({
  resolver: zodResolver(eventSchema),
  defaultValues: {
    title: defaultEvent?.title || "",
    description: defaultEvent?.description || "",
    teamMembers: defaultEvent?.teamMembers || [],
    date: defaultEvent
      ? defaultEvent.start.toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    startTime: defaultEvent
      ? defaultEvent.start.toTimeString().slice(0, 5)
      : "08:00",
    endTime: defaultEvent
      ? defaultEvent.end.toTimeString().slice(0, 5)
      : "09:00",
  },
})


  const handleSave = form.handleSubmit((values) => {
    const startDateTime = new Date(`${values.date}T${values.startTime}`)
    const endDateTime = new Date(`${values.date}T${values.endTime}`)

    onSave({
      ...values,
      start: startDateTime,
      end: endDateTime,
      teamMembers: selectedMembers,
    })

    form.reset()
    setSelectedMembers([])
    onClose()
  })

  const teamMembers = ["Alice", "Bob", "Charlie", "David", "Eve"]

  const handleSelectMember = (member: string) => {
    if (!selectedMembers.includes(member)) {
      setSelectedMembers([...selectedMembers, member])
    }
    setTeamSearch("")
  }

  const handleRemoveMember = (member: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== member))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl p-6 max-h-[600px] overflow-auto">
        <Form {...form}>
          <form onSubmit={handleSave} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-800">
                {isEditing ? defaultEvent?.title : "Create New Event"}
              </DialogTitle>
            </DialogHeader>

            {/* Separate Date, Start Time, and End Time Inputs */}
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Team Members */}
            <FormItem className="relative">
              <FormLabel>Team Members</FormLabel>
              <Input
                placeholder="Search and add team members"
                value={teamSearch}
                onChange={(e) => setTeamSearch(e.target.value)}
                className="mb-2"
              />
              {teamSearch && (
                <div className="border rounded bg-white shadow-md max-h-40 overflow-y-auto absolute w-full">
                  {teamMembers
                    .filter((member) =>
                      member.toLowerCase().includes(teamSearch.toLowerCase())
                    )
                    .map((member) => (
                      <div
                        key={member}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                        onClick={() => handleSelectMember(member)}
                      >
                        {member}
                      </div>
                    ))}
                </div>
              )}
              <div className="flex flex-wrap mt-2 space-x-2">
                {selectedMembers.map((member) => (
                  <Badge
                    key={member}
                    className="flex items-center bg-sky-100 text-sky-700 px-2 py-1 rounded-full"
                  >
                    {member}
                    <button
                      onClick={() => handleRemoveMember(member)}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </Badge>
                ))}
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Event Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-sky-700 hover:bg-sky-800">
                {isEditing ? "Save Changes" : "Create Event"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
