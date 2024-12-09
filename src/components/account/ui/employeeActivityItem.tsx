import { EllipsisVertical } from "@/components/ui/icons"

const EmployeeActivityItem = ({icon, title,description, date}: {icon?: React.ReactNode, title:string, description:string, date:string}) => {
  return (
    <div className="flex justify-between items-center py-4 border-b">
      <div className="flex gap-4 items-center">
        <span>{icon}</span>
        <div>
          <h6 className="text-base font-medium ">
            {title} <span className="text-sm text-gray-400">{date}</span>
          </h6>
					<p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <button>
				<EllipsisVertical />
			</button>
    </div>
  )
}

export default EmployeeActivityItem
