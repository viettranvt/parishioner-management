import { useEffect, useState } from 'react';
import { DateRangePicker as RcDateRangePicker, RangeKeyDict } from 'react-date-range';

export interface DateRangePickerProps {
   initialValues?: DateRangePickerDates;
   onSelect?: (ranges?: DateRangePickerDates) => void;
}

export interface DateRangePickerDates {
   startDate: Date;
   endDate: Date;
}

export const DateRangePicker = ({ onSelect, initialValues }: DateRangePickerProps) => {
   const [startDate, setStartDate] = useState<Date>();
   const [endDate, setEndDate] = useState<Date>();

   const handleSelect = (ranges: RangeKeyDict) => {
      const newStartDate = ranges['selection'].startDate;
      const newEndDate = ranges['selection'].endDate;
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      onSelect?.(
         newStartDate && newEndDate ? { startDate: newStartDate, endDate: newEndDate } : undefined
      );
   };

   useEffect(() => {
      setStartDate(initialValues?.startDate);
      setEndDate(initialValues?.endDate);
   }, [initialValues]);

   return (
      <div>
         <RcDateRangePicker
            ranges={[
               {
                  startDate: startDate,
                  endDate: endDate,
                  key: 'selection',
               },
            ]}
            onChange={handleSelect}
         />
      </div>
   );
};
