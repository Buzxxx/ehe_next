import * as React from "react"

const FireColored = ({ size = 24, ...props }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    {...props}
  >
    <path
      fill="#FD7307"
      d="M8.813-.041c1.359 0 2.813.75 3.688 1.195l.092.091c1.658 1.568 2.713 3.724 3.403 5.884l.183-.275.092-.138a5.413 5.413 0 0 0 .55-1.636l.046-.138.183-.229c.137 0 .275 0 .413.092.597.459 1.014.982 1.492 1.275 1.853 1.977 2.604 5.089 2.69 6.254v.183a9.789 9.789 0 0 1-2.016 7.31l-.092.092-.321.367-.092.137c-1.47 1.513-3.678 2.431-5.797 2.482a9.17 9.17 0 0 1-7.549-3.596l-.046-.092c-1.075-1.5-1.637-3.279-1.637-5.15v-.092c0-1.496.413-2.796 1.008-4.15l.321-.688.092-.183c.394-1.5.688-2.175 1.275-2.183.413.229.596.734.688 1.194l.137.688q.688-.596 1.237-1.341l.092-.138a7.331 7.331 0 0 0 1.375-4.095c0-.825-.229-1.563-.504-2.292-.321-.963-.321-.963-.229-1.375.092-.183.092-.183.229-.229"
    ></path>
    <path
      fill="#FC9402"
      d="M11.333 9.043c.458.138.688.596.917.963l.046.092.046.092.367.596.046.092c.733 1.239 1.146 2.53 1.42 3.917.55-.458.871-.963 1.192-1.613l.046-.138.046-.138.321-.321c.229 0 .321.092 .459.229a2.116 2.116 0 0 1 .367.459c.11.18.21.37.299.568.275.458 1.102 2.496.146 4.158l-.046.183a2.79 2.79 0 0 1-1.125 1.961 3.048 3.048 0 0 1-2.625.977l-.183-.046c-.963-.229-1.834-.596-2.613-1.275l-.138-.092q-1.313-1.195-1.796-2.867l-.046-.092a5.616 5.616 0 0 1 1.738-2.55 26.184 26.184 0 0 0 .963-1.063 8.638 8.638 0 0 0 .917-1.018c.458-.55.871-1.146 1.146-1.834.229-.413.229-.413.459-.505"
    ></path>
    <path
      fill="#FCE101"
      d="M12.667 18.478c.504.367.688 1.192.917 1.742l.596 1.579c.321.642.504 1.146.275 1.834-.183.55-.596.963-1.146 1.195l-.092.046-.138.046c-.504.137-1.192.137-1.688-.137l-.092-.046-.092-.046-.275-.229-.092-.092a2.725 2.725 0 0 1-.775-1.742c-.046-1.321.458-2.413 1.342-3.412.321-.413.779-.825 1.342-.642"
    ></path>
    <path
      fill="#FE590A"
      d="M14.758 21.083v.092c-.504.092-1.004.183-1.496.183v-.046h.092l.458-.092h.137l.596-.137z"
    ></path>
  </svg>
)

export default React.memo(FireColored)