"use client"
import OverlayLoading from "@/components/ui/overlayLoading"
import { Spinner } from "@/components/ui/icons"
import CreateWorkerForm from "@/components/workforce/ui/createUserForm"
import React, { useState } from "react"
import { sampleData } from "@/components/workforce/lib/sampleData"
import { Workforce } from "@/components/workforce/feature/workforce"

const Page = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(false)
  const id = params.id
  const user = Workforce.getUserbyId(id!, sampleData)

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

