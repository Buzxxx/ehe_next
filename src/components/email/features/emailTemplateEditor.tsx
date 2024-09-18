"use client"

import { Button } from "@/components/ui/button"
import React, { useRef, useState } from "react"
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor"

const EmailTemplateEditor = () => {
  const [loading, setLoading] = useState(false)
  const [jsonData, setJsonData] = useState<any | null>(null)
  const [exportedHtml, setExportedHtml] = useState("")
  const emailEditorRef = useRef<EditorRef | null>(null)

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor

    unlayer?.exportHtml((data: { design: any; html: string }) => {
      const { design, html } = data
      setJsonData(design)
      setExportedHtml(html)
    })
  }

  const onReady: EmailEditorProps["onReady"] = () => {
    setLoading(false)
    const unlayer: any = emailEditorRef.current?.editor
    if (jsonData) {
      unlayer.loadDesign(jsonData)
    }
  }

  const saveDraft = () => {
    exportHtml()
    console.log(exportHtml)
  }

  const copyHtmlToClipboard = () => {
    if (exportedHtml) {
      navigator.clipboard.writeText(exportedHtml).then(
        () => {
          alert("HTML code copied to clipboard!")
        },
        (err) => {
          console.error("Failed to copy text: ", err)
        }
      )
    }
  }

  return (
    <>
      {!loading && (
        <div className="w-full h-[80vh] relative">
          <EmailEditor
            minHeight={"75vh"}
            ref={emailEditorRef}
            onReady={onReady}
          />
          {!loading && (
            <div className=" flex items-center justify-between gap-4  w-full mt-8">
              <div>
                <Button
                  className="bg-dashboard-primary hover:bg-dashboard-secondary"
                  onClick={exportHtml}
                >
                  Preview HTML
                </Button>
                <Button
                  onClick={copyHtmlToClipboard}
                  className="ml-4 hover:bg-slate-800"
                >
                  Copy HTML Code
                </Button>
              </div>
              <Button
                className="bg-transparent cursor-pointer flex items-center gap-1 text-black border border-gray-400"
                onClick={saveDraft}
              >
                <span className="opacity-[.7]">Save Draft</span>
              </Button>
            </div>
          )}

          {exportedHtml && ( // Conditionally render exported HTML code
            <>
              <div className="border border-gray-400 mt-6 p-8">
                <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                  {exportedHtml}
                </pre>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default EmailTemplateEditor
