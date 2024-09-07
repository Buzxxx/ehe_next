import { LeadCard } from "@/components/lead/ui/leadCard"
import { LeadCardProps } from "../feature/leadApiClient"


type VisitorPanelBodyProps = {
  leads: LeadCardProps[]
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
        id={lead.id}
          created={lead.created}
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
