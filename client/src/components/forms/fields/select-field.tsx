import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export type SelectFieldOptionValue = string | number;

export interface SelectFieldProps<T extends SelectFieldOptionValue> {
   label?: string;
   size?: 'small' | 'medium';
   options: Array<{
      name: string;
      value: T;
   }>;
   name: string;
   control: Control<any>;
   showAsterisk?: boolean;
}

export const SelectField = <T extends SelectFieldOptionValue>({
   label,
   size = 'small',
   options,
   name,
   control,
   showAsterisk = false,
}: SelectFieldProps<T>) => {
   const {
      field: { value, onChange, onBlur, ref },
      fieldState: { invalid, error },
   } = useController({
      name,
      control,
   });

   return (
      <FormControl fullWidth size={size}>
         <InputLabel required={showAsterisk}>{label}</InputLabel>
         <Select
            name={name}
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            inputRef={ref}
            error={invalid}
         >
            {options.map((opt) => (
               <MenuItem key={opt.value} value={opt.value}>
                  {opt.name}
               </MenuItem>
            ))}
         </Select>
         {error?.message && <FormHelperText error>{error.message}</FormHelperText>}
      </FormControl>
   );
};
