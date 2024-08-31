// @/app/(dashboard)/workforce/edit/[id]/alias/page.tsx
"use client"
import UserAliasTable from "@/components/workforce/layout/userAliasTable"
import React from "react"
import { useParams } from "next/navigation"
import { Workforce } from "@/components/workforce/feature/workforce"
import { sampleData,aliases } from "@/components/workforce/lib/sampleData"


const EditAlias = () => {
  const { id } = useParams() // Get the dynamic route parameter [id]

  const user = Workforce.getUserbyId(id.toString(), sampleData)
  const userAliases = Workforce.getAliasesById(id.toString(), aliases) // Fetch aliases by id

  return (
    <>
      <h1 className="text-2xl text-neutral-900 font-normal">
        {user?.first_name} {user?.last_name}
      </h1>
      <UserAliasTable userAliases={userAliases} />
    </>
  )
}

export default EditAlias
