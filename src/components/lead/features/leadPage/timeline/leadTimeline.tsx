import TimelineForm from "@/components/lead/features/leadPage/timeline/timelineForm";
import TimelineContainer from "./timelineContainer";
import TimelineTopbar from "../../../ui/leadPage/timelineTopbar";
import { Button } from "@/components/ui/button";
import { Copy } from "@/components/ui/icons";
import { MoreHorizontal } from "lucide-react";
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LeadTimeLine = () => {
  const { leadId } = useLeadProfile();
  return (
    <div className="relative h-[calc(100vh-4rem)] bg-gray-100 md:flex items-stretch overflow-auto justify-between gap-4 m-2 mt-4">
      {/* Lead Status Form Wrapper */}
      <div className="md:w-1/3 hidden md:flex flex-col bg-white  rounded-md shadow-sm border ">
        <div className="flex justify-between items-center w-full px-4 py-2 mb-8 rounded-t-md">
          {" "}
          <div className="flex items-center justify-between gap-2">
            {" "}
            <h6 className="font-semibold flex items-center">
              Lead #<span className="text-sky-600 ml-1">{leadId}</span>{" "}
              <button className="ml-2">
                <Copy color="gray" size={16} />
              </button>
            </h6>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal></MoreHorizontal>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="h-full">
          <TimelineForm />
        </div>
      </div>

      {/* Timeline Wrapper */}
      <div className="md:w-fit overflow-hidden max-h-full flex-1 border rounded-t-md bg-gray-100 rounded-md shadow-sm flex flex-col">
        <TimelineTopbar />

        {/* Loading Spinner or Timeline */}
        <div className="flex-1 overflow-y-auto">
          <TimelineContainer />
        </div>
      </div>
    </div>
  );
};

export default LeadTimeLine;
