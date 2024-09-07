


declare interface FilterCategory {
  name: string
  label: string
  placeholder: string
  options: (string | number)[] // Allow both string and number types
}


declare type LeadReassignFormProps = {
  onClose: () => void
}
