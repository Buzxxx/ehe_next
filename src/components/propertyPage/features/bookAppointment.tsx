"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

import { useToast } from "@/components/ui/use-toast"

import {
  Heart,
  Share2,
  CircleAlert,
  ChevronDown,
  ChevronUp,
} from "@/components/ui/icons"
import { ToastAction } from "@/components/ui/toast"
import ModalUI from "../ui/ModalUI"
import PropertyForm from "./propertyForm"

const ShareModal = dynamic(() => import("./shareModal"))

// Appointment validation schema
const AppointmentSchema = z.object({
  selectedSlot: z.string().min(1, "Please select a time slot"),
})

const BookAppointment = () => {
  const [showMoreSlots, setShowMoreSlots] = useState(false) // State to toggle slots in view
  const [selectedSlot, setSelectedSlot] = useState<string>("") // State to track selected slot
  const [liked, setLiked] = useState(false) // New state for 'like'
  const [isShareModalOpen, setIsShareModalOpen] = useState(false) // State for share modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const { toast } = useToast()
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

  // Estimate each slot's height (for example, 72px per slot)
  const slotHeight = 60

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

      // Show failure toast
      toast({
        title: "Error",
        description: "Failed to book the slot. Please try again.",
        className: "bg-red-500 text-white",
      })
    }
  }

  const toggleLike = () => {
    setLiked((prev) => !prev)
    toast({
      title: liked ? "You unliked the property!" : "You liked the property!",
      description: liked
        ? "Property Removed from your Favourites"
        : "Property Added to your Favourites",
      className: liked
        ? "w-full bg-slate-700 text-white"
        : "w-full bg-red-500 text-white",
    })
  }

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen)
  }

  return (
    <article className="px-4 pb-4 border border-gray-300/75 rounded-lg shadow-md flex-1">
      {/* Property Info */}
      <div className="flex justify-between items-start">
        <hgroup className="py-2 flex-1">
          <h4 className="text-2xl text-slate-800 font-bold leading-8">
            Microtek Greenburg
          </h4>
          <span className="text-gray-500 text-sm">Gurugram, Haryana</span>
        </hgroup>

        <div className="flex gap-2 items-center mt-2">
          <Button
            className={`bg-transparent p-1 w-fit transition  hover:bg-transparent hover:scale-110 hover:text-pink-400 ${
              liked ? "text-pink-500" : "text-slate-500"
            }`}
            onClick={toggleLike} // Toggle like
          >
            <Heart
              className={`transition-colors ${liked ? "  fill-pink-500" : ""}`}
            />
          </Button>
          <Button
            className="bg-transparent text-slate-500 hover:bg-transparent hover:text-slate-700 p-1 w-fit"
            onClick={toggleShareModal} // Toggle modal open
          >
            <Share2 />
          </Button>
        </div>
      </div>

      <Separator />

      {/* High Demand Notification */}
      <div className="bg-orange-100 py-2 px-4 rounded-md mt-4 flex gap-2 items-center">
        <CircleAlert color="orange" />
        <p className="text-sm text-slate-600">
          This property is in high demand
        </p>
      </div>

      {/* Appointment Form */}
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
                showMoreSlots ? `calc(${maxHeight}px + 80px)` : `${maxHeight}px`
              }`,
            }} // Dynamic max-height
          >
            <RadioGroup
              className="space-y-3"
              onValueChange={(value) => setSelectedSlot(value)} // Track selected slot
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

              {/* Couldn't find the right slot message */}
              {showMoreSlots && (
                <p className="text-slate-600 text-xs font-medium text-balance">
                  Couldn&apos;t find the right slot for you?
                  <Link
                    href="#contact"
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    {" "}
                    We&apos;re here to help!
                  </Link>
                  <br />
                  <span className="text-slate-500 font-normal text-center">
                    Get in touch with us, and we&apos;ll assist you in finding a
                    more convenient time.
                  </span>
                </p>
              )}
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
                className="w-full bg-green-600 text-white hover:bg-green-600 transition-all duration-500"
              >
                Confirm Appointment
              </Button>
            </div>
          )}
        </form>
      </Form>

      <ShareModal isOpen={isShareModalOpen} onClose={toggleShareModal} />

      <ModalUI
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(!isLoginModalOpen)}
        title="Plese fill in the details to book your slot."
      >
        <PropertyForm
          wrapperClassName="md:mt-0"
          formClassName="bg-none p-0 bg-transparent md:p-0 xl:py-0 xl:px-4 border-0 shadow-none"
          onSuccess={() => setIsLoginModalOpen(!isLoginModalOpen)}
        />
      </ModalUI>
    </article>
  )
}

export default BookAppointment
