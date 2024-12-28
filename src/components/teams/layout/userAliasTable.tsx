// @/components/workforce/layout/userAliasTable.tsx

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Alias } from "../feature/workforce";
import WorkforceTableRow from "../ui/workforceTableRow";
import { Input } from "@/components/ui/input";
import { Plus } from "@/components/ui/icons";
import { WorkforceFormatDate } from "@/lib/formatDate";

interface UserAliasTableProps {
  userAliases: Alias[];
  onDelete: (alias: Alias) => void; // Add onDelete prop
  onUpdate: (updatedAlias: Alias) => void; // Add onUpdate prop
  onAdd: (newAlias: Alias) => void; // Add onAdd prop
}

const UserAliasTable: React.FC<UserAliasTableProps> = ({
  userAliases,
  onDelete,
  onUpdate,
  onAdd,
}) => {
  const [newAliasUsername, setNewAliasUsername] = useState(""); // State for new alias username

  const handleAddClick = () => {
    if (newAliasUsername.trim() === "") return; // Prevent adding empty aliases

    const newAlias: Alias = {
      type: "Alias",
      username: newAliasUsername,
      created: WorkforceFormatDate(new Date()),
    };

    onAdd(newAlias);
    console.log("Added new alias name:", newAliasUsername);
    setNewAliasUsername("");
  };

  return (
    <Table className="py-8 md:shadow-md md:max-w-[96%] mx-auto mt-8 md:text-sm text-xs">
      <TableCaption>A list of your aliases.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Type</TableHead>
          <TableHead className="w-[250px]">Username</TableHead>
          <TableHead className="w-[300px]">Created</TableHead>
          <TableHead className="w-[150px] text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userAliases.map((alias, _idx) => (
          <WorkforceTableRow
            key={_idx}
            alias={alias}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
        {/* Row to add new alias */}
        <TableRow>
          <TableCell>Alias</TableCell>
          <TableCell colSpan={2}>
            <Input
              placeholder="Add Alias Username"
              value={newAliasUsername}
              onChange={(e) => setNewAliasUsername(e.target.value)}
              className="md:placeholder:text-sm placeholder:text-xs"
            />
          </TableCell>
          <TableCell className="text-right">
            <button onClick={handleAddClick}>
              <Plus size={16} className="hover:stroke-sky-600" />
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default UserAliasTable;
