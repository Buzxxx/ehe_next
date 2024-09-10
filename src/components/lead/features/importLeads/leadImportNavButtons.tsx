import { Button } from "@/components/ui/button"
import React from "react"

export interface LeadImportButtonProps {
  btnText: string
  btnFn?: any
  btnIcon?: React.ReactNode
  variant?: "affirmative" | "negative" | string 
  disabled?: boolean
}

const LeadImportNavButtons: React.FC<{ buttons: LeadImportButtonProps[] }> = ({
  buttons,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      {buttons.map((btn, index) => (
        <Button
          key={index}
          type="button"
          disabled={btn.disabled}
          onClick={btn.btnFn}
          className={`flex gap-1 items-center ${
            btn.variant === "affirmative"
              ? "bg-dashboard-primary hover:bg-dashboard-secondary flex-row-reverse"
              : "text-slate-800 bg-transparent border border-slate-600 hover:border-slate-900 hover:text-slate-900"
          }`}
        >
          {btn.btnIcon && <>{btn.btnIcon}</>}
          {btn.btnText}
        </Button>
      ))}
    </div>
  )
}

export default LeadImportNavButtons
