"use client"

import { useEffect, useMemo, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronDown, ChevronUp } from "@/components/ui/icons"
import CustomFormField from "@/components/dashboard/ui/customFormField"
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum"
import { generateMockSlots } from "./propertyObject"

const AppointmentSchema = z.object({
  selectedSlot: z.string().optional(),
  customDate: z.date().optional(),
})

const BookAppointmentForm = ({
  setIsLoginModalOpen,
}: {
  setIsLoginModalOpen: (isOpen: boolean) => void
}) => {
  const [showMoreSlots, setShowMoreSlots] = useState(false) // State to toggle slots in view
  const [selectedSlot, setSelectedSlot] = useState<string>("") // State to track selected slot
  const [showCalendar, setShowCalendar] = useState(false)
  const [customDate, setCustomDate] = useState<Date | null>(null) // New state for custom date
  const [initialSlots, setInitialSlots] = useState<string[]>([])
  const [moreSlots, setMoreSlots] = useState<string[]>([])

  useEffect(() => {
    const generatedSlots = generateMockSlots(6)
    setInitialSlots(generatedSlots.slice(0, 3))
    setMoreSlots(generatedSlots.slice(3))
  }, [])

  const slotsToDisplay = showMoreSlots
    ? [...initialSlots, ...moreSlots]
    : initialSlots

  // Estimate each slot's height (for example, 72px per slot)
  const slotHeight = 72

  // Calculate max-height dynamically based on the number of displayed slots
  const maxHeight = useMemo(() => {
    return (slotsToDisplay.length + 1) * slotHeight
  }, [slotsToDisplay.length])

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
  })

  const onSubmit = async (data: z.infer<typeof AppointmentSchema>) => {
    try {
      // Simulate an async API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoginModalOpen(true)
    } catch (error) {
      console.error("Submission failed:", error)
    }
  }

  const handleSelectCustomDate = () => {
    setShowMoreSlots(false)
    setShowCalendar(true)
    setSelectedSlot("") // Clear selected slot when selecting custom date
		setCustomDate(new Date())
  }

  return (
    <Form {...form}>
      <h4 className="text-md font-medium mt-4">Book An Appointment</h4>
      <p className="text-xs text-slate-600">Book your appointment online</p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 py-4 px-6"
      >
        {/* Time Slot Selection */}
        <div
          className="transition-all duration-500 overflow-hidden"
          style={{
            height: `${
              showMoreSlots || showCalendar
                ? `calc(${maxHeight}px + 16px)`
                : `${maxHeight}px`
            }`,
          }} // Dynamic max-height
        >
          <RadioGroup
            className="space-y-3"
            onValueChange={(value) => {
              setSelectedSlot(value)
              setCustomDate(null) // Clear custom date when selecting a slot
              form.setValue("customDate", undefined) // Ensure form state is updated
            }} // Track selected slot
          >
            {slotsToDisplay.map((slot, index) => (
              <div key={index} className={`flex items-center transition `}>
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
              className="w-full flex justify-center items-center text-slate-500 border-slate-300 hover:text-slate-700 hover:border-slate-500 py-2 h-fit"
              onClick={() => setShowMoreSlots(!showMoreSlots)}
            >
              {showMoreSlots ? "See Less Slots" : "Show More Slots"}
              {showMoreSlots ? (
                <ChevronUp className="ml-2" />
              ) : (
                <ChevronDown className="ml-2" />
              )}
            </Button>

            {showCalendar && (
              <CustomFormField
                control={form.control}
                name="customDate"
                fieldType={FormFieldType.DATE_PICKER}
                onChange={(value) => {
                  setCustomDate(value)
                  setSelectedSlot("") // Clear selected slot when selecting a custom date
                  form.setValue("selectedSlot", "") // Ensure form state is updated
                }}
              />
            )}

            {/* Couldn't find the right slot message */}
            {!showCalendar && (
              <p className="text-slate-600 text-xs font-medium text-balance">
                Couldn&apos;t find the right slot for you?
                <span
                  className="text-blue-500 cursor-pointer font-semibold hover:underline"
                  onClick={handleSelectCustomDate}
                >
                  {" "}
                  Pick a date of your choosing.
                </span>
              </p>
            )}
          </RadioGroup>
        </div>

        {/* Confirm Appointment Button */}
        {(selectedSlot || customDate) && (
          <div
            className={`w-full flex justify-center animate-fade-in ${
              selectedSlot || customDate ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              type="submit"
              className="w-full bg-green-600 text-white hover:bg-green-600 transition-all duration-500"
            >
              Confirm Appointment
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
}

export default BookAppointmentForm
