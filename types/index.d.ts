declare type LeadCardProps = {
  isSelected: boolean
  onToggle: () => void
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



declare type LeadReassignFormProps = {
  onClose: () => void
}

declare type Lead = {

  name: string
  email: string
  contact: string
  lead_type: string
  query?: string
  interested_in?: string
  assigned_to: string
  product_code?: string
  product_type?: string
  source: string
  status: number
  priority: string
}

declare type LeadCard = Lead & {
  id: number
  isSelected: boolean
}
