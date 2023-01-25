import classNames from 'classnames';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SButtonProps {
   children: ReactNode;
   type?: 'primary' | 'secondary';
   size?: 'medium' | 'small' | 'large';
   icon?: ReactNode;
   outlined?: boolean;
}

export function SButton({
   children,
   type = 'primary',
   size = 'medium',
   outlined = false,
   icon,
}: SButtonProps) {
   return (
      <button
         className={twMerge(
            classNames('w-full px-4 h-9 text-sm rounded-lg duration-150 font-medium', {
               'h-6 text-xs': size === 'small',
               'h-10 text-base': size === 'large',
               'pl-0 pr-3': icon !== undefined && size === 'small',
               'text-white bg-primary hover:bg-dark-primary active:bg-primary':
                  type === 'primary' && !outlined,
               'bg-gray-100 text-gray-600 hover:bg-gray-200': type === 'secondary',
               'bg-transparent text-primary border border-primary hover:text-white hover:bg-primary':
                  type === 'primary' && outlined,
            })
         )}
      >
         {icon ? (
            <div className="flex justify-center items-center">
               <div
                  className={twMerge(
                     classNames('mr-2', {
                        'mr-0.5': size === 'small',
                     })
                  )}
               >
                  {icon}
               </div>
               <div>{children}</div>
            </div>
         ) : (
            children
         )}
      </button>
   );
}
