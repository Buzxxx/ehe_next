/**
 * @path src/components/lead/ui/leadPage/timelineTopbar.tsx
 */

import { Button } from "@/components/ui/button"
import {
  Blocks,
  Plus,
  Mail,
  Chat,
  Settings2,
  Ellipsis,
} from "@/components/ui/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const TimelineTopbar = ({
  setShowCallback,
  setShowMeeting,
}: {
  setShowCallback: React.Dispatch<React.SetStateAction<boolean>>
  setShowMeeting: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className="flex justify-between items-center w-full bg-slate-100 px-4 py-2 mb-8 rounded-t-md">
      <div className="flex items-center justify-between gap-2">
        <Button className="bg-sky-600 hover:bg-sky-500 text-white rounded-sm">
          <Mail size={16} /> New Email
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-transparent hover:bg-sky-100 py-2 px-4 text-gray-800 hover:text-gray-950 flex items-center gap-1 text-sm transition-colors rounded-md">
            <Plus size={16} /> Add Activity
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-40 ml-auto">
            <DropdownMenuItem onClick={() => setShowCallback(true)}>
              Call back
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowMeeting(true)}>
              Meeting
            </DropdownMenuItem>
            <DropdownMenuItem>Client Visit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden items-center justify-between md:flex">
        <Button className="bg-transparent hover:bg-sky-50 text-black">
          <Blocks /> Integrate
        </Button>
        <Button className="bg-transparent hover:bg-sky-50 text-black">
          <Chat />
        </Button>
        <Button className="bg-transparent hover:bg-sky-50 text-black">
          <Settings2 />
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="bg-transparent hover:bg-sky-100 py-2 px-4 text-gray-800 hover:text-gray-950 flex items-center gap-1 text-sm transition-colors rounded-md md:hidden">
          <Ellipsis size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="md:hidden">
          <DropdownMenuItem className="flex items-center gap-2 ">
            <Blocks strokeWidth={1.5} size={16} /> Integrate
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 ">
            <Chat size={16}  /> Comment
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 ">
            <Settings2 strokeWidth={1.5} size={16} /> Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default TimelineTopbar
