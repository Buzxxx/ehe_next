// File: DragNDropLayout.tsx
import React, { useEffect, useState, DragEvent, ChangeEvent } from "react"
import DragNdrop from "../ui/dragNDrop"

// Define the prop types for the component
interface DragNDropLayoutProps {
  onFilesSelected: (files: File[]) => void
  supportedFileTypes?: string
  className?: string
}

const DragNDropLayout: React.FC<DragNDropLayoutProps> = ({
  onFilesSelected,
  supportedFileTypes = ".pdf,.docx,.pptx,.txt,.xlsx", // Default supported types
  className,
}) => {
  const [files, setFiles] = useState<File[]>([])

  // Handle file selection from input
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  // Handle file drop
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = event.dataTransfer.files
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  // Handle file removal
  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  useEffect(() => {
    onFilesSelected(files)
  }, [files, onFilesSelected])

  return (
    <DragNdrop
      onFilesSelected={(files) => setFiles(files)}
      handleFileChange={handleFileChange}
      handleDrop={handleDrop}
      handleRemoveFile={handleRemoveFile}
      files={files}
      supportedFileTypes={supportedFileTypes}
      className={className}
    />
  )
}

export default DragNDropLayout
