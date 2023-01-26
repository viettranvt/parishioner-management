import classNames from 'classnames';
import { FormFieldLabel } from 'components/common';
import { useState } from 'react';
import RcDatePicker from 'react-datepicker';
import { twMerge } from 'tailwind-merge';

export interface DatePickerProps {
   label?: string;
   size?: 'small' | 'medium' | 'large';
}

export function DatePicker({ label, size = 'medium' }: DatePickerProps) {
   const [startDate, setStartDate] = useState<Date | null>(null);

   return (
      <div className="form-control w-full">
         {label !== undefined && <FormFieldLabel>{label}</FormFieldLabel>}
         <RcDatePicker
            placeholderText="Chọn ngày"
            dateFormat="dd/MM/yyyy"
            locale="vi"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            className={twMerge(
               classNames('input input-bordered w-full focus:outline-none focus:border-primary', {
                  'input-sm': size === 'small',
                  'input-md': size === 'medium',
                  'input-lg': size === 'large',
               })
            )}
         />
      </div>
   );
}
