import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const EmployeeStatCard = ({ title, value }: { title: string, value:string }) => {
  return (
    <Card className="flex-1">
      <CardHeader className=" text-gray-400">
        <CardTitle className=" font-light text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sky-600 text-4xl font-semibold">
        {value}
      </CardContent>
    </Card>
  )
}

export default EmployeeStatCard
