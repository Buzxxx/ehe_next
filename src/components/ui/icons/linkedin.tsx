import React from "react"
const Icon = ({ size = 24, color = "currentColor" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={size} height={size}>
      <path
        fill={color}
        d="M209.92 20.48H46.08c-14.131 0-25.6 11.469-25.6 25.6v163.84c0 14.131 11.469 25.6 25.6 25.6h163.84c14.131 0 25.6-11.469 25.6-25.6V46.08c0-14.131-11.469-25.6-25.6-25.6zM87.04 102.4v97.28H56.32V102.4zM56.32 74.086c0-7.168 6.144-12.646 15.36-12.646s15.002 5.478 15.36 12.646c0 7.168-5.734 12.954-15.36 12.954-9.216 0-15.36-5.786-15.36-12.954zM199.68 199.68h-30.72v-51.2c0-10.24-5.12-20.48-17.92-20.685h-.41c-12.39 0-17.51 10.547-17.51 20.685v51.2H102.4V102.4h30.72v13.107s9.882-13.107 29.747-13.107c20.327 0 36.813 13.978 36.813 42.291z"
        fontFamily="none"
        fontSize="none"
        fontWeight="none"
        textAnchor="none"
        style={{ mixBlendMode: "normal" }}
      ></path>
    </svg>
  )
}

export default React.memo(Icon)