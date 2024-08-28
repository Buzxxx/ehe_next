import * as React from "react";

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ width = 20, height = 20, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9a9898"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-align-justify"
      {...props}
    >
      <line x1={3} x2={21} y1={6} y2={6} />
      <line x1={3} x2={21} y1={12} y2={12} />
      <line x1={3} x2={21} y1={18} y2={18} />
    </svg>
  );
};

export default MenuIcon;
