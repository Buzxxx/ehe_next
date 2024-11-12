/**
 * @path src/components/home/ui/tasksCard.tsx
 */

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Ellipsis } from "@/components/ui/icons"
import { Table, TableBody } from "@/components/ui/table"
import TaskRow from "./taskRow"
import { TrendingUp } from "lucide-react"


const TasksCard = () => {
	return (
    <Card>
      <CardHeader className="flex-row justify-between pb-2 border-b">
        <CardTitle className="text-xl">Pending Tasks</CardTitle>
        <button>
          <Ellipsis />
        </button>
      </CardHeader>
      <CardContent>
        <Table className="max-h-60 overflow-auto">
          <TableBody>
            <TaskRow />
            <TaskRow />
            <TaskRow />
            <TaskRow />
          </TableBody>
        </Table>
      </CardContent>
      
    </Card>
  )
}

export default TasksCard