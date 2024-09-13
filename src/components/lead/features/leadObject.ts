import apiClient from "@/apiServices/apiClient";
import { apiPaths } from "../urls";
import { encodeUrlParameters } from "./filterObject";
import update_url from "@/utility/updateUrl";

export interface Lead {
  id: number;
  name: string;
  created_dt: string;
  status: number;
  isSelected: boolean;
}

export interface LeadsResponse {
  leads: Lead[];
  message: string;
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
  };
}

export const DefaultLeadsResponse: LeadsResponse = {
  leads: [],
  message: "",
  pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  },
};

const DEFAULTURL = "?page=2&per_page=20";

export async function lead_listing_controller(params: URLSearchParams) {
  if (params.keys().next().value) {
    const urlParams = encodeUrlParameters(params);
    const leads = await get_leads_from_server(urlParams);
    return leads;
  } else {
    update_url(DEFAULTURL);
    return [];
  }
}

export function get_total_leads(LeadsResponse: LeadsResponse) {
  return LeadsResponse?.pagination?.total_items || 0;
}

export function get_selected_leads(LeadsResponse: LeadsResponse) {
  return (
    LeadsResponse?.leads
      ?.filter((lead) => lead.isSelected)
      .map((lead) => lead.id) || []
  );
}

export function get_selected_leads_count(LeadsResponse: LeadsResponse) {
  return get_selected_leads(LeadsResponse).length || 0;
}

async function get_leads_from_server(queryParams: string) {
  const urlPart = apiPaths.leadPage + queryParams;
  try {
    const response = await apiClient(urlPart, "ProdBackendServer", {
      method: "GET",
    });
    return response;
  } catch (error: any) {
    console.error("Error getting leads:", error);
    return false;
  }
}
