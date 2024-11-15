import React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { WhatsAppOutline, Phone, Bookmark } from "@/components/ui/icons"
import { formatDate } from "@/utility/formatDate"
import { Lead } from "@/components/lead/features/leadObject"
import Avataar from "../leadPage/avataar"

interface LeadRowProps {
  lead: Lead
  isSelected: boolean
  onToggle: () => void
}

const LeadRow: React.FC<LeadRowProps> = ({ lead, isSelected, onToggle }) => {
  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      {/* Selection Checkbox */}
      <TableCell className="w-[50px] p-2">
        <Checkbox checked={isSelected} onChange={onToggle} />
      </TableCell>

      {/* Lead Name */}
      <TableCell className="flex items-center gap-3 p-2">
        <Avataar />
        <div>
          <p className="font-medium text-gray-800">
            {lead.name || "Lead Name"}
          </p>
          <p className="text-xs text-gray-500">
            {lead.location || "Unknown Location"}
          </p>
        </div>
      </TableCell>

      {/* Date Created */}
      <TableCell className="p-2 text-sm text-gray-600">
        {formatDate(lead.created_dt) || "Unknown Date"}
      </TableCell>

      {/* Status */}
      <TableCell className="p-2 text-right text-sm font-medium text-gray-600">
        {lead.status || "Closed"}
      </TableCell>

      {/* Actions */}
      <TableCell className="p-2">
        <div className="flex gap-2 justify-end">
          <Button
            variant="ghost"
            className="p-2 bg-green-500/20 text-green-600 hover:bg-green-500/30 rounded-full h-fit"
          >
            <WhatsAppOutline size={20} />
          </Button>
          <Button
            variant="ghost"
            className="p-2 bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 rounded-full h-fit"
          >
            <Phone size={16} />
          </Button>
          <Button
            variant="ghost"
            className="p-2 bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30 rounded-full h-fit"
          >
            <Bookmark size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default LeadRow
