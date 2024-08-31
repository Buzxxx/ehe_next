"use client"
import OverlayLoading from "@/components/ui/overlayLoading"
import { Spinner } from "@/components/ui/icons"
import CreateWorkerForm from "@/components/workforce/ui/createUserForm"
import React, { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { sampleData } from "@/components/workforce/lib/sampleData"
import { Workforce } from "@/components/workforce/feature/workforce"

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientComponent />
    </Suspense>
  )
}

export default Page

const ClientComponent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
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
