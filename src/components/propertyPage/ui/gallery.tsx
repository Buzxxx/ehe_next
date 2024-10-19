/**
 * @path src/components/propertyPage/ui/gallery.tsx
 */

"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

import { Images } from "@/components/ui/icons"

const Gallery = ({ images }: { images: string[] }) => {
  // Function to handle 'View All Photos' click
  const viewAllPhotos = () => {
    console.log("View All Photos clicked!")
  }

  return (
    <div className="w-1/3 grid grid-cols-2 grid-rows-4 gap-4 h-full">
      {images[0] && (
        <div className="col-span-2 row-span-2">
          <Image
            src={images[0]}
            alt="Gallery Image 1"
            width={400}
            height={400}
            className="rounded-lg object-cover h-full w-full"
          />
        </div>
      )}

      {images[1] && (
        <div className="col-span-1 row-span-2">
          <Image
            src={images[1]}
            alt="Gallery Image 2"
            width={200}
            height={400}
            className="rounded-lg object-cover h-full w-full"
          />
        </div>
      )}

      {images[2] && (
        <div className=" row-span-1">
          <Image
            src={images[2]}
            alt="Gallery Image 3"
            width={200}
            height={200}
            className="rounded-lg h-full w-full"
          />
        </div>
      )}

      {images[3] && (
        <div className="relative">
          <Image
            src={images[3]}
            alt="Gallery Image 4"
            width={200}
            height={200}
            className="rounded-lg object-cover h-full w-full"
          />
          <Button
            onClick={viewAllPhotos}
            className="absolute bottom-2 right-2 w-fit rounded-lg bg-slate-800 hover:bg-slate-900 text-slate-200 text-xs h-fit py-3 flex gap-2 shadow-inner border border-slate-400/70"
          >
            <Images size={16} />
            View All Photos
          </Button>
        </div>
      )}
    </div>
  )
}

export default Gallery
