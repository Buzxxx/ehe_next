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
    <section className="md:px-20 px-4 md:py-4 py-2 md:h-[75dvh] h-[40svh] flex gap-2 flex-col md:flex-row">
      <div className="md:w-2/3 w-full relative min-h-40 shadow-xl">
        <Image
          src="/property/property1.webp"
          alt="Property Image"
          className="object-cover h-full rounded-md"
          quality={90}
          fill={true}
          sizes="(max-width: 768px) 95vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute bottom-4 right-4 flex justify-end gap-4 items-center">
          <Button className="bg-white hover:bg-gray-200 rounded-full py-2 h-fit md:text-sm text-xs text-slate-950 flex gap-1.5 shadow-inner ">
            <Inquiry size={20} />
            Inquire
          </Button>
          <Button className="bg-white hover:bg-gray-200 rounded-full py-2 h-fit md:text-sm text-xs text-slate-950 flex gap-1.5 shadow-inner ">
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
