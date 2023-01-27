import classNames from 'classnames';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps {
   children?: ReactNode;
   type?: 'primary' | 'default';
   size?: 'sm' | 'md' | 'lg';
   icon?: ReactNode;
   outlined?: boolean;
   contrast?: boolean;
   shape?: 'square' | 'circle';
   className?: string;
}

export function Button({
   className,
   children,
   type = 'default',
   size = 'md',
   outlined = undefined,
   contrast = false,
   icon,
   shape = 'square',
}: ButtonProps) {
   if (shape === 'circle' && icon !== undefined) {
      return (
         <button
            className={twMerge(
               classNames(
                  `btn btn-circle btn-sm`,
                  {
                     'btn-primary': type === 'primary',
                     'border-gray-300 bg-white text-gray-600 hover:bg-white hover:border-primary hover:text-primary':
                        type === 'default',
                     'border-none': outlined === false,
                     'btn-outline': outlined,
                  },
                  className
               )
            )}
         >
            {icon}
         </button>
      );
   }

   return (
      <button
         className={twMerge(
            classNames(
               'w-full px-4 h-9 text-sm rounded-lg duration-150 font-medium',
               {
                  'h-6 text-xs': size === 'sm',
                  'h-10 text-base': size === 'lg',
                  'pl-0 pr-3': icon !== undefined && size === 'sm',
                  'text-white bg-primary hover:bg-primary-dark active:bg-primary':
                     type === 'primary' && !outlined,
                  'bg-white border border-gray-300 text-gray-600 hover:border-primary hover:text-primary':
                     type === 'default',
                  'bg-transparent text-primary border border-primary hover:text-white hover:bg-primary':
                     type === 'primary' && outlined,
                  'text-white border-white': contrast,
               },
               className
            )
         )}
      >
         {icon !== undefined && children !== undefined && (
            <div className="flex justify-center items-center">
               <div
                  className={twMerge(
                     classNames('mr-2', {
                        'mr-0.5': size === 'sm',
                     })
                  )}
               >
                  {icon}
               </div>
               <div>{children}</div>
            </div>
         )}
         {icon === undefined && children !== undefined && children}
      </button>
   );
}
