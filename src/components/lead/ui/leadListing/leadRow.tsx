/**
 * @path src/components/lead/ui/leadListing/leadRow.tsx
 */

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { WhatsAppOutline, Phone, Bookmark } from "@/components/ui/icons";
import { formatDate } from "@/utility/formatDate";
import { Lead } from "@/components/lead/features/leadObject";
import Avataar from "../leadPage/avataar";
import Link from "next/link";
import { useLeadSave } from "../../hooks/useLeadSave";

interface LeadRowProps {
  lead: Lead;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

const LeadRow: React.FC<LeadRowProps> = ({ lead, isSelected, onToggle }) => {
  const { isSaved, toggleSave } = useLeadSave(lead.id);
  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      {/* Selection Checkbox */}
      <TableCell className="w-[50px] p-2">
        <Checkbox
          checked={isSelected}
          onClick={() => {
            onToggle(parseInt(lead.id));
          }}
        />
      </TableCell>

      {/* Lead Name */}
      <TableCell className="flex items-center gap-3 p-2">
        <Link href={`/lead/${lead.id}`}>
          <Avataar />
        </Link>
        <div>
          <Link href={`/lead/${lead.id}`} className="font-medium text-gray-800">
            {lead.name || "Lead Name"}
          </Link>
          <p className="text-xs text-gray-500">
            {lead.interested_in || "Unknown Location"}
          </p>
        </div>
      </TableCell>

      {/* Date Created */}
      <TableCell className="p-2 text-sm text-gray-600">
        {formatDate(lead.created_dt) || "Unknown Date"}
      </TableCell>

      {/* Status */}
      <TableCell className="p-2 text-right text-sm font-medium text-gray-600">
        {lead.status.status || "Closed"}
      </TableCell>

      {/* Actions */}
      <TableCell className="p-2">
        <div className="flex gap-2 justify-end">
          <Button
            variant="ghost"
            className="p-2 bg-green-500/20 text-green-600 hover:bg-green-500/30 rounded-full h-fit"
          >
            <Link
              href={`https://wa.me/${lead.contact}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppOutline size={20} />
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="p-2 bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 rounded-full h-fit"
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
            className="p-2 bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30 hover:text-yellow-400 rounded-full h-fit"
            onClick={toggleSave}
          >
            <Bookmark size={16} className={isSaved ? "fill-yellow-600" : ""} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default LeadRow;
