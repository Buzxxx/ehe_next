// Lead.ts

import apiClient from "@/apiServices/apiClient";
import { apiPaths } from "@/app/(dashboard)/lead/urls";

export interface Lead {
  id: number;
  isSelected: boolean;
  assigned_to: string | null;
  brokerage: string | null;
  contact: string | null | undefined;
  created_dt: string;
  email: string | null | undefined;
  follow_up_current_status: string | null | undefined;
  golden: string | null | undefined;
  hash_key: string;
  interested_in: string | null | undefined;
  last_updated_dt: string;
  lead_type: string | null | undefined;
  name: string | null | undefined;
  priority: string | null | undefined;
  product_code: string | null | undefined;
  product_type: string | null | undefined;
  query: string | null | undefined;
  recieved_date: string | null | undefined;
  revenue: string | null | undefined;
  sess_id: number;
  source: string | null | undefined;
  source_assigned: string | null | undefined;
  status: number;
}

export interface LeadCardProps {
  isSelected: boolean;
  onToggle: () => void;
  idx: number;
  name: string;
  status: number;
  created_dt: string;
  id: number;
}

export interface CsvUploadPayload {
  data: any[];
  headers: { [key: string]: string };
}

const endpoint = apiPaths.baseApiUrl;
let url = "";

export function setUrl(queryParams: string) {
  url = `${endpoint}?${queryParams}`;
}

export async function getLeads() {
  try {
    const response = await apiClient(url, "ProdBackendServer", {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch leads: ${(error as Error).message}`);
  }
}

export async function createLead(data: any) {
  try {
    const response = await apiClient(
      `${endpoint}/createlead`,
      "ProdBackendServer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create lead: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error during API request:", error);
    throw new Error(`Failed to create lead: ${(error as Error).message}`);
  }
}

export async function getLeadsById(id: string): Promise<Lead[]> {
  const params = new URLSearchParams();
  params.append("filter_by", `id:${id}`);
  setUrl(params.toString());

  // Fetch the leads using the constructed URL
  return getLeads();
}

export async function UploadLeadsFromCsv({ data, headers }: CsvUploadPayload) {
  const response = await apiClient("/api/upload", "ProdBackedServer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data, headers }),
  });
  return response;
}
