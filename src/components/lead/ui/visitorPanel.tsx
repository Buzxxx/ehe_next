import { LeadCard } from "@/components/lead/ui/leadCard"

const VisitorPanelBody = () => (
  <div className="visitor-panel-body pt-2">
    {/* <h1 className="text-center m-5 p-5 text-neutral-400 text-4xl font-semibold">
      Leads Not Found
    </h1> */}
    <div className="grid grid-cols-4 p-2 ">
      <LeadCard />
    </div>
  </div>
)

export default VisitorPanelBody
