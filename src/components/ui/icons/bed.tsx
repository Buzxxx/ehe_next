import React from "react"

function Bed({ size = 24, color = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 24 24"
      strokeWidth={0.1}
      stroke={color}
      height={size}
      width={size}
    >
      <path d="M7 12.5a3 3 0 10-3-3 3 3 0 003 3zm0-4a1 1 0 11-1 1 1 1 0 011-1zm13-2h-8a1 1 0 00-1 1v6H3v-8a1 1 0 00-2 0v13a1 1 0 002 0v-3h18v3a1 1 0 002 0v-9a3 3 0 00-3-3zm1 7h-8v-5h7a1 1 0 011 1z"></path>
    </svg>
  )
}

export default React.memo(Bed)
