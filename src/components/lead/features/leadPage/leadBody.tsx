/**
 * @path src/components/lead/features/leadPage/leadBody.tsx
 */

const LeadBody = ({
  leadId,
  navItems,
  activeTab,
}: {
  leadId: string
  navItems: { name: string; component: React.ReactNode }[]
  activeTab: number
}) => {
  return (
    <>
      <section className=" min-h-80 min-w-80 flex gap-2">
        {navItems[activeTab].component}
      </section>
    </>
  )
}

export default LeadBody
