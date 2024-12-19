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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ChevronDown } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight, EllipsisVertical } from "lucide-react"

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
    <Card className="backdrop-blur-xl bg-gray-50 flex flex-col">
      {/* Header */}
      <CardHeader className="flex-row justify-between items-start mb-2">
        <div className="flex flex-col text-balance flex-1">
          <CardTitle className="md:text-xl text-lg text-gray-600">
            <Link href={`/account/${name}`}> {name} </Link>
          </CardTitle>
          <p className="md:text-sm text-xs text-gray-500">{description}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-gray-500 text-xs flex flex-col gap-1">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <DropdownMenuItem disabled={true}>
                    View Reports
                  </DropdownMenuItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm text-gray-600">
                    This feature is coming soon.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuItem>Add Location</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Delete Entity
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex justify-between divide-x divide-gray-200 flex-1 gap-2">
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
          <li>
            {" "}
            <Link
              href={`/account/${name}/india`}
              className="text-slate-400 hover:text-sky-600 w-full flex justify-between items-center cursor-pointer"
            >
              India <ChevronRight size={16} />
            </Link>
          </li>
          <li>
            {" "}
            <Link
              href={`/account/${name}/australia`}
              className="text-slate-400 hover:text-sky-600 w-full flex justify-between items-center cursor-pointer"
            >
              Australia <ChevronRight size={16} />
            </Link>
          </li>
          <li>
            {" "}
            <Link
              href={`/account/${name}/sweden`}
              className="text-slate-400 hover:text-sky-600 w-full flex justify-between items-center cursor-pointer"
            >
              Sweden <ChevronRight size={16} />
            </Link>
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
            <DropdownMenuItem>
              <Link
                href={`/account/${name}/china`}
                className="text-gray-500 hover:text-sky-600 text-sm flex gap-2 justify-between items-center"
              >
                China <ChevronRight size={16} />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/account/${name}/england`}
                className="text-gray-500 hover:text-sky-600 text-sm flex gap-2 justify-between items-center"
              >
                England <ChevronRight size={16} />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link
                href={`/account/${name}/spain`}
                className="text-gray-500 hover:text-sky-600 text-sm flex gap-2 justify-between items-center"
              >
                Span <ChevronRight size={16} />
              </Link>
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
