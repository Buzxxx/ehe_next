import * as React from "react"

const IceColored = ({ size = 24, ...props }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    {...props}
  >
    <path
      fill="#48ACFF"
      d="M12.86 1.78a99.94 99.94 0 0 0 4.5 1.36c2.1.63 2.63.74 4.2 1.15.35.07.74.27.97.54a1.94 1.94 0 0 1 .1.76c-.02.78-.02 1.23 0 1.22v.68a9.15 9.15 0 0 1 0 5.45l.19.02.18.07.14.02c.23.06.46.18.64.27l.09.06.73.49.14.07a2.75 2.75 0 0 1 .73 3.15l-.05.12c-.2.36-.45.63-.73.9l-.1.09c-.95.93-2.36 1.2-3.64 1.25a3.78 3.78 0 0 0-3.03 1.5c-.63.66-1.6 1.05-2.47 1.29l-.09.03c-1.5.34-3.27.08-4.63-.66l-.59-.45-.09-.04-.41-.46a3.35 3.35 0 0 0-2.52-1.2c-1.5-.06-2.91-.43-4-1.57l-.09-.09a2.78 2.78 0 0 1-.77-2.08c0-.36.04-.62.18-.93l.04-.13c.18-.35.44-.62.73-.89l.09-.09c.55-.56 1.23-.84 1.96-1.05V7.8a2643.2 2643.2 0 0 1 0-7.38V.33c.01-.18.04-.45.23-.59.22-.22.59-.27.91-.35.78-.16.79-.18.79-.18a41.8 41.8 0 0 1 2.4-.73c.65-.18.93-.24 2.4-.71h.09c1.1-.35.86-.28 1.72-.57.53-.17.96-.13 1.54.05Z"
    ></path>
    <path
      fill="#CAE0FE"
      d="M12.86 1.78a99.94 99.94 0 0 0 4.5 1.36c2.09.62 2.62.73 4.2 1.15h.1c.14.05.27.1.4.23v.09l-1.62.57-2.04.57-.96.34c-1.35.43-2.72.84-3.93 1.24h-.14c-.57.1-.57.1-1.03.36l-.05.45v.09c-.07 1.08-.07 2.33-.07 3.41v5.39l-.28-.54c-.21-.41-.55-.68-.97-.88-.41-.14-1-.14-1.49 0-.55.27-.89.68-1.09 1.27l-.06.67v.28l-.03 3.4v.2l-.07.36c-.2.12-.36.06-.48.06-.42-.14-.82-.28-1.22-.05-.29.18-.55.45-.64.82-.02.45.01.82.26 1.18l.57.5-1.49-.42-.28-.1c-.78-.25-1.74-.58-2.1-.7h-.23c-.34-.1-.48-.27-.62-.5l-.35.2-.2.14a.9.9 0 0 0-.56.72c0 .27.06.4.2.6.28.29.56.44.91.67h.14c.83.46 1.72.52 2.67.52c1.79.03 1.79.03 2.26.55c.29.33.4.56.4.94c0 .38-.2.56-.37.76c-.23.2-.45.22-.72.22h-.62c-1.65-.03-3.26-.4-4.47-1.58l-.1-.09a2.78 2.78 0 0 1-.77-2.08c0-.36.04-.62.18-.93l.04-.13c.18-.35.44-.62.73-.89l.09-.09c.55-.56 1.23-.84 1.96-1.05l0-.74v-.09c.01-.18.04-.45.23-.59c.22-.22.59-.27.91-.35Z"
    ></path>
  </svg>
)

export default React.memo(IceColored)