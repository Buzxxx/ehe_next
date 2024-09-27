// File: DragNdrop.tsx
import React, { DragEvent, ChangeEvent, useEffect, useState } from "react"
import { CheckCircle, CloudUpload, Trash2 as DeleteIcon } from "lucide-react"
import "@/app/drag-drop.css"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import PreviewTable from "@/components/import/feature/dragNDrop/previewTable"
import { parseFile } from "../importObject"

interface DragNdropProps {
  supportedFileTypes?: string
  className?: string
  csvData: any[]
  setCsvData: React.Dispatch<React.SetStateAction<any[]>>
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  files: any[]
}

const DragNdrop: React.FC<DragNdropProps> = ({
  supportedFileTypes = ".pdf,.docx,.pptx,.txt,.xlsx", // Default supported types
  className,
  csvData,
  setCsvData,
  setFiles,
  files,
}) => {
  // Handle file selection from input
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
        const parsedFile = await parseFile(newFiles[0])
        setCsvData(parsedFile)
    }
  }

  // Handle file drop
  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = event.dataTransfer.files
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
      const parsedFile = await parseFile(newFiles[0])
      setCsvData(parsedFile)
    }
  }

  // Handle file removal
  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setCsvData([])
  }

  return (
    <>
      <section
        className={`bg-charcoal-foregroundAccent rounded-md ${className}`}
      >
        <div
          className={`document-uploader border-2 border-dashed border-dashboard-primary rounded-lg p-4 flex items-center justify-evenly flex-col relative cursor-pointer min-h-64 ${
            files.length > 0
              ? "upload-box border-dashboard-secondary"
              : "upload-box"
          }`}
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <>
            <div className="upload-info flex items-center mb-4 flex-col md:flex-row  max-md:text-center">
              <CloudUpload className="mr-4" />
              <div>
                <p>Drag and drop your files here</p>
                <p>
                  Limit 15MB per file. Supported files:{" "}
                  {supportedFileTypes.replace(/,/g, ", ")}
                </p>
              </div>
            </div>
            <Input
              type="file"
              hidden
              id="browse"
              onChange={handleFileChange}
              accept={supportedFileTypes}
              multiple
            />
            <Button
              type="button"
              className="bg-dashboard-primary hover:bg-dashboard-secondary"
            >
              <Label htmlFor="browse" className="browse-btn border">
                Browse files
              </Label>
            </Button>
          </>

          {files.length > 0 && (
            <div className="flex flex-col gap-2 w-full h-fit">
              <div className="w-full h-full">
                {files.map((file, index) => (
                  <div className="file-item" key={index}>
                    <div className="file-info">
                      <p>{file.name}</p>
                    </div>
                    <div className="file-actions">
                      <DeleteIcon onClick={() => handleRemoveFile(index)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {files.length > 0 && (
            <div className="success-file">
              <CheckCircle style={{ color: "#6DC24B", marginRight: 1 }} />
              <p>{files.length} file(s) selected</p>
            </div>
          )}
        </div>
      </section>
      <section className="mt-4">
        {csvData.length > 0 && <PreviewTable data={csvData} />}
      </section>
    </>
  )
}

export default DragNdrop
