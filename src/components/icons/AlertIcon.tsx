import React from 'react';

const AlertIcon: React.FC = () => {
  return (
    <svg
      height="1.2rem"
      width="1.2rem"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 483.55 483.55"
    >
      <defs>
        <style>
          {`.cls-1 {
            fill: #fff;
          }
          .cls-1, .cls-2 {
            stroke-width: 0px;
          }
          .cls-2 {
            fill: #b000ff;
          }`}
        </style>
      </defs>
      <circle className="cls-2" cx="241.77" cy="241.77" r="241.77" />
      <path
        className="cls-1"
        d="m208.14,327.86h66v64.74h-66v-64.74Zm2.52-215.65h62.64l-3.36,178.66h-56.33l-2.94-178.66Z"
      />
    </svg>
  );
};

export default AlertIcon;
