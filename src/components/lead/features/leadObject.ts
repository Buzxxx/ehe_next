import apiClient from "@/apiServices/apiClient";
import { apiPaths } from "../urls";
import { encodeUrlParameters } from "./filterObject";
import update_url from "@/utility/updateUrl";

export interface individualLead {
  phone?: string;
  id: string;
  name: string;
  status: number;
  priority: string;
  img?: string;
  email?: string;
  company?: string;
}

export const defaultIndividualLead: individualLead = {
  id: "1",
  name: "John Doe",
  status: 1,
  priority: "",
  email: "example@gamil.com",
  phone: "+91 9876543210",
  company: "Google",
};

export interface Lead {
  img?: string;
  location?: string;
  id: string;
  name: string;
  created_dt: string;
  status: { id: string; status: string };
  isSelected: boolean;
  assigned_to: { id: number; name: string };
  brokerage?: number;
  contact?: string;
  email?: string;
  follow_up_current_status?: string;
  golden?: string;
  hash_key?: string;
  interested_in?: string;
  last_updated_dt: string;
  lead_type?: string;
  priority?: string;
  product_code?: string;
  product_type?: string;
  query?: string;
  recieved_date?: string;
  revenue?: number;
  sess_id?: number;
  source?: string;
  source_assigned?: string;
  budget?: string;
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
  id: "",
  name: "Default",
  email: "example@gmail.com",
  contact: "+91 9876543210",
  budget: "00",
  created_dt: "1970-01-01T00:00:00Z",
  status: { id: "", status: "None" },
  isSelected: false,
  img: "/base/profile.webp",
  location: "Unknown",
  assigned_to: { id: 0, name: "Unassigned" },
  brokerage: undefined,
  follow_up_current_status: "Not Started",
  golden: "No",
  hash_key: "",
  interested_in: "Unknown",
  last_updated_dt: "1970-01-01T00:00:00Z",
  lead_type: "General",
  priority: "Low",
  product_code: "0000",
  product_type: "None",
  query: "No query",
  recieved_date: "1970-01-01",
  revenue: 0,
  sess_id: undefined,
  source: "Unknown",
  source_assigned: "None",
};

const DEFAULTURL = "?page=1&per_page=20";

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

export async function set_lead_status_priority_on_server(data: any) {
  const returnObj = await push_update_lead_to_server(data);
  if (returnObj) {
    return returnObj;
  }
  return false;
}

export async function update_lead_on_server(data: any) {
  const returnObj = await push_update_lead_to_server(data);
  if (returnObj) {
    return returnObj;
  }
  return false;
}

export async function get_lead_details_controller(leadId: string) {
  const leadDetails = await get_lead_from_server(leadId);
  return leadDetails;
}

export async function create_lead_controller(leadData: any) {
  return await push_create_lead_to_server(leadData);
}

export async function create_lead_bulk_controller(leadList: any) {
  return await push_create_bulk_lead_to_server(leadList);
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

/* Fetch single lead for lead page, URL is system generated just adding lead ID to url */
async function get_lead_from_server(id: string) {
  const urlPart = apiPaths.getlead + "?leadId=" + id;
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

async function push_create_lead_to_server(data: any) {
  try {
    const response = await apiClient(apiPaths.createLead, "ProdBackendServer", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to create lead: ${(error as Error).message}`);
  }
}

async function push_update_lead_to_server(data: any) {
  try {
    const response = await apiClient(apiPaths.updatelead, "ProdBackendServer", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Failed to update lead:", error as Error);
    return false;
  }
}

async function push_create_bulk_lead_to_server(data: any) {
  try {
    const response = await apiClient(
      apiPaths.createLeadBulk,
      "ProdBackendServer",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to create lead: ${(error as Error).message}`);
  }
}

export interface CsvUploadPayload {
  data: any[];
  headers: { [key: string]: string };
}

export async function UploadLeadsFromCsv({ data, headers }: CsvUploadPayload) {
  const response = await apiClient("/api/upload", "ProdBackedServer", {
    method: "POST",
    body: JSON.stringify({ data, headers }),
  });
  return response;
}
