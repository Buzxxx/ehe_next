import React from 'react';
import PropTypes from 'prop-types';

const NotifIcon = ({ width = 24, height = 24, color = '#9a9898', className = '', style = {}, ...props }) => {
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
      className={`lucide lucide-bell ${className}`}
      style={style}
      {...props}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
};

NotifIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default NotifIcon;

