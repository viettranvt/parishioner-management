import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Control, useController } from 'react-hook-form';

export type RadioFieldOptionValue = string | number;

export interface RadioFieldProps<T extends RadioFieldOptionValue> {
   label?: string;
   options: Array<{
      name: string;
      value: T;
   }>;
   name: string;
   control: Control<any>;
}

export const RadioField = <T extends RadioFieldOptionValue>({
   label,
   options,
   name,
   control,
}: RadioFieldProps<T>) => {
   const {
      field: { value, onChange, onBlur, ref },
   } = useController({
      name,
      control,
   });

   return (
      <FormControl>
         <FormLabel>{label}</FormLabel>
         <RadioGroup row name={name} onChange={onChange} onBlur={onBlur} value={value} ref={ref}>
            {options.map((opt) => (
               <FormControlLabel
                  key={opt.value}
                  value={opt.value}
                  control={<Radio />}
                  label={opt.name}
               />
            ))}
         </RadioGroup>
      </FormControl>
   );
};
