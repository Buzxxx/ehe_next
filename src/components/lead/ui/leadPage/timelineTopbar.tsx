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
import DialogItem from "../modal"
import LeadCallbackForm from "../../features/leadPage/leadCallbackForm"
import LeadMeetingForm from "../../features/leadPage/leadMeetingForm"
import React from "react"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import LeadStatusUpdateForm from "../../features/leadPage/leadStatusUpdateForm"

const TimelineTopbar = ({ leadId }: { leadId: string }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  const dropdownTriggerRef = React.useRef<HTMLButtonElement | null>(null)
  const focusRef = React.useRef<HTMLButtonElement | null>(null)

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current // Save the trigger element
  }

  function handleDialogItemOpenChange(open: boolean) {
    setHasOpenDialog(open)

    if (!open && focusRef.current) {
      focusRef.current.focus() // Restore focus to the dropdown trigger
      focusRef.current = null // Reset focusRef
      
    }
  }
  return (
    <div className="flex justify-between items-center w-full bg-white px-4 py-2 mb-8 rounded-t-md">
      <div className="flex items-center justify-between gap-2">
        <Button className="bg-sky-600 hover:bg-sky-500 text-white rounded-sm">
          <Mail size={16} /> New Email
        </Button>
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
                focusRef.current.focus()
                focusRef.current = null
                event.preventDefault()
              }
            }}
          >
            <DialogItem
              triggerChildren="Update Status"
              onSelect={handleDialogItemSelect}
              onOpenChange={handleDialogItemOpenChange}
              className="md:hidden"
            >
              <DialogTitle className="DialogTitle">
                Update Status
              </DialogTitle>
              <DialogDescription className="DialogDescription"></DialogDescription>
              <LeadStatusUpdateForm
                id={leadId}
                setOpen={handleDialogItemOpenChange}
              />
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
                id={leadId}
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
              <LeadMeetingForm
                id={leadId}
                setOpen={handleDialogItemOpenChange}
              />
            </DialogItem>
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
            <Chat size={16} /> Comment
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
