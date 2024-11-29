/**
 * @path src/components/workplace/feature/workplaceTopbar.tsx
 */

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter, Plus } from "@/components/ui/icons"

const WorkplaceTopbar = () => {
  return (
    <div className="flex justify-between items-center pb-4 pt-2 px-2 md:px-0 border-b">
      <div className="flex gap-2 items-center md:flex-row flex-col">
        <h4 className="text-xl font-medium">Teams </h4>
        <Badge className="bg-orange-600/70 hover:bg-orange-500/70">
          12 New
        </Badge>{" "}
      </div>
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          className="md:border-2 bg-transparent border-0 md:bg-white"
        >
          <Filter strokeWidth="1.5" />
          <p className="hidden md:block">Filters</p>
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
