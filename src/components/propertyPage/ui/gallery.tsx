/**
 * @path src/components/propertyPage/ui/gallery.tsx
 */

"use client"

import { Button } from "@/components/ui/button"
import Image, { StaticImageData } from "next/image"

import { Images } from "@/components/ui/icons"

const Gallery = ({ images }: { images: string | StaticImageData[] }) => {
  // Function to handle 'View All Photos' click
  const viewAllPhotos = () => {
    console.log("View All Photos clicked!")
  }

  return (
    <div className="md:w-1/3 grid md:grid-cols-2 grid-cols-4 md:grid-rows-4 gap-2 ">
      {images[0] && (
        <div className="col-span-2 row-span-2">
          <Image
            placeholder="blur"
            src={images[0]}
            alt="Gallery Image 1"
            width={400}
            height={400}
            className="rounded-lg object-cover h-full w-full"
          />
        </div>
      )}

      {images[1] && (
        <div className="md:col-span-1 col-span-2 md:row-span-2 row-span-1">
          <Image
            placeholder="blur"
            src={images[1]}
            alt="Gallery Image 2"
            width={200}
            height={400}
            className="rounded-lg object-cover h-full w-full"
          />
        </div>
      )}

      {images[2] && (
        <div className="row-span-1">
          <Image
            placeholder="blur"
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
            placeholder="blur"
            src={images[3]}
            alt="Gallery Image 4"
            width={200}
            height={200}
            className="rounded-lg object-cover h-full w-full"
          />

          {/* Desktop Screen Button */}
          <Button
            onClick={viewAllPhotos}
            className="absolute bottom-2 right-2 w-fit rounded-lg bg-slate-800 hover:bg-slate-900 text-slate-200 text-xs h-fit py-3 gap-2 shadow-inner border border-slate-400/70 hidden md:flex"
          >
            <Images size={16} />
            View All Photos
          </Button>

          <div
            onClick={viewAllPhotos}
            className="absolute w-full h-full top-0 left-0  rounded-lg bg-slate-800/75 hover:bg-slate-800/70 transition text-slate-200 text-lg font-semibold md:hidden flex items-center justify-center gap-1.5"
          >
            <Images size={16} />{" "}
            <p className="flex">
              <span className="text-xl">+ </span> {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
