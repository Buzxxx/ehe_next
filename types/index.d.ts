

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

declare type LeadProps = {
  id: number
  isSelected: boolean
  assigned_to: string | null
  brokerage: string | null
  contact: string | null | undefined
  created_dt: string | null | undefined
  email: string | null | undefined
  follow_up_current_status: string | null | undefined
  golden: string | null | undefined
  hash_key: string
  id: number
  interested_in: string | null | undefined
  last_updated_dt: string
  lead_type: string | null | undefined
  name: string | null | undefined
  priority: string | null | undefined
  product_code: string | null | undefined
  product_type: string | null | undefined
  query: string | null | undefined
  recieved_date: string | null | undefined
  revenue: string | null | undefined
  sess_id: number
  source: string | null | undefined
  source_assigned: string | null | undefined
  status: number
}

declare type LeadCardProps = Lead & {
  isSelected: boolean
}

declare type LeadReassignFormProps = {
  onClose: () => void
}
