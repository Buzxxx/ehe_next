import React, { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronUp } from "@/components/ui/icons" // Import Chevron icons

type PaginationCompProps = {
  className?: string
  totalPages: number
  initialPage?: number
  onPageChange?: (page: number) => void
}

const PaginationComp = ({
  className,
  totalPages,
  initialPage = 1,
  onPageChange,
}: PaginationCompProps) => {
  const [activePage, setActivePage] = useState(initialPage)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // Track dropdown open state

  const handlePageChange = (page: number) => {
    setActivePage(page)
    if (onPageChange) onPageChange(page)
  }

  const otherPages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (page) => page !== activePage
  )

  return (
    <Pagination className={`items-center ${className}`}>
      <h2 className="text-sm mr-3">Per Page:</h2>
      <PaginationContent>
        <DropdownMenu
          onOpenChange={(open) => setIsDropdownOpen(open)} // Handle open state change
        >
          <DropdownMenuTrigger>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {activePage}
                {isDropdownOpen ? (
                  <ChevronUp className="ml-1 h-4 w-4" /> // Chevron up when open
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" /> // Chevron down when closed
                )}
              </PaginationLink>
            </PaginationItem>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="max-h-96 w-fit overflow-y-auto p-1">
            {otherPages.map((page) => (
              <DropdownMenuItem
                className="w-fit px-2 py-1"
                key={page}
                onSelect={() => handlePageChange(page)}
              >
                <PaginationLink href="#" className="w-fit text-center">
                  {page}
                </PaginationLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(Math.max(activePage - 1, 1))}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              handlePageChange(Math.min(activePage + 1, totalPages))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComp
