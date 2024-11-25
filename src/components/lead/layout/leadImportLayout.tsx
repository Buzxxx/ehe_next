/* eslint-disable react/jsx-key */
"use client";

import { useState, useEffect } from "react";
import DragNDropLayout from "@/components/import/layout/dragNDropLayout";
import ImportHeader from "@/components/lead/ui/importHeader";
import { Separator } from "@/components/ui/separator";
import { MoveLeft, MoveRight, Trash2 } from "@/components/ui/icons";
import { HeaderMapping } from "@/components/lead/features/headerMapping";
import FileUploader from "@/components/lead/features/importLeads/fileUploader";
import { create_lead_bulk_controller } from "@/components/lead/features/leadObject";
import { useToast } from "@/components/ui/use-toast";

const database_cols = [
  "name",
  "email",
  "contact",
  "lead_type",
  "query",
  "recieved_date",
  "interested_in",
  "assigned_to",
  "product_code",
  "product_type",
  "follow_up_current_status",
];

const LeadImportLayout = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [headerMapping, setHeaderMapping] = useState<{
    [key: string]: string;
  } | null>(null);
  const [selectedMapping, setSelectedMapping] = useState<{
    [key: string]: string;
  }>({});

  const [currentStep, setCurrentStep] = useState(0); // Track the current step
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleHeaderSelect = () => {
    setHeaderMapping(selectedMapping);
    handleNextStep();
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
    if (csvData.length > 0) {
      setHeaders(Object.keys(csvData[0]));
    }
  }, [csvData]);

  const handleUpload = async () => {
    if (!headerMapping) {
      toast({
        title: "Header Mapping Missing",
        description: "Please map the headers before uploading.",
        variant: "destructive",
      });
      return;
    }

    const validateRow = (row: { [key: string]: string }) => {
      const requiredFields = ["name", "contact", "email", "product_code"];
      const concatenatedValues = requiredFields
        .map((field) => row[field]?.trim())
        .join("");

      if (!concatenatedValues) {
        return {
          isValid: false,
          missingFields: requiredFields.filter((field) => !row[field]?.trim()),
        };
      }

      return {
        isValid: true,
        missingFields: [],
      };
    };

    try {
      setIsUploading(true); // Start the upload process

      const transformedData = csvData.map((row, index) => {
        const newRow: { [key: string]: string } = {};

        // Ensuring all database_cols keys exist in the newRow
        database_cols.forEach((col) => {
          const mappedHeader = Object.entries(headerMapping).find(
            ([newKey]) => newKey === col
          )?.[1]; // mapped header for database column

          newRow[col] = mappedHeader ? row[mappedHeader] || "" : ""; // Map or default to ""
        });

        // Validate required fields
        const validation = validateRow(newRow);
        if (!validation.isValid) {
          setIsUploading(false);
          console.error(
            `Validation Error: Missing fields [${validation.missingFields.join(
              ", "
            )}] in row ${index + 1}`,
            newRow
          );
          throw new Error(
            `Row ${
              index + 1
            } is missing required fields: ${validation.missingFields.join(
              ", "
            )}`
          );
        }
        return newRow;
      });
      setUploadProgress(0);
      const chunkSize = 50; // Upload 50 leads at a time
      const totalChunks = Math.ceil(transformedData.length / chunkSize);

      for (let i = 0; i < totalChunks; i++) {
        const chunk = transformedData.slice(i * chunkSize, (i + 1) * chunkSize);

        const result = await create_lead_bulk_controller(chunk);
        console.log(
          `Chunk ${i + 1}/${totalChunks} uploaded successfully:`,
          result
        );

        if (result.success) {
          const progress = Math.round(((i + 1) / totalChunks) * 100);
          setUploadProgress(progress);
        } else {
          throw new Error(`Chunk ${i + 1} failed to upload.`);
        }
      }

      toast({
        title: "Leads Imported Successfully",
        description: `${transformedData.length} Leads created`,
      });
    } catch (error: any) {
      console.error("Error creating leads:", error);
      toast({
        title: "Validation or Upload Failed",
        variant: "destructive",
        description: error.message || `Please try again later.`,
      });
      throw error; // Re-throw the error to avoid changing `setIsUploading`
    } finally {
      // Only reset isUploading if no error was re-thrown
      setIsUploading(false);
      setUploadProgress(100); // Optional: Ensure progress is marked complete
    }
  };

  const handleCancelUpload = () => {
    if (isUploading) {
      toast({
        title: "Upload Canceled",
        description:
          "The upload process has been stopped. Progress has been reset.",
        variant: "default",
      });
    }

    // Reset all relevant states
    setIsUploading(false);
    setUploadProgress(0);
    setFiles([]);
    setCsvData([]);
    setHeaderMapping(null);
    setSelectedMapping({});
    setCurrentStep(0);
  };

  // Array of steps with components and optional buttons
  const fileUploadSteps = [
    <DragNDropLayout
      supportedFileTypes={".csv"}
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
      setSelectedMapping={setSelectedMapping}
      selectedMapping={selectedMapping}
      database_cols={database_cols}
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
          btnText: "Cancel",
          btnIcon: <MoveLeft size={16} />,
          btnFn: handleCancelUpload,
          disabled: false,
        },
      ]}
    />,
  ];

  return (
    <div className="py-2">
      <ImportHeader currentStep={currentStep} />
      <Separator />

      {fileUploadSteps[currentStep]}
    </div>
  );
};

export default LeadImportLayout;
