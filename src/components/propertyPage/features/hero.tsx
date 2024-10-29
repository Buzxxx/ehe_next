/**
 * @path src/components/propertyPage/features/Hero.tsx
 */

"use client"

import { useState } from "react"
import HeroUI from "../ui/heroUI"
import GalleryImg1 from "../../../../public/property/property1.webp"
import GalleryImg2 from "../../../../public/property/property2.webp"
import GalleryImg3 from "../../../../public/property/property3.webp"
import GalleryImg4 from "../../../../public/property/property4.webp"

// Array of images to pass to the Gallery
const HeroLogic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showQuestionField, setShowQuestionField] = useState(false)

  const galleryImages = [GalleryImg1, GalleryImg2, GalleryImg3, GalleryImg4]

  const handleInquiryClick = () => {
    setIsModalOpen(true)
    setShowQuestionField(true)
  }

  const handleCallbackClick = () => {
    setIsModalOpen(true)
    setShowQuestionField(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <HeroUI
      isModalOpen={isModalOpen}
      showQuestionField={showQuestionField}
      handleInquiryClick={handleInquiryClick}
      handleCallbackClick={handleCallbackClick}
      closeModal={closeModal}
      galleryImages={galleryImages}
    />
  )
}

export default HeroLogic
