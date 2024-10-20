/**
 * @path src/components/propertyPage/features/Hero.tsx
 */

import Image from "next/image"
import Gallery from "../ui/gallery"
import { Button } from "@/components/ui/button"
import Inquiry from "@/components/ui/icons/inquiry"
import Call from "@/components/ui/icons/call"

// Array of images to pass to the Gallery
const Hero = () => {
  const galleryImages = [
    "/property/property2.webp",
    "/property/property3.webp",
    "/property/property4.webp",
    "/property/property1.webp",
  ]

  return (
    <section className="md:px-20 px-4 py-4 h-[75vh] flex gap-4">
      <div className="w-2/3 relative h-full">
        <Image
          src="/property/property1.webp"
          alt="Property Image"
          height={600}
          width={960}
          className="rounded-xl h-full object-cover shadow-xl"
          quality={90}
          priority={true}
        />
        <div className="absolute bottom-4 right-4 flex justify-end gap-4 items-center">
          <Button className="bg-white hover:bg-gray-200 rounded-full py-2 h-fit text-sm text-slate-950 flex gap-1.5 shadow-inner ">
            <Inquiry size={20} />
            Inquire
          </Button>
          <Button className="bg-white hover:bg-gray-200 rounded-full py-2 h-fit text-sm text-slate-950 flex gap-1.5 shadow-inner ">
            <Call size={20} />
            Request a callback
          </Button>
        </div>
      </div>
      <Gallery images={galleryImages} />
    </section>
  )
}

export default Hero
