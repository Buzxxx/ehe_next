import PreviewTable from "@/components/lead/ui/previewTable";
import { useState, useEffect } from "react";
import { handleFilesSelected } from "@/components/import/feature/importObject";
import DragNDropLayout from "@/components/import/layout/dragNDropLayout";
import ImportHeader from "../../ui/importHeader";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  MoveLeft,
  MoveRight,
  Trash2,
} from "@/components/ui/icons";
import { HeaderMapping } from "@/components/lead/layout/importLayouts/headerMapping";
import { UploadLeadsFromCsv } from "@/components/lead/features/leadApiClient";

const CsvImportLayout = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [headerMapping, setHeaderMapping] = useState<{
    [key: string]: string;
  } | null>(null);
  const [currentStep, setCurrentStep] = useState(0); // Track the current step
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onFilesSelected = (selectedFiles: File[]) => {
    handleFilesSelected(selectedFiles, setFiles, setCsvData);
  };

  const handleHeaderSelect = (mapping: { [key: string]: string }) => {
    setHeaderMapping(mapping);
    handleNextStep(); // Move to the next step after mapping headers
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 2));
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleRemoveFile = () => {
    // Reset all state related to file selection and data
    setFiles([]);
    setCsvData([]);
  };

  useEffect(() => {
    console.log("CSV Data:", csvData);
    console.log("Header Mapping:", headerMapping);
    if (csvData.length > 0) {
      setHeaders(Object.keys(csvData[0])); // Assuming the first row contains header names
    }
  }, [csvData, headerMapping]);

  // Function to handle CSV upload
  const handleUpload = async () => {
    if (!headerMapping) {
      alert("Please map the headers before uploading.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate the upload process
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          return 100;
        }
        return prevProgress + 10; // Increment progress
      });
    }, 500); // Update every 500 milliseconds

    // try {
    //   await UploadLeadsFromCsv({ data: csvData, headers: headerMapping })

    //   alert("Upload successful!")
    // } catch (error) {
    //   alert("Failed to upload: " + (error as Error).message)
    // } finally {
    //   setIsUploading(false)
    // }
  };

  return (
    <div className="py-2">
      <ImportHeader currentStep={currentStep} />
      <Separator />

      {currentStep === 0 ? (
        files.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <DragNDropLayout
              onFilesSelected={onFilesSelected}
              supportedFileTypes={".csv"}
              className="md:w-4/5 mt-8 mx-auto"
            />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mt-4">
              <Button
                type="button"
                onClick={handleRemoveFile}
                className="text-slate-800 bg-transparent border border-slate-600 hover:border-slate-900 hover:text-slate-900"
              >
                <Trash2 size={16} className="mr-2" />
                Remove File
              </Button>
              <Button
                type="button"
                onClick={handleNextStep}
                className="ml-auto flex gap-1 items-center bg-dashboard-primary hover:bg-dashboard-secondary"
              >
                Next <MoveRight />
              </Button>
            </div>
            <PreviewTable data={csvData} />
          </>
        )
      ) : currentStep === 1 ? (
        <HeaderMapping
          headers={headers}
          data={csvData}
          onHeaderSelect={handleHeaderSelect}
          handlePrevStep={handlePrevStep}
        />
      ) : (
        <div>
          <Button
            onClick={handlePrevStep}
            className="mt-4 text-slate-800 bg-transparent border border-slate-600 hover:border-slate-900 hover:text-slate-900"
          >
            <MoveLeft className="mr-2" />
            Prev Step
          </Button>
          <div className="min-h-40 w-full rounded-md border border-dashed border-dashboard-primary mt-4 p-4 flex flex-col items-center justify-center">
            {uploadProgress !== 100 ? (
              <>
                <p className="flex gap-2">Upload {files[0].name}</p>
                <Button
                  type="button"
                  className=" block mx-auto mt-8 rounded-none bg-gray-200 text-black border border-slate-800 "
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
        </div>
      )}
    </div>
  );
};

export default CsvImportLayout;
