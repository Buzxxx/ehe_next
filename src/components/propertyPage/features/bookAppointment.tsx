"use client"

import { useMemo, useState } from "react"
import { CircleAlert } from "@/components/ui/icons"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Form } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { ChevronDown, ChevronUp } from "lucide-react" // Import icons for chevron

// Appointment validation schema
const AppointmentSchema = z.object({
  selectedSlot: z.string().nonempty("Please select a time slot"),
})

const BookAppointment = () => {
  const [showMoreSlots, setShowMoreSlots] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<string>("") // State to track selected slot

  // Mock initial slots
  const initialSlots = [
    "Tuesday April 21 at 11:00 AM",
    "Friday April 24 at 10:00 AM",
    "Sunday April 26 at 11:00 AM",
  ]

  // Mock additional slots
  const moreSlots = [
    "Monday April 28 at 5:00 PM",
    "Thursday May 1 at 6:00 PM",
    "Saturday May 3 at 7:00 PM",
  ]

  const slotsToDisplay = showMoreSlots
    ? [...initialSlots, ...moreSlots]
    : initialSlots

  // Estimate each slot's height (for example, 50px per slot)
  const slotHeight = 80

  // Calculate max-height dynamically based on the number of displayed slots
  const maxHeight = useMemo(() => {
    return slotsToDisplay.length * slotHeight
  }, [slotsToDisplay.length])

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
  })

  const onSubmit = async (data: z.infer<typeof AppointmentSchema>) => {
    console.log("Selected slot:", data.selectedSlot)
  }

  return (
    <article className="p-4 border border-gray-300/75 rounded-lg shadow-md">
      {/* Property Info */}
      <hgroup>
        <h4 className="text-xl font-semibold">Microtek Greenburg</h4>
        <span className="text-gray-500 text-sm">Gurugram, Harayana</span>
      </hgroup>

      {/* High Demand Notification */}
      <div className="bg-orange-100 py-2 px-4 rounded-md mt-4 flex gap-2 items-center">
        <CircleAlert color="orange" />
        <p className="text-sm text-slate-600">
          This property is in high demand
        </p>
      </div>

      {/* Appointment Form */}
      <Form {...form}>
        <h4 className="text-md font-medium mt-6">Book An Appointment</h4>
        <p className="text-xs text-slate-600">Book your appointment online</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
          {/* Time Slot Selection */}
          <div
            className="transition-all duration-500 overflow-hidden"
            style={{ height: `${maxHeight}px` }} // Dynamic max-height
          >
            <RadioGroup
              className="space-y-3"
              onValueChange={(value) => setSelectedSlot(value)} // Track selected slot
            >
              {slotsToDisplay.map((slot, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 transition `}
                >
                  <RadioGroupItem
                    value={slot}
                    id={`slot-${index}`}
                    {...form.register("selectedSlot")}
                    className="hidden" // Hide the actual radio button
                  />
                  <Label
                    htmlFor={`slot-${index}`}
                    className={`w-full cursor-pointer flex justify-center items-center py-3 text-sm text-slate-500 border rounded-md transition-colors duration-200 ${
                      selectedSlot === slot
                        ? "border-slate-500 text-slate-700"
                        : "border-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {slot}
                  </Label>
                </div>
              ))}
              {/* Show More Slots Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex justify-center items-center text-slate-500 border-slate-300 hover:text-slate-700 hover:border-slate-500"
                onClick={() => setShowMoreSlots(!showMoreSlots)}
              >
                {showMoreSlots ? "See Less Slots" : "Show More Slots"}
                {showMoreSlots ? (
                  <ChevronUp className="ml-2" />
                ) : (
                  <ChevronDown className="ml-2" />
                )}
              </Button>
            </RadioGroup>
          </div>

          {/* Confirm Appointment Button */}
          {selectedSlot && (
            <div
              className={`w-full flex justify-center mt-4 animate-fade-in ${
                selectedSlot ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                type="submit"
                className="w-full bg-slate-800 text-white hover:bg-slate-900 transition-all duration-500"
              >
                Confirm Appointment
              </Button>
            </div>
          )}
        </form>
      </Form>
    </article>
  )
}

export default BookAppointment
