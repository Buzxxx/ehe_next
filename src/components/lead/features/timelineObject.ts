import apiClient from "@/apiServices/apiClient";
import { apiPaths } from "../urls";

export interface TimelineEvents {
  eventname: string;
  date: string;
  description: string;
  username: string;
  category: string;
}

export const DefaultLeadStatus: TimelineEvents = {
  eventname: "",
  date: "",
  description: "",
  username: "",
  category: "",
};

export async function get_timeline_controller(lead_id: string) {
  const timeline = await get_timeline_from_server(lead_id);
  console.log(timeline.timeline);
  return timeline.timeline;
}

export async function set_timeline_controller(data: any) {
  const data_log = {
    object_identifier: data.id,
    activity_type: "User Comment",
    description: data.description,
  };
  const timelineObj = await set_timeline_on_server(data_log);
  console.log("timeline", timelineObj);
  return timelineObj;
}

async function get_timeline_from_server(id: string) {
  const urlPart = apiPaths.gettimelinelist + "?leadId=" + id;
  try {
    const response = await apiClient(urlPart, "ProdBackendServer", {
      method: "GET",
    });
    return response;
  } catch (error: any) {
    console.error("Error getting fetching timeline:", error);
    return false;
  }
}

async function set_timeline_on_server(data: any) {
  const urlPart = apiPaths.settimeline;
  try {
    const response = await apiClient(urlPart, "ProdBackendServer", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error: any) {
    console.error("Error setting timeline:", error);
    return false;
  }
}
