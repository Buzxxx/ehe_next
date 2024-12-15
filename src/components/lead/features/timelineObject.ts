import apiClient from "@/apiServices/apiClient";
import { apiPaths } from "../urls";
import { getCookie } from "@/cookies/cookiesService";

export async function get_timeline_controller(lead_id: string) {
  const timeline = await get_timeline_from_server(lead_id);
  return timeline.timeline;
}

async function get_timeline_from_server(id: string) {
  const urlPart = apiPaths.gettimelinelist + "?leadId=" + id;
  const token = await get_access_token();
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

async function get_access_token() {
  const accessTokenName = "accessToken";
  return await getCookie(accessTokenName);
}
