// importObject.ts
import csvToJson from "@/fileImportServices/csvServices"

// Updated function to accept state setters as arguments
export function handleFilesSelected(
  selectedFiles: File[],
  setFiles: React.Dispatch<React.SetStateAction<File[]>>,
  setCsvData: React.Dispatch<React.SetStateAction<any[]>>
) {
  setFiles(selectedFiles)

  if (selectedFiles.length > 0) {
    const file = selectedFiles[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const csvString = event.target?.result as string
      const parsedData = csvToJson(csvString)
      setCsvData(parsedData)
    }

    reader.onerror = () => {
      console.error("Error reading file")
    }

    reader.readAsText(file) // Read the file as text
  }
}
