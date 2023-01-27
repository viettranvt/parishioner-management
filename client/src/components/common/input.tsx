import classNames from 'classnames';
import { FormFieldLabel } from 'components/common';
import { HTMLInputTypeAttribute } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps {
   label?: string;
   placeholder?: string;
   type?: HTMLInputTypeAttribute;
   size?: 'small' | 'medium' | 'large';
   autofocus?: boolean;
   required?: boolean;
}

export function Input({
   label,
   placeholder,
   type = 'text',
   size = 'medium',
   autofocus = false,
   required = false,
}: InputProps) {
   return (
      <div className="form-control w-full">
         {label !== undefined && <FormFieldLabel required={required}>{label}</FormFieldLabel>}
         <input
            autoFocus={autofocus}
            type={type}
            placeholder={placeholder}
            className={twMerge(
               classNames('input input-bordered focus:outline-none focus:border-primary', {
                  'input-sm': size === 'small',
                  'input-md': size === 'medium',
                  'input-lg': size === 'large',
               })
            )}
         />
         {/* <label className="label">
            <span className="label-text-alt">Hint text</span>
         </label> */}
      </div>
   );
}
