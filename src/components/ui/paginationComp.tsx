import React, { useState, useEffect } from "react"
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
import { ChevronDown, ChevronUp } from "@/components/ui/icons"
import { useRouter } from "next/navigation"

type PaginationCompProps = {
  className?: string
  totalPages: number
  initialPage?: number
  perPage: number
  onPageChange?: (page: number) => void
}

const PaginationComp = ({
  className,
  totalPages,
  initialPage = 1,
  perPage,
  onPageChange,
}: PaginationCompProps) => {
  const [activePage, setActivePage] = useState(initialPage)
  const [itemsPerPage, setItemsPerPage] = useState(perPage) // State for items per page
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  const perPageOptions = [10, 20, 50, 100, 200]

  const handlePageChange = (page: number) => {
    setActivePage(page)
    updateUrlParams(page, itemsPerPage)
    if (onPageChange) onPageChange(page)
  }

  const handlePerPageChange = (perPage: number) => {
    setItemsPerPage(perPage)
    updateUrlParams(activePage, perPage)
  }

  const updateUrlParams = (page: number, perPage: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set("page", page.toString())
    params.set("per_page", perPage.toString())
    router.push(`?${params.toString()}`)
  }

  const otherPages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (page) => page !== activePage
  )

  useEffect(() => {
    setActivePage(initialPage)
  }, [initialPage])

  return (
    <Pagination className={`items-center m-0 w-0 md:w-fit px-4 hidden md:flex ${className}`}>
      <h2 className="text-sm mr-3 text-gray-500">Per Page:</h2>
      <PaginationContent>
        <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
          <DropdownMenuTrigger className="p-0 text-gray-500">
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                className="bg-charcoal-foreground h-fit"
              >
                {itemsPerPage}
                {isDropdownOpen ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </PaginationLink>
            </PaginationItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-96 w-fit overflow-y-auto p-1">
            {perPageOptions.map((option) => (
              <DropdownMenuItem
                className="w-fit px-2 py-1"
                key={option}
                onSelect={() => handlePerPageChange(option)}
              >
                <PaginationLink href="#" className="w-fit text-center">
                  {option}
                </PaginationLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
{/* 
        <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
          <DropdownMenuTrigger className="p-0 text-gray-500">
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                className="bg-charcoal-foreground h-fit"
              >
                {activePage}
                {isDropdownOpen ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
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
        </DropdownMenu> */}

        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(Math.max(activePage - 1, 1))}
            className="h-fit py-1 text-gray-500"
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              handlePageChange(Math.min(activePage + 1, totalPages))
            }
            className="h-fit py-1 text-gray-500"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComp
