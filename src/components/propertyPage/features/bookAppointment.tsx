"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Heart, Share2, CircleAlert } from "@/components/ui/icons"
import ModalUI from "../ui/ModalUI"
import PropertyForm from "./propertyForm"
import BookAppointmentForm from "./bookAppointmentForm"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { formatDate } from "./propertyObject"

const ShareModal = dynamic(() => import("./shareModal"))

const AppointmentSchema = z.object({
  selectedSlot: z.string().optional(),
  customDate: z.date().optional(),
})

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date | string | null>(null)
  const [liked, setLiked] = useState(false) // New state for 'like'
  const [isShareModalOpen, setIsShareModalOpen] = useState(false) // State for share modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
  })

  const onSubmit = async (data: z.infer<typeof AppointmentSchema>) => {
    try {
      // Simulate an async API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSelectedDate(() => data.customDate || data.selectedSlot || "") // Set selected date
      setIsLoginModalOpen(true)
      console.log(selectedDate)
    } catch (error) {
      console.error("Submission failed:", error)
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
        ? "w-full bg-green-100 backdrop-blur-sm"
        : "w-full bg-green-500 text-white",
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
            className={`bg-transparent p-1 w-fit transition  hover:bg-transparent hover:scale-110 hover:text-green-400 ${
              liked ? "text-green-500" : "text-slate-500"
            }`}
            onClick={toggleLike} // Toggle like
          >
            <Heart
              className={`transition-colors ${liked ? "  fill-green-500" : ""}`}
            />
          </Button>
          <Button
            className="bg-transparent text-slate-500 hover:bg-transparent hover:text-green-600 p-1 w-fit"
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
      <BookAppointmentForm
        setIsLoginModalOpen={setIsLoginModalOpen}
        form={form}
        onSubmit={onSubmit}
      />

      <ShareModal isOpen={isShareModalOpen} onClose={toggleShareModal} />

      <ModalUI
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(!isLoginModalOpen)}
        title={`Confirm your slot for ${selectedDate ? formatDate(selectedDate) : ""}`}
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
