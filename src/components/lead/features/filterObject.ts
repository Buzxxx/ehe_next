import update_url from "@/utility/updateUrl";
import { apiPaths } from "../urls";
import apiClient from "@/apiServices/apiClient";
import { getCookie } from "@/cookies/cookiesService";

type FilterOption = {
  name: string
  label: string
  placeholder: string
  options: { [key: string]: string }
}

export const FilterSelect: { [key: string]: FilterOption } = {
  assigned_to: {
    name: "assigned_to",
    label: "Assigned to",
    placeholder: "Select User",
    options: {}, // Type is now inferred correctly
  },
  status: {
    name: "status",
    label: "Status",
    placeholder: "Select Status",
    options: {}, // Type is now inferred correctly
  },
}

//getfilter

export async function get_filter_object() {
  const filterData = await get_filter_obj_from_server();
  return filterData;
}

export async function get_access_token() {
  const accessTokenName = "accessToken";
  return await getCookie(accessTokenName);
}

async function get_filter_obj_from_server() {
  const token = await get_access_token();
  try {
    const response = await apiClient(apiPaths.getfilter, "ProdBackendServer", {
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

// Reads URL OBJ and return filterby Obj from the URL
export function get_default_filterBy_obj(params: URLSearchParams): {
  [key: string]: string[];
} {
  if (params.has("filter_by")) {
    const filterByString = params.get("filter_by");
    const decodedParams = convert_string_to_filterByObj(
      filterByString ? filterByString : ""
    );
    if (decodedParams.filter_by) {
      return decodedParams.filter_by;
    }
  }
  return {};
}

export function filter_multiselect_change_controller(
  params: URLSearchParams,
  obj: {}
) {
  const serializedObj = covert_filterByObj_to_string(obj);
  params.set("filter_by", serializedObj);
  const finalUrl = encodeUrlParameters(params);
  update_url(finalUrl);
}

// Reads FilterBy obj and return string
const covert_filterByObj_to_string = (
  userInputObj: Record<string, string[]>
): string => {
  const params = Object.entries(userInputObj)
    .filter(([_, values]) => values && values.length > 0)
    .map(([filterName, values]) => {
      const formattedValues = `[${values.join(",")}]`;
      return `${filterName}:${formattedValues}`;
    })
    .join(";");
  return params.length > 0 ? params : "";
};

// Reads string and return filterby Obj
const convert_string_to_filterByObj = (filterByString: string) => {
  const filter_by: { [key: string]: any } = {};

  if (filterByString) {
    const filterEntries = filterByString.split(";");

    filterEntries.forEach((entry: string) => {
      const [key, value] = entry.split(":");

      if (value) {
        try {
          if (value.startsWith("[") && value.endsWith("]")) {
            filter_by[key] = JSON.parse(value);
          } else if (value.startsWith("{") && value.endsWith("}")) {
            filter_by[key] = JSON.parse(value);
          } else {
            filter_by[key] = value;
          }
        } catch (error) {
          console.error(`Error parsing JSON for key "${key}":`, error);
          filter_by[key] = value;
        }
      }
    });
  }
  return { filter_by };
};

export const decodeUrlParameters = (params: URLSearchParams) => {
  const result: Record<string, string[]> = {};
  params.forEach((value, key) => {
    result[key] = [value];
  });
  return result;
};

export const encodeUrlParameters = (params: URLSearchParams): string => {
  const queryString = Array.from(params.entries())
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const fullUrl = `?${queryString}`;
  return fullUrl;
};
