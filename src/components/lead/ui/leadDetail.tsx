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
      className={`md:grid-cols-1 md:p-4 p-2 bg-gradient-to-r from-gray-100/85 to-gray-200/50 rounded-2xl ${
        span && "col-span-" + span
      } ${className}`}
    >
      <p className="text-gray-600 md:text-sm text-xs font-normal mb-1">{title}</p>
      <h4 className="font-medium md:text-sm text-xs ">{value}</h4>
    </div>
  )
}

export default LeadDetail
