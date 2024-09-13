import update_url from "@/utility/updateUrl";

export const FilterSelect = {
  assigned_to: {
    name: "assigned_to",
    label: "Assigned to",
    placeholder: "Select User",
    options: { "4": "Avinash", "36": "Manish", "10": "Ranjit" },
  },
  status: {
    name: "status",
    label: "Status",
    placeholder: "Select Status",
    options: { "1": "New", "2": "Inprogress" },
  },
};

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

export function filterBy_controller(params: URLSearchParams, obj: {}) {
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
  const filter_by: { [key: string]: string[] } = {};
  if (filterByString) {
    const filterEntries = filterByString.split(";");
    filterEntries.forEach((entry: any) => {
      const [key, value] = entry.split(":");
      if (value) {
        filter_by[key] = JSON.parse(value); // Convert stringified array back to array
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
