/**
 * @path src/components/home/ui/analyticsCard.tsx
 */

'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { day: "Sunday", leads: 186 },
  { day: "Monday", leads: 305 },
  { day: "Tuesday", leads: 237 },
  { day: "Wednesday", leads: 73 },
  { day: "Thursday", leads: 209 },
  { day: "Friday", leads: 214 },
  { day: "Saturday", leads: 214 },
]

const chartConfig = {
  leads: {
    label: "day",
    color: "#2563eb",
  },
} satisfies ChartConfig

export default function AnalyticsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} height={200} width={100}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 2)}
            />
            <YAxis
              dataKey={"leads"}
              tickMargin={10}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="leads"
              fill="var(--color-leads)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
