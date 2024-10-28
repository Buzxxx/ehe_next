/**
 * @path src/components/propertyPage/ui/gallery.tsx
 */

"use client"

import { Button } from "@/components/ui/button"
import Image, { StaticImageData } from "next/image"

import { Images } from "@/components/ui/icons"
import { useState } from "react"
import ModalCarousel from "./modalCarousel"

const Gallery = ({ images }: { images: (string | StaticImageData)[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [focusedImageIndex, setFocusedImageIndex] = useState(0)

  const openModalWithImage = (index: number) => {
    setFocusedImageIndex(index)
    setIsModalOpen(true)
  }

  return (
    <div className="md:w-1/3 grid md:grid-cols-2 grid-cols-4 md:grid-rows-4 gap-2  ">
      {images.map((image, index) => (
        <div
          key={index}
          className={`${
            index === 0
              ? "col-span-2 row-span-2"
              : index === 1
              ? "md:col-span-1 col-span-2 md:row-span-2 row-span-1"
              : "row-span-1"
          } ${index === 3 ? "relative" : ""}`}
          onClick={() => openModalWithImage(index)}
        >
          <Image
            placeholder="blur"
            src={image}
            alt={`Gallery Image ${index + 1}`}
            width={index === 0 ? 400 : 200}
            height={index < 2 ? 400 : 200}
            className="rounded-lg object-cover h-full w-full"
          />
          {index === 3 && (
            <>
              <Button
                onClick={() => openModalWithImage(0)}
                className="absolute bottom-2 right-2 w-fit rounded-lg bg-green-600 hover:bg-green-700 text-green-200 text-xs h-fit py-3 gap-2 shadow-inner  hidden md:flex"
              >
                <Images size={16} />
                View All Photos
              </Button>
              <div
                onClick={() => openModalWithImage(0)}
                className="absolute w-full h-full top-0 left-0 rounded-lg bg-green-800/75 hover:bg-green-800/70 transition text-green-200 text-lg font-semibold md:hidden flex items-center justify-center gap-1.5"
              >
                <Images size={16} />{" "}
                <p className="flex">
                  <span className="text-xl">+ </span> {images.length}
                </p>
              </div>
            </>
          )}
        </div>
      ))}
      {isModalOpen && (
        <ModalCarousel
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          items={images}
          initialIndex={focusedImageIndex}
        />
      )}
    </div>
  )
}

export default Gallery
