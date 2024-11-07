import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Avataar from "../leadPage/avataar"

import {
  Phone,
  ExternalLink,
  MapPin,
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
}) => (
  <Card className="bg-white shadow-sm drop-shadow-sm border border-slate-200 text-gray-800 rounded-lg transition hover:shadow-xl md:w-[49%] xl:w-[33.2%] ">
    <CardHeader className="flex flex-row items-start justify-between p-4 gap-3 space-y-0">
      {/* <Checkbox
        className="rounded-sm transition-all data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
        checked={isSelected}
        onClick={onToggle}
      /> */}

      <div className="flex gap-2 items-center rounded-sm border p-1">
        <Image
          src={"/lead/mmt.svg"}
          height={16}
          width={16}
          alt="Make My Trip Logo"
        />
        <span className="text-xs font-medium">Make My Trip</span>
      </div>

      <Badge className="bg-slate-300/75 text-slate-800 hover:bg-slate-400/50 font-medium">
        Low
      </Badge>

      {/* <Link
        href={paths.leadPage + lead.id}
        className="ml-auto text-indigo-500 hover:text-indigo-600 transition"
      >
        <ExternalLink size={18} />
      </Link> */}
    </CardHeader>

    <CardContent className=" pb-6 px-4 text-sm">
      <CardTitle className="  text-indigo-950/80 mb-2 font-normal text-sm">
        Property Visit - Booked
      </CardTitle>
      <Link href={paths.leadPage + lead.id} className="flex items-center gap-1">
        <PersonIcon size={20} color="transparent" stroke="gray" />
        <Badge className="bg-indigo-300/25 text-slate-700 justify-between pr-6 pl-2 items-center hover:bg-slate-400/50 gap-1">
          <Avataar className="h-4 w-4 rounded-full border border-slate-400" />
          <p className="text-sm">{lead.name ?? "Lead Name"}</p>
        </Badge>
        {/* <div>
          <CardTitle className="text-base font-semibold text-indigo-700"></CardTitle>
          <span className="text-gray-500 text-xs flex items-center gap-1">
            <MapPin size={14} className="text-gray-400" />
            {lead.location ?? "Unknown Location"}
          </span>
        </div> */}
      </Link>
      {/* <p className="font-medium">
        Created:{" "}
        <span className="font-normal text-gray-600">
          {formatDate(lead.created_dt) ?? "Jun 04, 2024, 17:01"}
        </span>
      </p>
      <p className="font-medium">
        Status:{" "}
        <span className="font-normal text-gray-600">
          {lead.status ?? "Closed"}
        </span>
      </p> */}
    </CardContent>

    <CardFooter className="p-4 py-2 flex gap-2 justify-between border-t border-slate-200 ">
      <div className="flex gap-2 justify-start items-center ">
        <Button
          variant="ghost"
          className="p-0  text-green-600 hover:fill-green-500/30 rounded-full h-fit"
        >
          <WhatsAppOutline size={16} />
        </Button>
        <Button
          variant="ghost"
          className="p-0  text-blue-600 hover:fill-blue-500/30 rounded-full h-fit"
        >
          <Phone size={16} />
        </Button>
        <Button
          variant="ghost"
          className="p-0  text-yellow-600 hover:fill-yellow-500/30 rounded-full h-fit"
        >
          <Bookmark size={16} />
        </Button>
      </div>
      <div className="flex gap-2 items-center justify-end">
        <CalendarIcon size={16} />
        2d
      </div>
    </CardFooter>
  </Card>
)
