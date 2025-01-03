import React from "react"

function FbMessengerColored({ size = 48 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
    >
      <path
        fill="#448AFF"
        d="M24 4C13.5 4 5 12.1 5 22c0 5.2 2.3 9.8 6 13.1V44l7.8-4.7c1.6.4 3.4.7 5.2.7 10.5 0 19-8.1 19-18S34.5 4 24 4z"
      ></path>
      <path fill="#FFF" d="M12 28l10-11 5 5 9-5-10 11-5-5z"></path>
    </svg>
  )
}

export default React.memo(FbMessengerColored)
