/**
 * @path src/components/home/ui/requestsCard.tsx
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody} from "@/components/ui/table"
import { Ellipsis } from "@/components/ui/icons"
import RequestsTableRow from "./requestsTableRow"

const RequestsCard = () => {
  return (
    <Card>
      <CardHeader className="flex-row justify-between pb-2 border-b">
        <CardTitle className="text-xl">Pending Requests</CardTitle>
        <button>
          <Ellipsis />
        </button>
      </CardHeader>
      <CardContent>
        <Table className="max-h-60 overflow-auto">
          <TableBody>
            <RequestsTableRow />
            <RequestsTableRow />
            <RequestsTableRow />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default RequestsCard
