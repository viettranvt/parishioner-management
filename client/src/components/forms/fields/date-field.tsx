import { FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DateFormat } from 'constants/strings';
import { Control, useController } from 'react-hook-form';

export interface DateFieldProps {
   name: string;
   control: Control<any>;
   label?: string;
   size?: 'small' | 'medium';
}

export function DateField({ name, control, label, size = 'small' }: DateFieldProps) {
   const {
      field: { value, onChange, onBlur, ref },
      fieldState: { invalid, error },
   } = useController({
      name,
      control,
   });

   return (
      <FormControl fullWidth size={size}>
         <DatePicker
            value={value || ''}
            label={label}
            inputRef={ref}
            format={DateFormat}
            slotProps={{
               textField: {
                  size,
                  onBlur: onBlur,
                  onChange: onChange,
                  error: invalid,
                  helperText: error?.message,
               },
            }}
         />
      </FormControl>
   );
}
