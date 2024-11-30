/**
 * @path src/components/workplace/ui/workCard.tsx
 */

import Avataar from "@/components/lead/ui/leadPage/avataar"
import { TableCell, TableRow } from "@/components/ui/table"
import { EllipsisVertical, Mail, Phone } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export const WorkCard = ({
  name,
  email,
  phone,
}: {
  name: string
  email: string
  phone: string
}) => (
  <TableRow className="border-0 py-0 h-fit whitespace-nowrap">
    <TableCell className="min-w-[200px]">
      <Link
        href={`/teams/${1}`}
        className="flex gap-2 items-center flex-nowrap truncate"
      >
        <Input type="checkbox" className="h-fit w-fit shrink-0" />
        <Avataar />
        <div className="truncate">
          <h6 className="font-medium text-base truncate">{name}</h6>
          <p className="text-gray-500 text-sm truncate">
            Chief Technical Officer
          </p>
        </div>
      </Link>
    </TableCell>
    <TableCell className="min-w-[150px] text-sm">
      <h6 className="truncate">Employee</h6>
    </TableCell>
    <TableCell className="min-w-[200px]">
      <div className="flex gap-2 items-center flex-nowrap truncate">
        <Mail color="gray" size={16} />
        <h6 className="truncate">{email}</h6>
      </div>
    </TableCell>
    <TableCell className="min-w-[150px]">
      <div className="flex gap-2 items-center flex-nowrap truncate">
        <Phone color="gray" size={16} />
        <h6 className="truncate">{phone}</h6>
      </div>
    </TableCell>
    <TableCell className="min-w-[50px] text-center">
      <button>
        <EllipsisVertical />
      </button>
    </TableCell>
  </TableRow>
)
