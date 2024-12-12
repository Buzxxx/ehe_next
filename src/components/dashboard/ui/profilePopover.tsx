import React from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Avataar from "./avataar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ProfilePopoverProps {
  className: string
  trigger: React.ReactNode
  src: string
  username?: string
  role?: string
  lastLogin?: string
}

const ProfilePopover: React.FC<ProfilePopoverProps> = ({
  className,
  trigger,
  src,
  username,
  role,
  lastLogin,
}) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className={className} content="rounded-2xl">
        <div className="p-4 flex flex-col justify-center items-center bg-gray-50 border-b">
          <Link
            href={`/profile`}
            className="border mb-2 p-1 rounded-full border-sky-600"
          >
            <Avataar className="w-16 h-16" src={src} />
          </Link>
          <Link href={`/profile`} className="text-base">
            {username ? username : "Guest"}

            {role ? role : ""}
          </Link>
          <p className="text-xs">
            Last Login - &nbsp;
            {lastLogin ? lastLogin : "Recently"}
          </p>
        </div>
        <div className="p-2 w-full flex justify-end">
          <Button className="py-2 px-4 text-slate-400 bg-slate-50 border transition-all hover:border-slate-600 hover:bg-white hover:text-slate-600">
            Log Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ProfilePopover
