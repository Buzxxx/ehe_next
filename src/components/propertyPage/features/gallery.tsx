/**
 * @path src/components/propertyPage/features/gallery.tsx
 */

"use client"

import { useState } from "react"
import { StaticImageData } from "next/image"
import GalleryUI from "../ui/galleryUI"
import ModalCarousel from "../ui/modalCarousel"

interface GalleryProps {
  images: (string | StaticImageData)[]
}

const Gallery = ({ images }: GalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [focusedImageIndex, setFocusedImageIndex] = useState(0)

  const openModalWithImage = (index: number) => {
    setFocusedImageIndex(index)
    setIsModalOpen(true)
  }

  return (
    <>
      <GalleryUI images={images} openModalWithImage={openModalWithImage} />

      {isModalOpen && (
        <ModalCarousel
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          items={images}
          initialIndex={focusedImageIndex}
        />
      )}
    </>
  )
}

export default Gallery
