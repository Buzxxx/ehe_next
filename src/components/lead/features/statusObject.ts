import apiClient from "@/apiServices/apiClient";
import { apiPaths } from "../urls";
import { getCookie } from "@/cookies/cookiesService";

export interface LeadStatus {
  id: string;
  status: string;
}

export const DefaultLeadStatus: LeadStatus = {
  id: "1",
  status: "New",
};

export async function get_lead_status_controller() {
  return await get_status_from_server();
}

async function get_access_token() {
  const accessTokenName = "accessToken";
  return await getCookie(accessTokenName);
}

async function get_status_from_server() {
  const urlPart = apiPaths.getLeadStatusList;
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
