"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash } from "lucide-react"
import React, { useState } from "react"

const UserAliasTable = () => {
  const [aliases, setAliases] = useState<{ name: string; createdAt: string }[]>(
    [
      { name: "grvx_ig", createdAt: new Date().toLocaleDateString() },
      { name: "grvx_tw", createdAt: new Date().toLocaleDateString() },
    ]
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newAlias, setNewAlias] = useState("")

  const handleAddAlias = () => {
    const newAliasData = {
      name: newAlias,
      createdAt: new Date().toLocaleDateString(),
    }
    setAliases([...aliases, newAliasData])
    setNewAlias("")
    setIsModalOpen(false)
  }

  const handleDeleteAlias = (aliasName: string) => {
    setAliases(aliases.filter((alias) => alias.name !== aliasName))
  }

  return (
    <Card className="md:w-2/3 h-full" id="aliasTable">
      <CardHeader className="py-4 border-b flex-row justify-between items-center">
        <CardTitle className="text-lg font-semibold">Alias Names</CardTitle>
        {/* Button to open modal */}
        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Add Alias
        </Button>
      </CardHeader>
      <CardContent className="mt-4 flex gap-4 justify-between items-start">
        <Table className="table-auto w-full">
          <TableHeader>
            <TableRow className="flex justify-between">
              <TableHead>Alias Name</TableHead>
              <TableHead align="center">Created At</TableHead>
              <TableHead align="right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aliases.map((alias, index) => (
              <TableRow key={index} className="flex justify-between">
                <TableCell>{alias.name}</TableCell>
                <TableCell align="center">{alias.createdAt}</TableCell>
                <TableCell>
                  <Button
                    className="bg-transparent hover:bg-transparent text-gray-600 hover:text-red-600 hover:stroke-red-600"
                    onClick={() => handleDeleteAlias(alias.name)}
                  >
                    <Trash
                      size={16}
                      className=" hover:text-red-600 hover:stroke-red-600"
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Modal for adding new alias */}
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Alias Name</DialogTitle>
          </DialogHeader>
          <div className="p-4 mt-6">
            <Input
              value={newAlias}
              onChange={(e) => setNewAlias(e.target.value)}
              placeholder="Enter new alias name"
              className="mb-6"
            />
            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-sky-600 hover:bg-sky-500"
                onClick={handleAddAlias}
              >
                Add Alias
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default React.memo(UserAliasTable)