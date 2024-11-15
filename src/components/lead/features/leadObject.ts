import apiClient from "@/apiServices/apiClient";
import { apiPaths } from "../urls";
import { encodeUrlParameters, get_access_token } from "./filterObject";
import update_url from "@/utility/updateUrl";

export interface individualLead {
  id: string;
  name: string;
  status: number;
  priority: string;
}

export const defaultIndividualLead: individualLead = {
  id: "1",
  name: "Name",
  status: 1,
  priority: "",
};

export interface Lead {
  location?: string;
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

export const DefaultLead: Lead = {
  id: 0,
  name: "Default",
  created_dt: "",
  status: 0,
  isSelected: false,
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

export async function get_lead_details_controller(leadId: string) {
  const leadDetails = await get_lead_from_server(leadId);
  return leadDetails;
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

/* Fetch leads from the backend server on the basis of URL created by filter or default using apiclient */
async function get_leads_from_server(queryParams: string) {
  const urlPart = apiPaths.leadPage + queryParams;
  const token = await get_access_token();
  try {
    const response = await apiClient(urlPart, "ProdBackendServer", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    console.error("Error getting leads:", error);
    return false;
  }
}

/* Fetch single lead for lead page, URL is system generated just adding lead ID to url */
async function get_lead_from_server(id: string) {
  const urlPart = apiPaths.getlead + "?leadId=" + id;
  const token = await get_access_token();
  try {
    const response = await apiClient(urlPart, "ProdBackendServer", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    console.error("Error getting leads:", error);
    return false;
  }
}
