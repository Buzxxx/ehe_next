// importObject.ts
import csvToJson from "@/fileImportServices/csvServices"

export function parseCsvFile(file: File): Promise<any[]> {
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