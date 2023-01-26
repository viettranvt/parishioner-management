import classNames from 'classnames';
import { FormFieldLabel } from 'components/common';
import { HTMLInputTypeAttribute } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps {
   label?: string;
   placeholder?: string;
   type?: HTMLInputTypeAttribute;
   size?: 'small' | 'medium' | 'large';
}

export function Input({ label, placeholder, type = 'text', size = 'medium' }: InputProps) {
   return (
      <div className="form-control w-full">
         {label !== undefined && <FormFieldLabel>{label}</FormFieldLabel>}
         <input
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
