import * as React from "react";

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

const SVGComponent: React.FC<SVGComponentProps> = ({
  width = 24,
  height = 24,
  color = "#9a9898",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-filter"
    {...props}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export default SVGComponent;
