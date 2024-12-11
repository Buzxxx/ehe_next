// @/app/(dashboard)/workforce/edit/[id]/alias/page.tsx

"use client"
import UserAliasTable from "@/components/account/feature/userAliasTable"
import React, { useState } from "react"
import { useParams } from "next/navigation"
import { Alias, Workforce } from "@/components/teams/feature/workforce"
import { sampleData, aliases } from "@/components/teams/lib/sampleData"
import { WorkforceUser } from "@/components/teams/ui/tableColumns"

const EditAlias = () => {
  const { id } = useParams()
  let initialUserAliases: Alias[] = []
  let user: WorkforceUser | undefined
  if (id) {
    user = Workforce.getUserbyId(id.toString(), sampleData)
    initialUserAliases = Workforce.getAliasesById(id.toString(), aliases)
  }

  const [userAliases, setUserAliases] = useState<Alias[]>(initialUserAliases)

  const deleteAlias = (aliasToDelete: Alias) => {
    setUserAliases((prevAliases) =>
      prevAliases.filter((alias) => alias !== aliasToDelete)
    )
  }

  const updateAlias = (updatedAlias: Alias) => {
    setUserAliases((prevAliases) =>
      prevAliases.map((alias) =>
        alias.type === updatedAlias.type &&
        alias.created === updatedAlias.created
          ? updatedAlias
          : alias
      )
    )
  }

  const addAlias = (newAlias: Alias) => {
    setUserAliases((prevAliases) => [...prevAliases, newAlias])
  }

  return (
    <>
      <h1 className="text-2xl text-neutral-900 font-normal">
        {user?.first_name} {user?.last_name}
      </h1>
      <UserAliasTable
        userAliases={userAliases}
        onDelete={deleteAlias}
        onUpdate={updateAlias}
        onAdd={addAlias}
      />
    </>
  )
}

export default EditAlias
