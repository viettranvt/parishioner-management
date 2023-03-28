import classNames from 'classnames';
import { FormFieldLabel } from 'components/common';
import { ChangeEventHandler, FocusEventHandler, forwardRef, HTMLInputTypeAttribute } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps {
   label?: string;
   placeholder?: string;
   type?: HTMLInputTypeAttribute;
   size?: 'small' | 'medium' | 'large';
   autofocus?: boolean;
   required?: boolean;
   value?: any;
   onChange?: ChangeEventHandler<HTMLInputElement>;
   onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
   (
      {
         label,
         placeholder,
         type = 'text',
         size = 'medium',
         autofocus = false,
         required = false,
         onChange,
         onBlur,
         value,
      }: InputProps,
      ref
   ) => {
      return (
         <div className="form-control w-full">
            {label !== undefined && <FormFieldLabel required={required}>{label}</FormFieldLabel>}
            <input
               ref={ref}
               value={value}
               onChange={onChange}
               onBlur={onBlur}
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
);
