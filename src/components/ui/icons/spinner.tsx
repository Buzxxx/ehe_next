import React from 'react';

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeColor?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ width = 24, height = 24, strokeColor = '#9a9898', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
    </svg>
  );
};

export default Spinner;
