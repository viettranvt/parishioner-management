import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export interface DividerProps {
   className?: string;
}

export function Divider({ className }: DividerProps) {
   return <hr className={twMerge(classNames('h-px my-4 bg-gray-100 border-0', className))} />;
}
