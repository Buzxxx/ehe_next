// /components/import/layout/dragNDropLayout.tsx
import React from "react"
import DragNdrop from "../feature/dragNDrop"
import PreviewTable from "../ui/previewTable"

interface DragNDropLayoutProps {
  supportedFileTypes?: string
  className?: string
  csvData: any[]
  setCsvData: React.Dispatch<React.SetStateAction<any[]>>
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  files: File[]
}

const DragNDropLayout: React.FC<DragNDropLayoutProps> = ({
  supportedFileTypes = ".pdf,.docx,.pptx,.txt,.xlsx", // Default supported types
  className,
  csvData,
  setCsvData,
  setFiles,
  files,
}) => {
  return (
    <div>
      {csvData.length === 0 ? (
        <DragNdrop
          supportedFileTypes={supportedFileTypes}
          className={className}
          csvData={csvData}
          setCsvData={setCsvData}
          setFiles={setFiles}
          files={files}
        />
      ) : (
        <section className="mt-4">
          <PreviewTable data={csvData} />
        </section>
      )}
    </div>
  )
}

export default DragNDropLayout
