import React, { Dispatch, SetStateAction } from "react"
import DussehraEmailTemplate from "./templates/dussehraEmailTemplate"
import DiwaliTemplate from "./templates/diwaliTemplate"

type EmailTemplateViewerProps = {
  selectedTemplate: React.ReactNode | null
  setSelectedTemplate: Dispatch<SetStateAction<React.ReactNode | null>>
  messagePreview: string
}

const templates = [
  { component: DussehraEmailTemplate, name: "DussehraEmailTemplate" },
  { component: DiwaliTemplate, name: "DiwaliTemplate" },
]

const EmailTemplateViewer: React.FC<EmailTemplateViewerProps> = ({
  selectedTemplate,
  setSelectedTemplate,
  messagePreview,
}) => {
  // Extract the name for the selected template comparison
  const getTemplateName = (template: React.ReactNode): string | null => {
    if (React.isValidElement(template)) {
      // If it's an intrinsic element, return the type (which is a string)
      if (typeof template.type === "string") {
        return template.type
      }
      // If it's a custom component, return its name
      return (template.type as React.JSXElementConstructor<any>).name || null
    }
    return null
  }

  const handleTemplateSelect = (template: React.ReactNode, name: string) => {
    setSelectedTemplate(template)
  }

  return (
    <div className="grid grid-cols-3 gap-4 max-w-[100%] w-full border border-slate-200 p-6">
      {templates.map(({ component: TemplateComponent, name }, index) => (
        <div
          key={index}
          className={`border h-fit transition-all text-xs cursor-pointer p-1 ${
            getTemplateName(selectedTemplate) === name
              ? "border-dashboard-primary"
              : "border-gray-200"
          }`}
          onClick={() => handleTemplateSelect(<TemplateComponent />, name)}
        >
          <TemplateComponent />
        </div>
      ))}
    </div>
  )
}

export default EmailTemplateViewer
