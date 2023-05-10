import { TextField } from '@mui/material';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string;
   control: Control<any>;
   label?: string;
   customSize?: 'small' | 'medium';
   rows?: number;
   multiline?: boolean;
}

export function InputField({
   name,
   control,
   label,
   customSize = 'small',
   rows,
   multiline = false,
   ...inputProps
}: InputFieldProps) {
   const {
      field: { value, onChange, onBlur, ref },
      fieldState: { invalid, error },
   } = useController({
      name,
      control,
   });

   return (
      <TextField
         InputLabelProps={{ shrink: true }}
         size={customSize}
         fullWidth
         label={label}
         value={value}
         onChange={onChange}
         onBlur={onBlur}
         inputRef={ref}
         error={invalid}
         helperText={error?.message}
         inputProps={inputProps}
         variant="outlined"
         multiline={multiline}
         rows={rows}
      />
   );
}
