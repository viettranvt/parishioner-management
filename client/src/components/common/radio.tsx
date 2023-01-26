import classNames from 'classnames';
import { FormFieldLabel } from 'components/common';
import { twMerge } from 'tailwind-merge';

export interface RadioOption<Value> {
   label: string;
   value?: Value;
}

export interface RadioProps<OptionValue> {
   label?: string;
   options?: RadioOption<OptionValue>[];
   size?: 'small' | 'medium' | 'large';
}

export function Radio<OptionValue extends string | number>({
   label,
   options = [],
   size = 'medium',
}: RadioProps<OptionValue>) {
   return (
      <div className="form-control w-full">
         {label !== undefined && <FormFieldLabel>{label}</FormFieldLabel>}
         <div className="flex gap-4">
            {options.map((o) => (
               <div key={o.value} className="form-control">
                  <label className="label cursor-pointer gap-3">
                     <input
                        type="radio"
                        name="radio-10"
                        className={twMerge(
                           'radio checked:bg-primary',
                           classNames({
                              'radio-sm': size === 'small',
                              'radio-md': size === 'medium',
                              'radio-lg': size === 'large',
                           })
                        )}
                        value={o.value}
                     />
                     <span className="label-text">{o.label}</span>
                  </label>
               </div>
            ))}
         </div>
      </div>
   );
}
