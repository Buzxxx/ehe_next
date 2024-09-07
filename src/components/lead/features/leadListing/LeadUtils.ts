import { LeadCardProps } from "@/components/lead/features/leadApiClient";

class LeadUtils {
  static toggleLeadSelection(
    leads: LeadCardProps[],
    index: number
  ): LeadCardProps[] {
    return leads.map((lead, idx) =>
      idx === index ? { ...lead, isSelected: !lead.isSelected } : lead
    );
  }

  static selectAllLeads(leads: LeadCardProps[]): LeadCardProps[] {
    return leads.map((lead) => ({ ...lead, isSelected: true }));
  }

  static unselectAllLeads(leads: LeadCardProps[]): LeadCardProps[] {
    return leads.map((lead) => ({ ...lead, isSelected: false }));
  }

  static getSelectedLeads(leads: LeadCardProps[]): number[] {
    return leads.filter((lead) => lead.isSelected).map((lead) => lead.id);
  }

  static getSelectedCount(leads: LeadCardProps[]): number {
    return leads.filter((lead) => lead.isSelected).length;
  }

  static getTotalLeads(leads: LeadCardProps[]): number {
    return leads.length;
  }
}

export default LeadUtils;
