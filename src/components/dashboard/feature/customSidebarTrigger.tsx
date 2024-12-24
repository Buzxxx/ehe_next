'use client'

import { MenuIcon } from "@/components/ui/icons"
import { useSidebar } from "@/components/ui/sidebar"

export default function CustomTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <button onClick={toggleSidebar}>
      <MenuIcon size={20} />
    </button>
  )
}
