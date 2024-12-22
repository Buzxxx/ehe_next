/**
 * @path src/components/account/layout/accountLayout.tsx
 */

"use client"
import { useState } from "react"
import AccountLayoutHeader from "../feature/accountLayoutHeader"
import { EntityCardSkeleton } from "../feature//entityCard"
import { Entity, entities as initialEntities } from "../entities"
import dynamic from "next/dynamic"

const EntityCardLazy = dynamic(() => import("../feature/entityCard"), {
  loading: () => <EntityCardSkeleton />,
})

export default function AccountLayout() {
  const [entities, setEntities] = useState<Entity[]>(initialEntities)

  return (
    <>
      <AccountLayoutHeader entities={entities} setEntities={setEntities} />
      <div className="grid md:grid-cols-3 px-2 gap-2">
        {entities.map((business) => {
          const totalEmployees = business.locations.reduce(
            (sum, loc) => sum + loc.totalEmployees,
            0
          )
          const activeEmployees = business.locations.reduce(
            (sum, loc) => sum + loc.activeEmployees,
            0
          )

          return (
            <EntityCardLazy
              id={business.id}
              key={business.id}
              name={business.name}
              description={business.description}
              totalEmployees={totalEmployees}
              activeEmployees={activeEmployees}
              locations={business.locations}
              entities={entities}
              setEntities={setEntities}
            />
          )
        })}
      </div>
    </>
  )
}
