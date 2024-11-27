import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Avataar from "../leadPage/avataar"

import {
  Phone,
  WhatsAppOutline,
  Bookmark,
  PersonIcon,
  CalendarIcon,
} from "@/components/ui/icons"

import { paths } from "../../urls"
import { Lead } from "@/components/lead/features/leadObject"

import { formatDate } from "@/utility/formatDate"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useLeadSave } from "../../hooks/useLeadSave"

type LeadCardProps = {
  isSelected: boolean
  onToggle: () => void
  idx: number
  lead: Lead
}

export const LeadCard: React.FC<LeadCardProps> = ({
  idx,
  lead,
  isSelected,
  onToggle,
}) => {
  const { isSaved, toggleSave } = useLeadSave(lead.id)

  return (
    <Card className="bg-white shadow-sm drop-shadow-sm border border-slate-200 text-gray-800 rounded-lg transition hover:shadow-xl md:w-[49%] lg:w-[32.85%] flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between p-4 gap-3 space-y-0">
        <div className="flex gap-2 items-center rounded-sm border p-1 ">
          <Image
            src={"/lead/99acres.svg"}
            height={16}
            width={16}
            alt="Company placeholder logo"
          />
          <span className="text-xs font-medium opac">
            {lead.source ?? "Unknown source"}
          </span>
        </div>

        <Badge className="bg-slate-300/75 text-slate-800 hover:bg-slate-400/50 font-medium capitalize">
          {lead.priority ?? "Cold"}
        </Badge>
      </CardHeader>

      <CardContent className=" pb-6 px-4 text-sm flex-1">
        <CardTitle className="  text-indigo-950/80 mb-2 font-normal text-sm">
          {lead.follow_up_current_status
            ? lead.follow_up_current_status
            : "In Progress "}
        </CardTitle>
        <Link
          href={paths.leadPage + lead.id}
          className="flex items-center gap-1"
        >
          <PersonIcon size={20} color="transparent" stroke="gray" />
          <Badge className="bg-indigo-300/25 text-slate-700 justify-between pr-6 pl-2 items-center hover:bg-slate-400/50 gap-1">
            <Avataar className="h-4 w-4 rounded-full border border-slate-400" />
            <p className="text-sm">{lead.name ?? "Unknown Name"}</p>
          </Badge>
        </Link>
      </CardContent>

      <CardFooter className="p-4 py-2 flex gap-2 justify-between border-t border-slate-200 ">
        <div className="flex gap-2 justify-start items-center ">
          <Button
            variant="ghost"
            className="p-0  text-green-600 hover:fill-green-500/30 rounded-full h-fit"
          >
            <Link
              href={`https://wa.me/${lead.contact}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppOutline size={16} />
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="p-0  text-blue-600 hover:fill-blue-500/30 rounded-full h-fit w-fit"
          >
            <Link
              href={`tel:${lead.contact}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone size={16} />
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="p-0  text-yellow-600 hover:text-yellow-400 rounded-full h-fit"
            onClick={toggleSave}
          >
            <Bookmark
              size={16}
              className={isSaved ? "fill-yellow-600" : "fill-none"}
            />
          </Button>
        </div>
        <div className="flex gap-2 items-center justify-end text-xs text-gray-500">
          <CalendarIcon size={16} />
          {formatDate(lead.created_dt)}
        </div>
      </CardFooter>
    </Card>
  )
}
