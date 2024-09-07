export interface URLPARAMETER {
  filter_by?: { [key: string]: string };
  sort_by?: string;
  page?: string;
  per_page?: string;
  order_by?: string;
}

export async function filter_string(values: URLPARAMETER) {
  if (values.filter_by) {
    console.log("called");
    console.log(values.filter_by);
    const str = build_filter_by_string(values.filter_by);
    console.log(str);
  }
}

function build_filter_by_string(obj: {}) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
}
