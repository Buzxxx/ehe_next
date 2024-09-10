import { Button } from "@/components/ui/button"
import { CheckCircle } from "@/components/ui/icons"
import LeadImportNavButtons, {
  LeadImportButtonProps,
} from "./leadImportNavButtons"

const FileUploader = ({
  files,
  uploadProgress,
  handleUpload,
  isUploading,
  buttons,
}: {
  files: File[]
  uploadProgress: number
  handleUpload: () => void
  isUploading: boolean
  buttons: LeadImportButtonProps[]
}) => {
  return (
    <>
      <LeadImportNavButtons buttons={buttons} />
      <div className="min-h-40 w-full rounded-md border border-dashed border-dashboard-primary mt-4 p-4 flex flex-col items-center justify-center">
        {uploadProgress !== 100 ? (
          <>
            <p className="flex gap-2">Upload {files[0].name}</p>
            <Button
              type="button"
              className="block mx-auto mt-8 rounded-none bg-gray-200 text-black border border-slate-800"
              onClick={handleUpload}
              disabled={isUploading}
            >
              Upload
            </Button>
          </>
        ) : (
          <>
            <CheckCircle color="green" />
            <p className="mt-4 text-green-600 text-center">
              CSV data uploaded successfully!
            </p>
          </>
        )}

        {/* Progress Bar */}
        {isUploading && (
          <div className="relative w-full bg-gray-200 mt-4 h-4 rounded">
            <div
              className="absolute top-0 left-0 h-4 bg-blue-500 rounded"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default FileUploader
