/**
 * @path src/components/workplace/ui/workCard.tsx
 */

import Avataar from "@/components/lead/ui/leadPage/avataar"
import { TableCell, TableRow } from "@/components/ui/table"
import { EllipsisVertical, Mail, Phone } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export const WorkCard = () => (
  <TableRow className="rounded-none">
    <TableCell>
      <Link href={`/workforce/${1}`} className="flex gap-2 items-center">
        <Input type="checkbox" className="h-fit w-fit" />
        <Avataar />
        <div>
          <h6 className="font-medium text-base">John Doe</h6>
          <p className="text-gray-500 text-sm">Cheif Technical Officer</p>
        </div>
      </Link>
    </TableCell>
    <TableCell>
      <h6>Employee</h6>
    </TableCell>
    <TableCell>
      <div className="flex gap-2 items-center">
        <Mail color="gray" size={16} />
        <h6>example@user.com</h6>
      </div>
    </TableCell>
    <TableCell className=" gap-2 items-center">
      <div className="flex gap-2 items-center">
        <Phone color="gray" size={16} />
        <h6>+91 900000000</h6>
      </div>
    </TableCell>
    <TableCell>
      <button>
        <EllipsisVertical />
      </button>
    </TableCell>
  </TableRow>
)
