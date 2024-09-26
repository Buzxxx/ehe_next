import { Spinner } from "@/components/ui/icons"
import OverlayLoading from "@/components/ui/overlayLoading"
import React from "react"

export default function Loading() {
  return (
    <OverlayLoading>
      <Spinner className="w-8 h-8 md:w-14 md:h-16 "></Spinner>
    </OverlayLoading>
  )
}
