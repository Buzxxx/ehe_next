const EmployeeDetail = ({
  title,
  value,
  span,
  isEditable,
  editing,
}: {
  title: string
  value: string
  span?: number
  isEditable?: boolean
  editing?: boolean
}) => {
  // Non-editable field rendering
  if (!isEditable) {
    return (
      <div className={`md:grid-cols-1 p-2 ${span && "col-span-" + span}`}>
        <p className="text-gray-400 text-sm font-light">{title}</p>
        <h4 className="font-medium text-base ">{value}</h4>
      </div>
    )
  }

  return (
    <div className={`md:grid-cols-1 p-2 ${span && "col-span-" + span}`}>
      <p className="text-gray-400 text-sm font-light">{title}</p>
      <h4 className="font-medium text-base ">{value}</h4>
    </div>
  )
}

export default EmployeeDetail
