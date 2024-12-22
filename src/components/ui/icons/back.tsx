
'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type classType = {
  className?: string
}

export default function BackIcon({
  className = "w-20 h-20",
}: classType) {
  const customeClass = className + " " + "text-black"
  const router = useRouter()
  return (
    <Button
      onClick={() => router.back()}
      className={`bg-transparent border-none hover:bg-gray-100 text-black font-bold py-2 px-4 rounded ${customeClass}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
    </Button>
  )
}
