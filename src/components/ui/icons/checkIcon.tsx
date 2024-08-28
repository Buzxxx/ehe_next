import * as React from "react";

// Define the type for props
type ClassType = {
  className?: string;
};

// Functional component definition
const CircleCheckIcon: React.FC<ClassType> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9a9898"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-circle-check ${className}`}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
};

export default CircleCheckIcon;
