/**
 * @path src/components/account/layout/accountLayout.tsx
 */

import Avataar from "@/components/dashboard/ui/avataar"
import EntityCard, { EntityCardSkeleton } from "../ui/entityCard"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Suspense } from "react"

export default function AccountLayout() {
  const businesses = [
    {
      id: 1,
      name: "Tech Solutions Inc.",
      totalEmployees: 120,
      activeEmployees: 100,
      description: "Specializes in IT solutions and consulting.",
    },
    {
      id: 2,
      name: "Green Landscapes",
      totalEmployees: 45,
      activeEmployees: 38,
      description: "Experts in landscaping and outdoor spaces.",
    },
    {
      id: 3,
      name: "Spark Innovations",
      totalEmployees: 60,
      activeEmployees: 55,
      description: "Startup incubator and co-working space.",
    },
  ]
  return (
    <>
      <div className="flex items-center pt-2 pb-3 mb-4 border-b justify-between px-2 md:px-0">
        <div className="flex items-center justify-between gap-2 ">
          <Avataar
            className="border-2 h-12 w-12 aspect-square"
            src="/logo.svg"
          />
          <div className="flex flex-col">
            <h2 className="md:text-2xl text-xl font-semibold text-gray-800 leading-6">
              Ehe_Industries
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Welcome to the admin console.
            </p>
          </div>
        </div>
        <Button className="bg-sky-500 hover:bg-sky-600">
          <Plus />
          Create Entity
        </Button>
      </div>
      <div className="grid md:grid-cols-3 px-2 gap-2">
        {businesses.map((business) => (
          <Suspense key={business.id} fallback={<EntityCardSkeleton />}>
            <EntityCard
              key={business.id}
              name={business.name}
              description={business.description}
              totalEmployees={business.totalEmployees}
              activeEmployees={business.activeEmployees}
            />
          </Suspense>
        ))}
      </div>
    </>
  )
}
