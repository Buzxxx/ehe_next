import { apiPaths } from "../urls";
import { get_access_token } from "./filterObject";
import apiClient from "@/apiServices/apiClient";
import {
  setCookie,
  deleteCookie,
  getCookie,
  setResponseCookie,
} from "@/cookies/cookiesService";

const userDataCookieName = "payload";

export async function get_user_data_from_cookie() {
  const userDataString = await getCookie(userDataCookieName);
  if (userDataString) {
    return JSON.parse(userDataString);
  } else {
    return { id: "1", name: "unknown user", email: "system@gmail.com" };
  }
}

export async function get_all_active_employee_list_controller() {
  const empList = await get_all_active_employee_list();
  return empList;
}

async function get_all_active_employee_list() {
  const urlPart = apiPaths.getAllActiveEmployeeList;
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