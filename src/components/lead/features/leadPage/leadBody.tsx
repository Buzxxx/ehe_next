import React from "react"
import { Button } from "@/components/ui/button"


const LeadBody = ({
  leadId,
  navItems,
	activeTab
}: {
  leadId: string
  navItems: { name: string; component: React.ReactNode }[]
	activeTab: number
}) => {
 

  return (
    <>
      <section className="mt-4 min-h-80 min-w-80 flex gap-2">
        {navItems[activeTab].component}
      </section>
    </>
  )
}

export default LeadBody
