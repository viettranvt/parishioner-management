import classNames from 'classnames';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface FormFieldLabelProps {
   children: React.ReactNode;
   required?: boolean;
}

export function FormFieldLabel({ children, required = false }: FormFieldLabelProps) {
   return (
      <label className="label">
         <span
            className={twMerge(
               classNames('label-text text-gray-500 font-bold', {
                  required: required,
               })
            )}
         >
            {children}
         </span>
      </label>
   );
}
