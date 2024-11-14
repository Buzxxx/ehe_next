import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

type ChartData = {
  month: string
  desktop: number
}

const chartConfig = {
  desktop: {
    label: "desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig


const BarGraph = ({ chartData }: { chartData: ChartData[] }) => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData} height={200}>
        <CartesianGrid vertical={false} height={200} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={20}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="desktop"
          fill="var(--color-desktop)"
          radius={8}
          height={200}
        />
      </BarChart>
    </ChartContainer>
  )
}

export default BarGraph
