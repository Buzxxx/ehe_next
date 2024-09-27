/* eslint-disable react/jsx-key */
"use client"

import { useState, useEffect } from "react"
import DragNDropLayout from "@/components/import/layout/dragNDropLayout"
import ImportHeader from "../../ui/importHeader"
import { Separator } from "@/components/ui/separator"
import { MoveLeft, MoveRight, Trash2 } from "@/components/ui/icons"
import { HeaderMapping } from "@/components/lead/features/headerMapping"
import FileUploader from "../../features/importLeads/fileUploader"

const LeadImportLayout = () => {
  const [files, setFiles] = useState<File[]>([])
  const [csvData, setCsvData] = useState<any[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [headerMapping, setHeaderMapping] = useState<{
    [key: string]: string
  } | null>(null)
  const [currentStep, setCurrentStep] = useState(0) // Track the current step
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const handleHeaderSelect = (mapping: { [key: string]: string }) => {
    setHeaderMapping(mapping)
    handleNextStep() // Move to the next step after mapping headers
  }

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 2))
  }

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
  }

  const handleRemoveFile = () => {
    // Reset all state related to file selection and data
    setFiles([])
    setCsvData([])
  }

  useEffect(() => {
    if (csvData.length > 0) {
      setHeaders(Object.keys(csvData[0]))
    }
  }, [csvData])

  // Function to handle CSV upload
  const handleUpload = async () => {
    if (!headerMapping) {
      alert("Please map the headers before uploading.")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate the upload process
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          return 100
        }
        return prevProgress + 10 // Increment progress
      })
    }, 500) // Update every 500 milliseconds

    // try {
    //   await UploadLeadsFromCsv({ data: csvData, headers: headerMapping })

    //   alert("Upload successful!")
    // } catch (error) {
    //   alert("Failed to upload: " + (error as Error).message)
    // } finally {
    //   setIsUploading(false)
    // }
  }

  // Array of steps with components and optional buttons
  const fileUploadSteps = [
    <DragNDropLayout
      supportedFileTypes={".csv"}
      className="md:w-4/5 mt-8 mx-auto"
      csvData={csvData}
      setCsvData={setCsvData}
      files={files}
      setFiles={setFiles}
      buttons={[
        {
          btnText: "Remove File",
          btnIcon: <Trash2 size={16} />,
          btnFn: handleRemoveFile,
          disabled: false,
        },
        {
          btnText: "Next Step",
          btnIcon: <MoveRight size={16} />,
          btnFn: handleNextStep,
          disabled: files.length === 0,
          variant: "affirmative",
        },
      ]}
    />,
    <HeaderMapping
      headers={headers}
      onHeaderSelect={handleHeaderSelect}
      buttons={[
        {
          btnText: "Previous Step",
          btnIcon: <MoveLeft size={16} />,
          btnFn: handlePrevStep,
          disabled: false,
        },
        {
          btnText: "Submit Mapping",
          btnIcon: <MoveRight size={16} />,
          btnFn: handleHeaderSelect,
          variant: "affirmative",
          disabled: false,
        },
      ]}
    />,

    <FileUploader
      files={files}
      uploadProgress={uploadProgress}
      handleUpload={handleUpload}
      isUploading={isUploading}
      buttons={[
        {
          btnText: "Prev Step",
          btnIcon: <MoveLeft size={16} />,
          btnFn: handlePrevStep,
          disabled: false,
        },
      ]}
    />,
  ]

  return (
    <div className="py-2">
      <ImportHeader currentStep={currentStep} />
      <Separator />

      {fileUploadSteps[currentStep]}
    </div>
  )
}

export default LeadImportLayout
