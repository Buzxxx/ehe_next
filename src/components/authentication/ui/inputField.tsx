"use client"
import { useState } from "react"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormRegisterReturn } from "react-hook-form"

import ClosedEye from "@/components/ui/icons/closedEye"
import OpenEye from "@/components/ui/icons/openEye"
import { cn } from "@/lib/utils"

interface InputFieldProps {
  label: string
  placeholder: string
  field: UseFormRegisterReturn
  isPassword?: boolean
  className?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  field,
  isPassword = false,
  className
}) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible((prev) => !prev)
  }

  return (
    <FormItem>
      <FormLabel className="md:text-sm text-xs">{label}</FormLabel>
      <FormControl>
        <div className={isPassword ? "relative" : ""}>
          <Input
            placeholder={placeholder}
            {...field}
            type={isPassword ? (visible ? "text" : "password") : "text"}
            className={cn("py-6 mb-2 md:text-sm text-xs", className)}
          />
          {isPassword && (
            <>
              <span
                className="absolute right-4 cursor-pointer w-fit ml-auto h-fit top-1/2 -translate-y-1/2 text-slate-400"
                onClick={toggleVisibility}
              >
                <ClosedEye className={!visible ? "" : "hidden"} />
              </span>
              <span
                className="absolute right-4 cursor-pointer w-fit ml-auto h-fit top-1/2 -translate-y-1/2 text-slate-400"
                onClick={toggleVisibility}
              >
                <OpenEye className={!visible ? "hidden" : ""} />
              </span>
            </>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default InputField
