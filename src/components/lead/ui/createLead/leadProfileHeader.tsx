import Avataar from "@/components/lead/ui/leadPage/avataar"
import { Button } from "@/components/ui/button"
import { Lead } from "../../features/leadObject"
import { Input } from "@/components/ui/input"

const LeadProfileHeader = ({
  isEditing,
  onSave,
  lead,
  setIsEditing,
}: {
  lead?: Lead
  isEditing: boolean
  onSave: (fieldKey: string, value: string | number | boolean) => void
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className="profile-header flex gap-4 justify-between items-center bg-white shadow-sm rounded-md md:p-4 p-2 md:mb-6 mb-2">
      <div className="flex gap-4 items-center">
        <div className="border-r pr-4">
          <Avataar className="rounded-full" />
        </div>
        <div>
          {isEditing ? (
            <Input
              className="font-bold text-2xl text-gray-800 border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={lead?.name || ""}
              placeholder="Lead Name"
              onChange={(e) => onSave("name", e.target.value)} // Save on change
            />
          ) : (
            <h4 className="font-bold text-2xl text-gray-800">
              {lead?.name || "Unnamed Lead"}
            </h4>
          )}
        </div>
      </div>
      {isEditing ? (
        <Button
          onClick={() => setIsEditing(false)}
          className="h-8 w-fit py-0 bg-sky-600 hover:bg-sky-700"
        >
          Save
        </Button>
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          className="h-8 w-fit py-0 bg-gray-400 hover:bg-gray-500"
        >
          Edit
        </Button>
      )}
    </div>
  )
}

export default LeadProfileHeader
