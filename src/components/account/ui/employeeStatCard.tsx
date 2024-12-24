import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const EmployeeStatCard = ({
  title,
  value,
}: {
  title: string
  value: string
}) => {
  return (
    <Card className="flex-1">
      <CardHeader className=" text-gray-400 md:p-6 p-4 pb-2">
        <CardTitle className=" font-light text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sky-600 text-4xl font-semibold md:p-6 p-4 pt-0 md:pt-0">
        {value}
      </CardContent>
    </Card>
  )
}

export default EmployeeStatCard
