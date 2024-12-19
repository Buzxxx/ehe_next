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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "@/components/ui/icons"

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
          <Link
            href={"#"}
            className="md:text-sm text-xs font-medium text-sky-400 hover:text-sky-600"
          >
            View Reports
          </Link>
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
          <li className="text-slate-400 hover:text-sky-600 w-full flex justify-between items-center cursor-pointer">
            India <ChevronRight size={16} />
          </li>
          <li className="text-slate-400 hover:text-sky-600 w-full flex justify-between items-center cursor-pointer">
            Australia <ChevronRight size={16} />
          </li>
          <li className="text-slate-400 hover:text-sky-600 w-full flex justify-between items-center cursor-pointer">
            Sweden <ChevronRight size={16} />
          </li>
        </ul>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-gray-500 text-xs flex flex-col gap-1">
            More Locations
            <span className="flex flex-col relative items-center ">
              <ChevronDown size={12} />
              <ChevronDown size={12} className="absolute -top-1" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-80">
            <DropdownMenuItem className="text-gray-500 hover:text-sky-600 text-sm flex gap-2 justify-between items-center">
              China <ChevronRight size={16} />
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-500 hover:text-sky-600 text-sm flex gap-2 justify-between items-center">
              England <ChevronRight size={16} />
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-500 hover:text-sky-600 text-sm flex gap-2 justify-between items-center">
              Span <ChevronRight size={16} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
