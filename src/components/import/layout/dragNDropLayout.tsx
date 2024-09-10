// /components/import/layout/dragNDropLayout.tsx
import React from "react"
import DragNdrop from "../feature/dragNDrop/dragNDrop"
import PreviewTable from "../feature/dragNDrop/previewTable"
import LeadImportNavButtons, {
  LeadImportButtonProps,
} from "@/components/lead/features/importLeads/leadImportNavButtons"

interface DragNDropLayoutProps {
  supportedFileTypes?: string
  className?: string
  csvData: any[]
  setCsvData: React.Dispatch<React.SetStateAction<any[]>>
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  files: File[]
  buttons: LeadImportButtonProps[]
}

const DragNDropLayout: React.FC<DragNDropLayoutProps> = ({
  supportedFileTypes = ".pdf,.docx,.pptx,.txt,.xlsx", // Default supported types
  className,
  csvData,
  setCsvData,
  setFiles,
  files,
  buttons,
}) => {
  return (
    <>
      {files.length > 0 && <LeadImportNavButtons buttons={buttons} />}

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
    </>
  )
}

export default DragNDropLayout
