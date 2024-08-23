declare type LeadCardProps = {
  isSelected: boolean
  onToggle: () => void
}

declare type Lead = {
  id: number
  isSelected: boolean
}

declare interface customProps {
  control: Control<any>
  fieldType: FormFieldType
  name: string
  label?: string
  placeholder?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
}

declare type Lead = {
  id: number
  isSelected: boolean
}

declare type LeadReassignFormProps = {
  onClose: () => void
}
