import classNames from 'classnames';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface IArrowLeftIconProps {
   className?: string;
}

export function ArrowLeftIcon({ className }: IArrowLeftIconProps) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         strokeWidth={1.5}
         stroke="currentColor"
         className={twMerge(classNames('w-6 h-6', className))}
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
         />
      </svg>
   );
}
