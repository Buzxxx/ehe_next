// @/app/(dashboard)/workforce/edit/[id]/alias/page.tsx

"use client"
import UserAliasTable from "@/components/workforce/layout/userAliasTable"
import React, { useState } from "react"
import { useParams } from "next/navigation"
import { Alias, Workforce } from "@/components/workforce/feature/workforce"
import { sampleData, aliases } from "@/components/workforce/lib/sampleData"

const EditAlias = () => {
  const { id } = useParams() 

  const user = Workforce.getUserbyId(id.toString(), sampleData)
  const initialUserAliases = Workforce.getAliasesById(id.toString(), aliases)
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
