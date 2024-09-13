// src/fileImportServices/csvServices.ts

// Convert CSV string to JSON-like object
export default function csvToJson(csvString: string): any[] {
  const rows = csvString.trim().split("\n");
  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].split(",").map((header) => header.trim());

  const jsonData: Record<string, string>[] = [];
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i].split(",").map((value) => value.trim());
    if (values.length !== headers.length) {
      continue;
    }

    const obj: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      const key = headers[j];
      const value = values[j] || "";

      obj[key] = value;
    }

    jsonData.push(obj);
  }

  return jsonData;
}
