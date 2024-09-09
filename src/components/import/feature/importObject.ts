// File: importObject.ts

// Converts CSV string to JSON
export default function csvToJson(csvString: string): Record<string, string>[] {
  const rows = csvString.trim().split("\n")
  if (rows.length < 2) {
    return []
  }

  const headers = rows[0].split(",").map((header) => header.trim())

  const jsonData: Record<string, string>[] = []
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i].split(",").map((value) => value.trim())
    if (values.length !== headers.length) {
      continue
    }

    const obj: Record<string, string> = {}
    for (let j = 0; j < headers.length; j++) {
      const key = headers[j]
      const value = values[j] || ""

      obj[key] = value
    }

    jsonData.push(obj)
  }

  return jsonData
}

// Function to parse CSV files
export function parseCsvFile(file: File): Promise<Record<string, string>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const csvString = event.target?.result as string
      const parsedData = csvToJson(csvString)
      resolve(parsedData)
    }

    reader.onerror = () => {
      console.error("Error reading file")
      reject("Error reading file")
    }

    reader.readAsText(file) // Read the file as text
  })
}

// Updated function to handle multiple types of files
export function parseFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    console.log(file.type)
    if (file.type === "text/csv" || file.type === "application/vnd.ms-excel") {
      parseCsvFile(file).then(resolve).catch(reject)
    } else {
      reject(`Unsupported file type: ${file.type}`)
    }
  })
}
