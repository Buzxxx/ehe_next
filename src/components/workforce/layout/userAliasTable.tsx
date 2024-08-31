// @/components/workforce/layout/userAliasTable.tsx

import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2 } from "@/components/ui/icons"
import { Alias } from "../feature/workforce"

interface UserAliasTableProps {
  userAliases: Alias[]
}

const UserAliasTable: React.FC<UserAliasTableProps> = ({ userAliases }) => {
  return (
    <Table className="py-8 md:shadow-md md:max-w-[96%] mx-auto mt-8">
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
        {userAliases.map((alias) => (
          <TableRow key={alias.username}>
            <TableCell>{alias.type}</TableCell>
            <TableCell>{alias.username}</TableCell>
            <TableCell>{alias.created}</TableCell>
            <TableCell className="text-right">
              {alias.type !== "Default" ? (
                <button>
                  <Trash2 color="grey" size={16} />
                </button>
              ) : (
                <button>
                  <Pencil color="grey" size={16} />{" "}
                </button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UserAliasTable
