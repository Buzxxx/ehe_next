import LeadSummaryCard from "../../ui/leadListing/leadSummaryCard"
import { get_total_leads, LeadsResponse } from "../leadObject"

const LeadSummarySection = ({leadsResponse}: {leadsResponse: LeadsResponse}) => {
  const totalLeads = get_total_leads(leadsResponse)
  return (
    <div className="flex justify-between gap-2 w-full">
      <LeadSummaryCard title="Total Leads" value={totalLeads} />
      <LeadSummaryCard title="New Leads" value="20" />
      <LeadSummaryCard title="Active Leads" value="20" />
    </div>
  )
}

export default LeadSummarySection
