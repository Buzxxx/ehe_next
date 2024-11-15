"use client"

import { useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import BarGraph from "./barGraph"
import LineGraph from "./lineChart"
import ChevronDown from "@/components/ui/icons/chevronDown"

export const description = "A bar chart"

const chartDataOptions = {
  "SLA": [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
  ],
  "Conversion Time": [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
  ],
}

export function BarChartCard() {
  const [selectedData, setSelectedData] = useState("SLA")
  const [selectedChart, setSelectedChart] = useState(0)

 const chartData =
   chartDataOptions[selectedData as keyof typeof chartDataOptions]

  const charts = [
    {
      name: "Bar Graph",
      component: <BarGraph chartData={chartData} key={0} />,
    },
    {
      name: "Line Graph",
      component: <LineGraph chartData={chartData} key={1} />,
    },
  ]

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between pb-0">
        <div className="flex flex-col gap-2 ">
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="border-2 flex gap-2 items-center py-2 px-4 rounded-full text-xs font-semibold">
              {selectedData} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedData("SLA")}>
                SLA
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedData("Conversion Time")}
              >
                Lead Conversion Time
              </DropdownMenuItem>
              {/* Add more items as needed */}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="border-2 flex gap-2 items-center py-2 px-4 rounded-full text-xs font-semibold">
              {charts[selectedChart].name} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedChart(0)}>
                Bar Chart
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedChart(1)}>
                Line Graph
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedChart(2)}>
                Pie Chart
              </DropdownMenuItem>
              {/* Add more items as needed */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>{charts[selectedChart].component}</CardContent>
     
    </Card>
  )
}
