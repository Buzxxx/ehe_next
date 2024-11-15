/**
 * @path src/components/propertyPage/ui/HeroUI.tsx
 */

"use client"

import Image, { StaticImageData } from "next/image"
import Gallery from "../features/gallery"
import { Button } from "@/components/ui/button"
import Inquiry from "@/components/ui/icons/inquiry"
import Call from "@/components/ui/icons/call"
import ModalUI from "./ModalUI"
import PropertyForm from "../features/propertyForm"

const HeroUI = ({
  isModalOpen,
  showQuestionField,
  handleInquiryClick,
  handleCallbackClick,
  closeModal,
  galleryImages,
}: {
  isModalOpen: boolean
  showQuestionField: boolean
  handleInquiryClick: () => void
  handleCallbackClick: () => void
  closeModal: () => void
  galleryImages: StaticImageData[]
}) => {
  return (
    <section className="md:px-20 p-4 md:h-[75dvh] flex gap-2 flex-col md:flex-row">
      <div className="md:w-2/3 w-full relative shadow-xl flex-1">
        <Image
          src={galleryImages[0]} // Assuming the first image is the primary
          placeholder="blur"
          alt="Property Image"
          className="object-cover h-full w-full rounded-md"
          quality={90}
          height={400}
          width={800}
          priority
        />
        <div className="absolute bottom-4 md:right-8 right-4 flex justify-end md:gap-4 gap-2 items-center">
          <Button
            className="bg-white hover:bg-green-100 hover:text-green-500 rounded-full py-2 h-fit md:text-sm text-xs text-slate-950 flex gap-1.5 shadow-inner"
            onClick={handleInquiryClick}
          >
            <Inquiry size={20} />
            Inquire
          </Button>
          <Button
            className="bg-white hover:bg-green-100 hover:text-green-500 rounded-full py-2 h-fit md:text-sm text-xs text-slate-950 flex gap-1.5 shadow-inner"
            onClick={handleCallbackClick}
          >
            <Call size={20} />
            Request a callback
          </Button>
        </div>
      </div>
      <Gallery images={galleryImages} />

      <ModalUI
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Please provide your contact details, and our team will get back to you soon."
      >
        <PropertyForm
          wrapperClassName="md:mt-0"
          formClassName="bg-none p-0 bg-transparent md:p-0 xl:py-0 xl:px-4 border-0 shadow-none"
          onSuccess={closeModal}
          showQuestionField={showQuestionField}
        />
      </ModalUI>
    </section>
  )
}

export default HeroUI
