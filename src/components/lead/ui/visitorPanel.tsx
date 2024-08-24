import { LeadCard } from "@/components/lead/ui/leadCard"

type Lead = {
  created_dt: string
  status: number
  name: string
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
    <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
      {leads.map((lead, index) => (
        <LeadCard
        created={lead.created_dt}
        name={lead.name}
        status={lead.status}
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
