/**
 * @path src/components/propertyPage/ui/iconBadge.tsx
 */

const PropertyStat = ({
  icon,
  text,
  category,
}: {
  icon: React.ReactNode
  text: string
  category: string
}) => {
  return (
    <div className="flex flex-col items-start space-y-1 ">
      <span className="text-gray-500 font-medium text-xs">{category}</span>
      <div className={`flex items-center space-x-1 justify-start`}>
        {icon}
        <span className="text-sm">{text}</span>
      </div>
    </div>
  )
}

export default PropertyStat
