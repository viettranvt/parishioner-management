import classNames from 'classnames';
import { FormFieldLabel } from 'components/common';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextAreaProps {
   label?: string;
   placeholder?: string;
   size?: 'small' | 'medium' | 'large';
   className?: string;
}

export function TextArea({ label, placeholder, size = 'medium', className }: TextAreaProps) {
   return (
      <div className="form-control w-full">
         {label !== undefined && <FormFieldLabel>{label}</FormFieldLabel>}
         <textarea
            className={twMerge(
               classNames(
                  'textarea textarea-bordered focus:outline-none focus:border-primary',
                  {
                     'textarea-sm': size === 'small',
                     'textarea-md': size === 'medium',
                     'textarea-lg': size === 'large',
                  },
                  className
               )
            )}
            placeholder={placeholder}
         ></textarea>
      </div>
   );
}
