class LeadUtils {
  static toggleLeadSelection(leads: LeadProps[], index: number): LeadProps[] {
    return leads.map((lead, idx) =>
      idx === index ? { ...lead, isSelected: !lead.isSelected } : lead
    )
  }

  static selectAllLeads(leads: LeadProps[]): LeadProps[] {
    return leads.map((lead) => ({ ...lead, isSelected: true }))
  }

  static unselectAllLeads(leads: LeadProps[]): LeadProps[] {
    return leads.map((lead) => ({ ...lead, isSelected: false }))
  }

  static getSelectedLeads(leads: LeadProps[]): number[] {
    return leads.filter((lead) => lead.isSelected).map((lead) => lead.id)
  }

  static getSelectedCount(leads: LeadProps[]): number {
    return leads.filter((lead) => lead.isSelected).length
  }

  static getTotalLeads(leads: LeadProps[]): number {
    return leads.length
  }
}

export default LeadUtils
