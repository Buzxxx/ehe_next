import React from 'react';

interface WorkProps extends React.SVGProps<SVGSVGElement> {
  height?: number;
  width?: number;
  color?: string;
}

const Work: React.FC<WorkProps> = ({ height = 20, width = 20, color = "#737373", ...props }) => {
  return (
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
      className="lucide lucide-briefcase-business"
      {...props}
    >
      <path d="M12 12h.01" />
      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M22 13a18.15 18.15 0 0 1-20 0" />
      <rect width={20} height={14} x={2} y={6} rx={2} />
    </svg>
  );
};

export default Work;
