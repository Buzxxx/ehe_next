/**
 * @path src/components/account/feature/accountLayoutHeader.tsx
 */

"use client"
import Avataar from "@/components/dashboard/ui/avataar"
import { Button } from "@/components/ui/button"
import { Building2, Plus } from "lucide-react"
import { createElement, useState } from "react"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import CreateEntityForm from "../feature/createEntityForm"
import { Entity } from "../entities"

const AccountLayoutHeader = ({
  entities,
  setEntities,
}: {
  entities: Entity[]
  setEntities: (entities: Entity[]) => void
}) => {
  const [showCreateEntity, setShowCreateEntity] = useState(false)

  const handleAddEntity = (newEntity: Entity) => {
    setEntities([...entities, newEntity])
  }

  return (
    <>
      <div className="flex items-center pt-4 pb-3 mb-4 border-b justify-between px-2 md:px-0">
        <div className="flex items-center justify-between gap-2 ">
          <span className="h-12 w-12 border-2 flex items-center justify-center rounded-full">
            <Building2 />
          </span>
          <div className="flex flex-col">
            <h2 className="md:text-2xl text-lg font-semibold text-gray-800 leading-6">
              Ehe_Industries
            </h2>
            <p className="text-gray-500 text-xs md:text-base">
              Welcome to the admin console.
            </p>
          </div>
        </div>
        <Button
          className="bg-sky-500 hover:bg-sky-600 md:text-base text-xs w-fit  md:px-4 px-2"
          onClick={() => setShowCreateEntity(true)}
        >
          <Plus />
          Create Entity
        </Button>
      </div>
      <Dialog open={showCreateEntity} onOpenChange={setShowCreateEntity}>
        <DialogContent className="overflow-y-scroll w-[95%] md:max-w-[50%] overflow-auto h-[90%]">
          <DialogTitle className="hidden"></DialogTitle>
          <CreateEntityForm
            onAddEntity={(newEntity: Entity) => {
              handleAddEntity(newEntity)
              setShowCreateEntity(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AccountLayoutHeader
