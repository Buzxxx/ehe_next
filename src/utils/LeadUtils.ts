class LeadUtils {
  static toggleLeadSelection(leads: Lead[], index: number): Lead[] {
    return leads.map((lead, idx) =>
      idx === index ? { ...lead, isSelected: !lead.isSelected } : lead
    )
  }

  static selectAllLeads(leads: Lead[]): Lead[] {
    return leads.map((lead) => ({ ...lead, isSelected: true }))
  }

  static unselectAllLeads(leads: Lead[]): Lead[] {
    return leads.map((lead) => ({ ...lead, isSelected: false }))
  }

  static getSelectedLeads(leads: Lead[]): number[] {
    return leads.filter((lead) => lead.isSelected).map((lead) => lead.id)
  }

  static getSelectedCount(leads: Lead[]): number {
    return leads.filter((lead) => lead.isSelected).length
  }

  static getTotalLeads(leads: Lead[]): number {
    return leads.length
  }
}

export default LeadUtils
