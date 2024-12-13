import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import LeadImportNavButtons, {
  LeadImportButtonProps,
} from "./leadImportNavButtons";

interface HeaderMappingProps {
  headers: string[];
  setSelectedMapping: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  selectedMapping: { [key: string]: string };
  database_cols: string[];
  buttons: LeadImportButtonProps[];
}

export const HeaderMapping = ({
  headers,
  setSelectedMapping,
  selectedMapping,
  database_cols,
  buttons,
}: HeaderMappingProps) => {
  const handleHeaderChange = (header: string, column: string) => {
    setSelectedMapping((prev: { [key: string]: string }) => ({
      ...prev,
      [header]: column,
    }));
  };

  return (
    <>
      <LeadImportNavButtons buttons={buttons} />
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {database_cols.map((header) => (
          <div key={header} className="flex items-center justify-between">
            <span className="text-sm font-medium">{header}</span>
            <Select
              onValueChange={(value) => handleHeaderChange(header, value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a column" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </>
  );
};
