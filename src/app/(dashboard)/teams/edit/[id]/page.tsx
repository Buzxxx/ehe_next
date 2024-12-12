"use client"
import OverlayLoading from "@/components/ui/overlayLoading"
import { Spinner } from "@/components/ui/icons"
import CreateWorkerForm from "@/components/teams/ui/createUserForm"
import React, { useState } from "react"
import { sampleData } from "@/components/teams/lib/sampleData"
import { Workforce } from "@/components/teams/feature/workforce"
import { WorkforceUser } from "@/components/teams/ui/tableColumns"

interface WorkforcePageProps {
  params: Promise<{
    slug: string
  }>
}

const Page = ({ params }: WorkforcePageProps) => {
  const [isLoading, setIsLoading] = useState(false)
  let user: WorkforceUser | undefined 
  params.then(({ slug }) => {
    user = Workforce.getUserbyId(slug!, sampleData)
  })

  return (
    <>
      {isLoading ? (
        <OverlayLoading>
          <Spinner className="w-8 h-8 md:w-14 md:h-16 "></Spinner>
        </OverlayLoading>
      ) : null}
      <h1 className="text-2xl text-neutral-900 font-normal">
        Workforce
        <span className="text-base ml-4 text-neutral-600">
          {user ? "Edit" : "Crete"} User
        </span>
      </h1>
      <CreateWorkerForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        page={"edit"}
        userValues={user}
      />
    </>
  )
}

export default Page
