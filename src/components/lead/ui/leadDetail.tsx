const LeadDetail = ({
  title,
  value,
  span,
  className
}: {
  title: string
  value: string | React.ReactNode
  span?: number
  className?: string
}) => {
  return (
    <div
      className={`md:grid-cols-1 p-4 bg-gradient-to-r from-gray-100/85 to-gray-200/50 rounded-2xl ${
        span && "col-span-" + span
      } ${className}`}
    >
      <p className="text-gray-600 text-sm font-normal mb-1">{title}</p>
      <h4 className="font-medium text-sm ">{value}</h4>
    </div>
  )
}

export default LeadDetail
