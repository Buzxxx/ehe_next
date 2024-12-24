/**
 * @path src/components/account/layout/entityPageLayout.tsx
 */

"use client"

import { useCallback, useMemo, useState } from "react"
import Avataar from "@/components/dashboard/ui/avataar"
import { DataTable } from "@/components/ui/dataTable"
import EntityPageTopBar from "../feature/entityPageTopBar"
import { EmployeeCard } from "../ui/employeeCard"
import { columns, Employee } from "../feature/employeeColumn"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building2, ChevronDownIcon } from "lucide-react"
import { entities } from "../entities"
import dynamic from "next/dynamic"
import { BackIcon } from "@/components/ui/icons"
import { useRouter } from "next/navigation"

const ResetPasswordModal = dynamic(
  () => import("../feature/resetPasswordModal")
)
const DeactivateUserModal = dynamic(
  () => import("../feature/deactivateUserModal")
)

export default function EntityPageLayout({
  entity,
  location,
}: {
  entity: string
  location: string
}) {
  const router = useRouter()
  const locations = entities.find((e) => e.name === entity)?.locations || []
  const [sampleData, setSampleData] = useState<Employee[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      status: "active",
      teamId: 1,
      role: "Manager",
      date_joined: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "234-567-8901",
      status: "inactive",
      teamId: 2,
      role: "Developer",
      date_joined: "2022-08-22",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "345-678-9012",
      status: "active",
      teamId: 3,
      role: "Designer",
      date_joined: "2023-05-12",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob@example.com",
      phone: "456-789-0123",
      status: "inactive",
      teamId: 4,
      role: "Tester",
      date_joined: "2021-11-30",
    },
    {
      id: 5,
      name: "Charlie Black",
      email: "charlie@example.com",
      phone: "567-890-1234",
      status: "active",
      teamId: 4,
      role: "Support Engineer",
      date_joined: "2020-03-18",
    },
  ])

  const [viewMode, setViewMode] = useState<"card" | "row">("card")
  const [selectedTab, setSelectedTab] = useState<"active" | "inactive">(
    "active"
  )
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  )
  const [selectedEmployeeForDeactivation, setSelectedEmployeeForDeactivation] =
    useState<Employee | null>(null)

  const filteredData = useMemo(
    () => sampleData.filter((employee) => employee.status === selectedTab),
    [sampleData, selectedTab]
  )

  const handleResetPassword = useCallback((id: number) => {
    setSelectedEmployeeId(id)
  }, [])

  const handleDeactivateUser = useCallback((employee: Employee) => {
    setSelectedEmployeeForDeactivation(employee)
  }, [])

  const confirmDeactivation = (id: number) => {
    setSampleData((prevData) =>
      prevData.map((employee) =>
        employee.id === id ? { ...employee, status: "inactive" } : employee
      )
    )
    setSelectedEmployeeForDeactivation(null)
  }

  return (
    <>
      <div className="flex items-center pt-4 pb-3 mb-4 border-b justify-between ">
        <div className="flex items-center md:gap-2 gap-2 w-full px-2 md:px-0">
          <BackIcon className="w-fit p-0 h-fit" onClick={() => router.back()} />
          <span className="h-12 w-12 border-2 flex items-center justify-center rounded-full">
            <Building2 />
          </span>
          <div className="flex flex-col flex-1">
            <h2 className="md:text-2xl text-xl font-semibold text-gray-800 ">
              {entity}
            </h2>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/account/${entity}`}>
                    {entity}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage className="capitalize">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      {location}
                      <ChevronDownIcon size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="min-w-24">
                      {locations
                        .filter((loc) => loc.location !== location)
                        .map((loc, index) => (
                          <DropdownMenuItem key={index}>
                            <a
                              href={`/account/${entity}/${loc.location}`}
                              className="capitalize"
                            >
                              {loc.location}
                            </a>
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      <EntityPageTopBar
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onAddEmployee={(newEmployee: Employee) =>
          setSampleData((prev) => [
            ...prev,
            { ...newEmployee, id: prev.length + 1 },
          ])
        }
      />

      {viewMode === "card" ? (
        <div className="flex flex-wrap mt-4 gap-2 md:px-0 px-2">
          {filteredData.map((employee) => (
            <EmployeeCard
              key={employee.id}
              location={location}
              employee={employee}
              onResetPassword={() => handleResetPassword(employee.id)}
              onDeactivateUser={() => handleDeactivateUser(employee)}
            />
          ))}
        </div>
      ) : (
        <DataTable
          columns={columns.map((col) => {
            if (col.header === "Actions") {
              return {
                ...col,
                cell: ({ row }: any) => (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleResetPassword(row.original.id)}
                      className="text-blue-600 underline"
                    >
                      Reset Password
                    </button>
                    <button
                      onClick={() => handleDeactivateUser(row.original)}
                      className="text-red-600 underline"
                    >
                      Deactivate User
                    </button>
                  </div>
                ),
              }
            }
            return col
          })}
          data={filteredData}
        />
      )}

      {selectedEmployeeId !== null && (
        <ResetPasswordModal
          employeeId={selectedEmployeeId}
          onClose={() => setSelectedEmployeeId(null)}
        />
      )}
      {selectedEmployeeForDeactivation !== null && (
        <DeactivateUserModal
          employee={selectedEmployeeForDeactivation}
          onConfirm={() =>
            confirmDeactivation(selectedEmployeeForDeactivation.id)
          }
          onClose={() => setSelectedEmployeeForDeactivation(null)}
        />
      )}
    </>
  )
}
