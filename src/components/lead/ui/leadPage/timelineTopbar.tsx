/**
 * @path src/components/lead/ui/leadPage/timelineTopbar.tsx
 */

import { Button } from "@/components/ui/button";
import {
  Blocks,
  Plus,
  Mail,
  Chat,
  Settings2,
  Ellipsis,
} from "@/components/ui/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import DialogItem from "../dropDownModal";
import LeadCallbackForm from "../../features/leadPage/timeline/leadCallbackForm";
import LeadMeetingForm from "../../features/leadPage/timeline/leadMeetingForm";
import React from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import TimelineForm from "../../features/leadPage/timeline/timelineForm/timelineForm";
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext";

const TimelineTopbar = () => {
  const { leadProfile } = useLeadProfile();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false);
  const dropdownTriggerRef = React.useRef<HTMLButtonElement | null>(null);
  const focusRef = React.useRef<HTMLButtonElement | null>(null);
  const id = leadProfile.id?.toString() || "";

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current; // Save the trigger element
  }

  function handleDialogItemOpenChange(open: boolean) {
    setHasOpenDialog(open);

    if (!open && focusRef.current) {
      focusRef.current.focus(); // Restore focus to the dropdown trigger
      focusRef.current = null; // Reset focusRef
    }
  }
  return (
    <div className="flex justify-between items-center w-full bg-white px-4 py-2 mb-8 rounded-t-md">
      <div className="flex items-center justify-between gap-2">
        <Button className="bg-sky-600 hover:bg-sky-500 text-white rounded-sm">
          <Mail size={16} /> New Email
        </Button>
      </div>
      <div className=" items-center justify-between flex">
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button
              ref={dropdownTriggerRef}
              className="bg-transparent hover:bg-sky-100 py-2 px-4 text-gray-800 hover:text-gray-950 flex items-center gap-1 text-sm transition-colors rounded-md"
            >
              <Plus size={16} /> Add Activity
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-40 ml-auto"
            sideOffset={5}
            hidden={hasOpenDialog}
            onCloseAutoFocus={(event) => {
              if (focusRef.current) {
                focusRef.current.focus();
                focusRef.current = null;
                event.preventDefault();
              }
            }}
          >
            <DropdownMenuLabel>Add Activity</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DialogItem
                triggerChildren="Update Status"
                onSelect={handleDialogItemSelect}
                onOpenChange={handleDialogItemOpenChange}
                className="md:hidden"
              >
                <DialogTitle className="DialogTitle">Update Status</DialogTitle>
                <DialogDescription className="DialogDescription"></DialogDescription>
                <TimelineForm />
              </DialogItem>

              <DialogItem
                triggerChildren="Callback"
                onSelect={handleDialogItemSelect}
                onOpenChange={handleDialogItemOpenChange}
              >
                <DialogTitle className="DialogTitle">
                  Set up a Call back
                </DialogTitle>
                <DialogDescription className="DialogDescription"></DialogDescription>
                <LeadCallbackForm
                  id={id}
                  setOpen={handleDialogItemOpenChange}
                />
              </DialogItem>
              <DialogItem
                triggerChildren="Meeting"
                onSelect={handleDialogItemSelect}
                onOpenChange={handleDialogItemOpenChange}
              >
                <DialogTitle className="DialogTitle">
                  Set up a Meeting
                </DialogTitle>
                <DialogDescription className="DialogDescription"></DialogDescription>
                <LeadMeetingForm id={id} setOpen={handleDialogItemOpenChange} />
              </DialogItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TimelineTopbar;
