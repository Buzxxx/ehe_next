import React from "react"

function SetSquare({ size = 24, color = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 36 36"
      height={size}
      width={size}
      strokeWidth={1.5}
      stroke={color}
     
    >
      <path d="M2.5 8h-2a.5.5 0 010-1h2a.5.5 0 010 1z"></path>
      <path d="M29.086 32H2.5A2.5 2.5 0 010 29.5V2.914a1.477 1.477 0 01.926-1.386 1.481 1.481 0 011.635.325l27.585 27.586A1.5 1.5 0 0129.086 32zM1.509 2.413a.537.537 0 00-.2.04.491.491 0 00-.309.461V29.5A1.5 1.5 0 002.5 31h26.586a.5.5 0 00.354-.854L1.854 2.561a.476.476 0 00-.345-.148z"></path>
      <path d="M15.086 26H7.5A1.5 1.5 0 016 24.5v-7.586a1.5 1.5 0 012.561-1.061l7.586 7.586A1.5 1.5 0 0115.086 26zm-7.577-9.587a.537.537 0 00-.2.04.491.491 0 00-.309.461V24.5a.5.5 0 00.5.5h7.586a.5.5 0 00.354-.854l-7.586-7.585a.476.476 0 00-.345-.148zM4.5 32a.5.5 0 01-.5-.5v-2a.5.5 0 011 0v2a.5.5 0 01-.5.5zm5 0a.5.5 0 01-.5-.5v-2a.5.5 0 011 0v2a.5.5 0 01-.5.5zm5 0a.5.5 0 01-.5-.5v-2a.5.5 0 011 0v2a.5.5 0 01-.5.5zm5 0a.5.5 0 01-.5-.5v-2a.5.5 0 011 0v2a.5.5 0 01-.5.5zm5 0a.5.5 0 01-.5-.5v-2a.5.5 0 011 0v2a.5.5 0 01-.5.5zm-22-19h-2a.5.5 0 010-1h2a.5.5 0 010 1zm0 5h-2a.5.5 0 010-1h2a.5.5 0 010 1zm0 5h-2a.5.5 0 010-1h2a.5.5 0 010 1zm0 5h-2a.5.5 0 010-1h2a.5.5 0 010 1z"></path>
    </svg>
  )
}

export default React.memo(SetSquare)