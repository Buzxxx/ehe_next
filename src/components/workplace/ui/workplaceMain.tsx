import React from "react"
import { WorkCard } from "./workCard"

const WorkplaceMain = () => {
  const array = Array.from({ length: 5 }, (_, index) => index + 1)
  return (
    <div className="flex flex-col mt-4">
			{array.map((num) => <WorkCard key={num} />)}
    </div>
  )
}

export default WorkplaceMain
