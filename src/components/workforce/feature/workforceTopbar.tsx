/**
 * @path src/components/workplace/feature/workplaceTopbar.tsx
 */

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter, Plus } from "@/components/ui/icons"

const WorkplaceTopbar = () => {
  return (
    <div className="flex justify-between items-center mt-4 border-b py-4">
      <div className="flex gap-2 items-center">
        <h4 className="text-xl font-medium">Employees </h4>
        <Badge className="bg-orange-600/70 hover:bg-orange-500/70">12 New</Badge>{" "}
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="outline" className="border-2">
          <Filter strokeWidth="1.5" />
          Filters
        </Button>
        <Button className="bg-sky-600 hover:bg-sky-500">
          <Plus />
          Create Employee
        </Button>
      </div>
    </div>
  )
}

export default WorkplaceTopbar