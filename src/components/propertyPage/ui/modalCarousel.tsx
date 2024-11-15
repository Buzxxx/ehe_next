import { useCallback, useEffect } from "react"
import { SetStateAction, useState } from "react"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { type CarouselApi } from "@/components/ui/carousel"

const ModalCarousel = ({
  items,
  initialIndex,
  isOpen,
  setIsOpen,
}: {
  items: any[]
  initialIndex: number
  isOpen: boolean
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}) => {
  const [api, setApi] = useState<CarouselApi>()

  const jumpToSlide = useCallback(
    (api: CarouselApi) => {
      if (api) {
        api.scrollTo(initialIndex, true)
      }
    },
    [initialIndex]
  )
  useEffect(() => {
    if (!api) {
      return
    }

    api.on("init", () => {
      jumpToSlide(api)
    })
  }, [api, jumpToSlide])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay>
        <DialogContent className="max-w-2xl my-auto md:h-5/6 h-fit flex flex-col">
          <DialogTitle className="h-fit">Gallery</DialogTitle>
          <DialogDescription asChild className="flex flex-1 justify-center">
            <Carousel className="h-full flex flex-col" setApi={setApi}>
              <CarouselContent className="flex items-center h-full">
                {items.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="flex items-center justify-center max-h-96"
                  >
                    <Image
                      src={item}
                      alt={`Image ${index}`}
                      height={500}
                      width={800}
                      className="w-96 object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="relative md:mt-8">
                <CarouselPrevious className="left-auto right-12" />
                <CarouselNext className="right-2" />
              </div>
            </Carousel>
          </DialogDescription>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}

export default ModalCarousel
