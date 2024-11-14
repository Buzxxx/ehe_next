// components/EventModal.js
"use client"
import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Define schema for form validation with Zod
const eventSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().optional(),
  time: z.string().min(2).max(50),
  priority: z.string().optional(),
  teamMembers: z.array(z.string()).optional(),
})

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  defaultDateTime,
}: {
  isOpen: boolean
  onClose: () => void
  onSave: (event: any) => void
  defaultDateTime: Date
}) {
  const [teamSearch, setTeamSearch] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [dateTime, setDateTime] = useState(defaultDateTime)

  useEffect(() => {
    setDateTime(defaultDateTime) // Update dateTime whenever defaultDateTime changes
  }, [defaultDateTime])

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      time: format(defaultDateTime, "yyyy-MM-dd'T'HH:mm"),
      priority: "low",
      teamMembers: [],
    },
  })

  const handleSave = form.handleSubmit((values) => {
    onSave({
      ...values,
      title: values.title,
      start: dateTime, // Use dateTime directly as the event's start time
      color: "bg-blue-500",
      teamMembers: selectedMembers,
    })
    form.reset()
    onClose()
  })

  // Mock team members list for the search functionality
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
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Create New Event
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSave} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={format(dateTime, "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => {
                        setDateTime(new Date(e.target.value))
                      }}
                      className="mt-1 block w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      {...field}
                      defaultValue="low"
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Team Members Search & Select */}
            <FormItem>
              <FormLabel>Team Members</FormLabel>
              <Input
                placeholder="Search and add team members"
                value={teamSearch}
                onChange={(e) => setTeamSearch(e.target.value)}
                className="mb-2"
              />
              {teamSearch && (
                <div className="border rounded bg-white shadow-md max-h-40 overflow-y-auto">
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

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-sky-700 hover:bg-sky-800">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
