import classNames from 'classnames';
import { FormFieldLabel } from 'components/common';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface SelectOption<Value> {
   label: string;
   value?: Value;
}

export interface SelectProps<OptionValue> {
   label?: string;
   options?: SelectOption<OptionValue>[];
   size?: 'small' | 'medium' | 'large';
   placeholder?: string;
}

export function Select<OptionValue extends string | number>({
   label,
   options = [],
   size = 'medium',
   placeholder,
}: SelectProps<OptionValue>) {
   return (
      <div className="form-control w-full">
         {label !== undefined && <FormFieldLabel>{label}</FormFieldLabel>}
         <select
            className={twMerge(
               classNames(
                  'select select-bordered font-normal focus:outline-none focus:border-primary',
                  {
                     'select-sm': size === 'small',
                     'select-md': size === 'medium',
                     'select-lg': size === 'large',
                  }
               )
            )}
         >
            {placeholder !== undefined && (
               <option value="" disabled selected hidden>
                  {placeholder}
               </option>
            )}
            {options.map((o) => (
               <option key={o.value} value={o.value}>
                  {o.label}
               </option>
            ))}
         </select>
         {/* <label className="label">
            <span className="label-text-alt">Alt label</span>
         </label> */}
      </div>
   );
}
