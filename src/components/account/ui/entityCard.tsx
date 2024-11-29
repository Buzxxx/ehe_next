import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import React from "react"

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
          <CardTitle className="text-xl text-gray-600">
            <Link href={`/account/${name}`}> {name} </Link>
          </CardTitle>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button className="text-base transition-all font-semibold text-sky-500 hover:text-sky-800">
          <Link href={`/account/${name}`}>Manage</Link>
        </button>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex justify-between divide-x divide-gray-200 gap-2">
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
      <CardFooter className="pt-4 flex-col items-start gap-4 ">
        <Link
          href={"#"}
          className="text-sm font-medium text-slate-400 hover:text-sky-600"
        >
          Add User
        </Link>
        <Link
          href={"#"}
          className="text-sm font-medium  text-slate-400 hover:text-sky-600"
        >
          Delete User
        </Link>
        <Link
          href={"#"}
          className="text-sm font-medium text-slate-400 hover:text-sky-600"
        >
          View Reports
        </Link>
      </CardFooter>
    </Card>
  )
}

export default EntityCard
