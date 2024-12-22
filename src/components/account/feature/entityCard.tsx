/**
 * @path src/components/account/ui/entityCard.tsx
 */


"use client"

import React, { useCallback, useState } from "react"
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
import { DialogDescription } from "@/components/ui/dialog"
import { AddLocationForm } from "./addLocationForm"
import DeleteEntityConfirmation from "./deleteEntityConfirmation"
import DialogItem from "@/components/lead/ui/dropDownModal"
import { Entity } from "../entities"

const EntityCard = ({
  id,
  name,
  description,
  totalEmployees,
  activeEmployees,
  locations,
  entities,
  setEntities,
}: {
  id: number
  name: string
  description: string
  totalEmployees: number
  activeEmployees: number
  entities: Entity[]
  setEntities: (entities: Entity[]) => void
  locations: {
    location: string
    totalEmployees: number
    activeEmployees: number
  }[]
}) => {
  const focusRef = React.useRef<HTMLButtonElement | null>(null)
  const dropdownTriggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)

  const [firstThreeLocations, remainingLocations] = [
    locations.slice(0, 3),
    locations.slice(3),
  ]

  const handleDeleteConfirm = useCallback(() => {
    setEntities(entities.filter((entity) => entity.id !== id))
    setShowDeleteModal(false)
  }, [entities, id, setEntities])

  const handleAddLocation = useCallback(
    (newLocation: {
      location: string
      totalEmployees: number
      activeEmployees: number
    }) => {
      const updatedEntities = entities.map((entity) =>
        entity.id === id
          ? { ...entity, locations: [...entity.locations, newLocation] }
          : entity
      )
      setEntities(updatedEntities)
      setShowLocationModal(false)
    },
    [entities, id, setEntities]
  )

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current // Save the trigger element
  }

  function handleDeleteDialogItemOpenChange(open: boolean) {
    setShowDeleteModal(open)

    if (!open && focusRef.current) {
      focusRef.current.focus() // Restore focus to the dropdown trigger
      focusRef.current = null // Reset focusRef
    }
  }

  function handleLocationModalOpenChange(open: boolean) {
    setShowLocationModal(open)

    if (!open && focusRef.current) {
      focusRef.current.focus() // Restore focus to the dropdown trigger
      focusRef.current = null // Reset focusRef
    }
  }
  return (
    <Card className="backdrop-blur-xl bg-gray-50 flex flex-col">
      {/* Header */}
      <CardHeader className="flex-row justify-between items-start mb-2">
        <div className="flex flex-col text-balance flex-1">
          <CardTitle className="md:text-xl text-lg text-gray-600">
            <Link href={`/account/${name}`}> {name} </Link>
          </CardTitle>
          <p className="text-sm  text-gray-500">{description}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="text-gray-500 text-xs flex flex-col gap-1">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onCloseAutoFocus={(event) => {
              if (focusRef.current) {
                focusRef.current.focus()
                focusRef.current = null
                event.preventDefault()
              }
            }}
          >
            <TooltipProvider delayDuration={250}>
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

            <DialogItem
              open={showLocationModal}
              className="*:border-none w-fit rounded-none"
              triggerChildren={
                <div className="text-sm text-gray-600 flex items-center cursor-pointer">
                  Add Location
                </div>
              }
              onSelect={handleDialogItemSelect}
              onOpenChange={handleLocationModalOpenChange}
            >
              <DialogDescription className="DialogDescription"></DialogDescription>
              <AddLocationForm
                onAddLocation={handleAddLocation}
                onCancel={() => setShowLocationModal(false)}
              />
            </DialogItem>

            <DialogItem
              open={showDeleteModal}
              className="*:border-none md:w-fit w-[99%] mx-auto rounded-none md:p-6 px-0 py-4 "
              triggerChildren={
                <div className="text-sm text-red-500 flex items-center cursor-pointer">
                  Delete Entity
                </div>
              }
              onSelect={handleDialogItemSelect}
              onOpenChange={handleDeleteDialogItemOpenChange}
            >
              <DialogDescription className="DialogDescription hidden"></DialogDescription>
              <DeleteEntityConfirmation
                entity={name}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setShowDeleteModal(false)}
              />
            </DialogItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex justify-between divide-x divide-gray-200 flex-1 gap-2">
        <div className="flex flex-col items-center justify-center flex-1 ">
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-gray-600 font-semibold">{totalEmployees}</p>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 ">
          <p className="text-gray-500 text-sm">Active</p>
          <p className="text-gray-600 font-semibold">{activeEmployees}</p>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 ">
          <p className="text-gray-500 text-sm">Inactive</p>
          <p className="text-gray-600 font-semibold">
            {totalEmployees - activeEmployees}
          </p>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="pt-2 flex-col gap-4 ">
        <ul className="text-sm font-medium w-full">
          {locations &&
            firstThreeLocations.map((loc) => (
              <li key={loc.location}>
                <Link
                  href={`/account/${name}/${loc.location}`}
                  className="text-slate-400 hover:text-sky-600 w-full flex justify-between items-center cursor-pointer"
                >
                  {loc.location} <ChevronRight size={16} />
                </Link>
              </li>
            ))}
        </ul>
        {locations.length > 3 && (
          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-500 text-xs flex flex-col gap-1">
              More Locations
              <span className="flex flex-col relative items-center ">
                <ChevronDown size={12} />
                <ChevronDown size={12} className="absolute -top-1" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-80">
              {remainingLocations.map((loc) => (
                <DropdownMenuItem key={loc.location}>
                  <Link
                    href={`/account/${name}/${loc.location}`}
                    className="text-gray-500 hover:text-sky-600 text-sm flex gap-2 justify-between items-center w-full"
                  >
                    {loc.location} <ChevronRight size={16} />
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardFooter>
    </Card>
  )
}

export default EntityCard

export const EntityCardSkeleton = () => {
  return (
    <Card className="backdrop-blur-xl bg-gray-50 flex flex-col">
      {/* Header */}
      <CardHeader className="flex-row justify-between items-start mb-2">
        <div className="flex flex-col text-balance flex-1">
          <Skeleton className="h-6 md:h-8 w-3/4 mb-1" />
          <Skeleton className="h-4 md:h-5 w-2/3" />
        </div>
        <Skeleton className="h-5 w-6" />
      </CardHeader>

      {/* Content */}
      <CardContent className="flex justify-between divide-x divide-gray-200 flex-1 gap-2">
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
      <CardFooter className="pt-2 flex-col gap-4">
        <ul className="text-sm font-medium w-full">
          <li>
            <Skeleton className="h-5 w-full mb-2" />
          </li>
          <li>
            <Skeleton className="h-5 w-full mb-2" />
          </li>
          <li>
            <Skeleton className="h-5 w-full mb-2" />
          </li>
        </ul>
        <Skeleton className="h-5 w-1/4 self-start" />
      </CardFooter>
    </Card>
  )
}

