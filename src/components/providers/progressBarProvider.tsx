"use client"

import * as React from "react"

import { AppProgressBar as ProgressBar } from "next-nprogress-bar"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#06b6d4"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}

export default Providers
