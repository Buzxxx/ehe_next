import apiClient from "@/apiServices/apiClient";
import { apiPaths } from "../urls";

export async function get_leads_from_server(queryParams: string) {
  const urlPart = apiPaths.leadPage + "?" + queryParams;
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
