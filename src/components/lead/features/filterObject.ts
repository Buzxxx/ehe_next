//getfilter

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
  history.replaceState(null, "", finalUrl);
}

const covert_filterByObj_to_string = (
  userInputObj: Record<string, string[]>
): string => {
  try {
    const params = Object.entries(userInputObj)
      .filter(([_, values]) => values && values.length > 0)
      .map(([filterName, values]) => {
        const formattedValues = JSON.stringify(values);
        return `${filterName}:${formattedValues}`;
      })
      .join(";");

    return params.length > 0 ? params : "";
  } catch (error) {
    console.error("Error processing the object:", error);
    return "";
  }
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
