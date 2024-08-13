// components/ui/ReusableSelect.tsx

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { Control, Controller } from "react-hook-form"

interface ReusableSelectProps {
  name: string
  label: string
  control: Control<any>
  options: string[]
  placeholder: string
}

const ReusableSelect = ({
  name,
  label,
  control,
  options,
  placeholder,
}: ReusableSelectProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select {...field}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItem>
    )}
  />
)

export default ReusableSelect
