/**
 * @path src/components/propertyPage/features/Hero.tsx
 */

"use client"

import Image from "next/image"
import Gallery from "../ui/gallery"
import { Button } from "@/components/ui/button"
import Inquiry from "@/components/ui/icons/inquiry"
import Call from "@/components/ui/icons/call"

import GalleryImg1 from "../../../../public/property/property1.webp"
import GalleryImg2 from "../../../../public/property/property2.webp"
import GalleryImg3 from "../../../../public/property/property3.webp"
import GalleryImg4 from "../../../../public/property/property4.webp"
import ModalUI from "../ui/ModalUI"
import PropertyForm from "./propertyForm"
import { useState } from "react"

// Array of images to pass to the Gallery
const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const galleryImages = [GalleryImg1, GalleryImg2, GalleryImg3, GalleryImg4]

  return (
    <section className="md:px-20 p-4 md:h-[75dvh]  flex gap-2 flex-col md:flex-row">
      <div className="md:w-2/3 w-full relative shadow-xl flex-1 ">
        <Image
          src={GalleryImg1}
          placeholder="blur"
          alt="Property Image"
          className="object-cover h-full w-full rounded-md"
          quality={90}
          height={400}
          width={800}
          priority
        />
        <div className="absolute bottom-4 md:right-8 right-4 flex justify-end md:gap-4 gap-2 items-center">
          <Button className="bg-white hover:bg-gray-200 rounded-full py-2 h-fit md:text-sm text-xs text-slate-950 flex gap-1.5 shadow-inner ">
            <Inquiry size={20} />
            Inquire
          </Button>
          <Button
            className="bg-white hover:bg-gray-200 rounded-full py-2 h-fit md:text-sm text-xs text-slate-950 flex gap-1.5 shadow-inner "
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <Call size={20} />
            Request a callback
          </Button>
        </div>
      </div>
      <Gallery images={galleryImages} />

      <ModalUI
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        title="Please provide your contact details, and our team will get back to you
          soon."
      >
        <PropertyForm
          wrapperClassName="md:mt-0"
          formClassName="bg-none p-0 bg-transparent md:p-0 xl:py-0 xl:px-4 border-0 shadow-none"
          onSuccess={() => setIsModalOpen(!isModalOpen)}
        />
      </ModalUI>
    </section>
  )
}

export default Hero
