import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const WorkCard = () => (
  <Card className="rounded-none">
    <CardHeader className="pb-0">
      <CardTitle className="text-dashboard-primary text-xl font-normal">Card Title</CardTitle>
      <CardDescription className="text-xs">June 2, 2024, 5 p.m.</CardDescription>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        The Purpose Of An Action Log Is To Provide A Clear And Transparent
        Record Of Who Took What Actions, When Those Actions Were Taken, And Any
        Relevant Details Associated With Each Action.
      </p>
    </CardContent>
  </Card>
)
