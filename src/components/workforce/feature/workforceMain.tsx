/**
 * @path src/components/workplace/feature/workplaceMain.tsx
 */

import { Input } from "@/components/ui/input"
import { WorkCard } from "../ui/workCard"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const WorkplaceMain = () => {
  const array = Array.from({ length: 5 }, (_, index) => index + 1)
  return (
    <Table className=" mt-4">
      <TableHeader className="border-0 [&_tr]:border-0 mb-4">
        <TableRow className="border-0">
          <TableHead className=" flex gap-2 items-center">
            <Input type="checkbox" className="w-fit h-fit" />
            Select All
          </TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {array.map((num) => (
          <WorkCard key={num} />
        ))}
      </TableBody>
    </Table>
  )
}

export default WorkplaceMain
