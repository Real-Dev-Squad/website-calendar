import * as React from 'react';
import { IconProps } from '~/types/Icon';

export const Email: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={24}
    height={24}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 34 30"
  >
    <g fill="none">
      <rect width="30" height="22" x="1" y="5" fill="#B4ACBC" rx="1.5"></rect>
      <rect width="28" height="18" x="2" y="7" fill="#CDC4D6" rx="1"></rect>
      <path
        fill="#E1D8EC"
        d="m30 23.4l-12.971-7.782a2 2 0 0 0-2.058 0L2 23.4V25a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1v-1.6Z"
      ></path>
      <path fill="#998EA4" d="M2 9.766V8h28v1.766L17.544 17.24a3 3 0 0 1-3.088 0L2 9.766Z"></path>
      <path
        fill="#F3EEF8"
        d="M2 8.6V7a1 1 0 0 1 1-1h26a1 1 0 0 1 1 1v1.6l-12.971 7.783a2 2 0 0 1-2.058 0L2 8.6Z"
      ></path>
      <path fill="#00A6ED" d="M16 23a7 7 0 1 0 0-14a7 7 0 0 0 0 14Z"></path>
      <path
        fill="#F4F4F4"
        d="M16 11.5c-1.21-.02-2.36.44-3.22 1.3c-.87.85-1.34 1.99-1.34 3.2c0 2.48 2.02 4.5 4.5 4.5a.47.47 0 1 0 0-.94c-1.96 0-3.56-1.6-3.56-3.56c0-.96.38-1.86 1.06-2.53c.68-.67 1.59-1.03 2.55-1.03c1.93.03 3.51 1.65 3.51 3.62v.81a.67.67 0 0 1-1.34 0v-3.08a.47.47 0 0 0-.47-.47c-.26 0-.49.21-.49.47v.09c-.44-.35-.99-.57-1.6-.57c-1.4 0-2.54 1.14-2.54 2.54c0 1.4 1.14 2.54 2.54 2.54c.7 0 1.34-.29 1.8-.75c.28.5.81.84 1.42.84c.89 0 1.62-.73 1.62-1.62v-.81c0-2.47-1.99-4.52-4.44-4.55Zm-.39 5.96c-.88 0-1.6-.72-1.6-1.6c0-.88.72-1.6 1.6-1.6c.88 0 1.6.72 1.6 1.6c0 .88-.72 1.6-1.6 1.6Z"
      ></path>
    </g>
  </svg>
);
