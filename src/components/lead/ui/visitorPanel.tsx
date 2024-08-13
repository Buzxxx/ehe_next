import { LeadCard } from "@/components/lead/ui/leadCard"

type Lead = {
  id: number
  isSelected: boolean
}

type VisitorPanelBodyProps = {
  leads: Lead[]
  onToggleLead: (index: number) => void
}

const VisitorPanelBody: React.FC<VisitorPanelBodyProps> = ({
  leads,
  onToggleLead,
}) => (
  <div className="visitor-panel-body pt-2">
    <div className="grid md:grid-cols-4 p-2 gap-4">
      {leads.map((lead, index) => (
        <LeadCard
          key={lead.id}
          isSelected={lead.isSelected}
          idx={index}
          onToggle={() => onToggleLead(index)}
        />
      ))}
    </div>
  </div>
)

export default VisitorPanelBody
