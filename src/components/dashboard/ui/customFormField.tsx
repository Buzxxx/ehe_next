import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Input } from "../../ui/input"
import { FormFieldType } from "../library/formFieldEnum"
import "react-phone-number-input/style.css"
import PhoneInput, { Value } from "react-phone-number-input"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import { Textarea } from "../../ui/textarea"
import { Checkbox } from "../../ui/checkbox"
import { Label } from "../../ui/label"
import { useEffect, useState } from "react"
import { Control } from "react-hook-form"


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
  required?: boolean
  rows?: number
  onChange?: (args: any) => void
}

const RenderField = ({ field, props }: { field: any; props: customProps }) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    const formattedTime = new Date()
    setCurrentTime(formattedTime)
  }, [])

  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    rows,
    onChange,
  } = props

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0 "
            />
          </FormControl>
        </div>
      )

    case FormFieldType.PHONE:
      return (
        <FormControl>
          <PhoneInput
            onChange={field.onChange}
            defaultCountry="IN"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as Value | undefined}
            className="input-phone"
          />
        </FormControl>
      )

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <DatePicker
              selected={field.value ? new Date(field.value) : currentTime}
              showIcon
              placeholderText={
                placeholder ? placeholder : "Click to select a date"
              }
              onChange={(date) => {
                field.onChange(date)
                if (onChange) onChange(date)
              }}
              dateFormat={dateFormat ?? "dd/MM/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker text-sm py-2 px-3 w-full h-10 rounded-md cursor-pointer"
              className="cursor-pointer"
            />
          </FormControl>
        </div>
      )

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl className="shad-select-trigger">
              <SelectTrigger>
                <SelectValue
                  placeholder={placeholder}
                  onChange={field.change}
                  defaultValue={field.value}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            {...field}
            placeholder={placeholder}
            className="shad-textArea"
            rows={rows}
            onChange={(e) => {
              field.onChange(e) // Update form state with react-hook-form
              if (onChange) onChange(e) // Call the custom onChange handler
            }}
          />
        </FormControl>
      )

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="form-checkbox"
            />
            <Label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </Label>
          </div>
        </FormControl>
      )

    default:
      return <Input type="text" placeholder="John Doe" {...field} />
  }
}

const CustomFormField = (props: customProps) => {
  const { control, fieldType, name, label } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
