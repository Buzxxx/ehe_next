/**
 * @path src/components/account/ui/entityCard.tsx
 */

import React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight } from "lucide-react"

const EntityCard = ({
  name,
  description,
  totalEmployees,
  activeEmployees,
}: {
  name: string
  description: string
  totalEmployees: number
  activeEmployees: number
}) => {
  return (
    <Card className="backdrop-blur-xl bg-gray-50">
      {/* Header */}
      <CardHeader className="flex-row justify-between items-start mb-2">
        <div className="flex flex-col text-balance flex-1">
          <CardTitle className="md:text-xl text-lg text-gray-600">
            <Link href={`/account/${name}`}> {name} </Link>
          </CardTitle>
          <p className="md:text-sm text-xs text-gray-500">{description}</p>
        </div>
        <button className="md:text-base text-sm transition-all font-semibold text-sky-500 hover:text-sky-800">
          <Link href={`/account/${name}`}>Manage</Link>
        </button>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex justify-between divide-x divide-gray-200 gap-2">
        <div className="flex flex-col items-center justify-center flex-1 ">
          <p className="text-gray-500 md:text-sm text-xs">Total</p>
          <p className="text-gray-600 font-semibold">{totalEmployees}</p>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 ">
          <p className="text-gray-500 md:text-sm text-xs">Active</p>
          <p className="text-gray-600 font-semibold">{activeEmployees}</p>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 ">
          <p className="text-gray-500 md:text-sm text-xs">Inactive</p>
          <p className="text-gray-600 font-semibold">
            {totalEmployees - activeEmployees}
          </p>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="pt-4 flex-col  gap-4 ">
        <ul className="md:text-sm text-xs font-medium w-full">
          <li className="text-slate-400 hover:text-sky-600 w-full flex justify-between items-center">India <ChevronRight size={16} /></li>
          <li className="text-slate-400 hover:text-sky-600 w-full flex justify-between items-center">Australia <ChevronRight size={16} /></li>
          <li className="text-slate-400 hover:text-sky-600 w-full flex justify-between items-center">Sweden <ChevronRight size={16} /></li>
        </ul>

        <Link
          href={"#"}
          className="md:text-sm text-xs font-medium text-slate-400 hover:text-sky-600"
        >
          View Reports
        </Link>
      </CardFooter>
    </Card>
  )
}

export default EntityCard

export const EntityCardSkeleton = () => {
  return (
    <Card className="backdrop-blur-xl bg-gray-50">
      {/* Header */}
      <CardHeader className="flex-row justify-between items-start mb-2">
        <div className="flex flex-col text-balance flex-1">
          <Skeleton className="h-6 md:h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 md:h-5 w-2/3" />
        </div>
        <Skeleton className="h-6 md:h-8 w-16" />
      </CardHeader>

      {/* Content */}
      <CardContent className="flex justify-between divide-x divide-gray-200 gap-2">
        <div className="flex flex-col items-center justify-center flex-1 ">
          <Skeleton className="h-4 md:h-5 w-12 mb-1" />
          <Skeleton className="h-6 md:h-8 w-8" />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 ">
          <Skeleton className="h-4 md:h-5 w-12 mb-1" />
          <Skeleton className="h-6 md:h-8 w-8" />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 ">
          <Skeleton className="h-4 md:h-5 w-12 mb-1" />
          <Skeleton className="h-6 md:h-8 w-8" />
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="pt-4 flex-col items-start gap-4">
        <Skeleton className="h-5 md:h-6 w-1/3" />
        <Skeleton className="h-5 md:h-6 w-1/3" />
      </CardFooter>
    </Card>
  )
}
