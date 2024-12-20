/**
 * @path src/components/account/layout/accountLayout.tsx
 */

"use client"
import { Suspense, useState } from "react"
import AccountLayoutHeader from "../feature/accountLayoutHeader"
import EntityCard, { EntityCardSkeleton } from "../ui/entityCard"
import { Entity, entities as initialEntities } from "../entities"

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
            <Suspense key={business.id} fallback={<EntityCardSkeleton />}>
              <EntityCard
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
            </Suspense>
          )
        })}
      </div>
    </>
  )
}
