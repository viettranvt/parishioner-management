import {
   Box,
   Chip,
   FormControl,
   InputLabel,
   ListSubheader,
   MenuItem,
   Select,
   SelectChangeEvent,
   Theme,
   useTheme,
} from '@mui/material';
import { Button, DateRangePickerDates } from 'components/common';
import { DateRangeField, InputField } from 'components/forms/fields';
import { FilterIcon } from 'components/icons';
import { FemaleChristianNames, MaleChristianNames } from 'constants/strings';
import { DateRange, ParishionerFilterFormData } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

function getStyles(name: string, personName: string[], theme: Theme) {
   return {
      fontWeight:
         personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
   };
}

export interface ParishionerFilterFormProps {
   initialValues?: ParishionerFilterFormData;
   onSubmit?: (formValues: ParishionerFilterFormData) => void;
}

export function ParishionerFilterForm({ onSubmit, initialValues }: ParishionerFilterFormProps) {
   const theme = useTheme();
   const { control, handleSubmit } = useForm<ParishionerFilterFormData>({
      defaultValues: {
         ...initialValues,
         fullName: initialValues?.fullName || '',
      },
   });
   const [christianNames, setChristianNames] = useState<string[]>([]);
   const [baptismDateRange, setBaptismDateRange] = useState<DateRange | undefined>();
   const [firstCommunicationDateRange, setFirstCommunicationDateRange] = useState<DateRange>();
   const [confirmationDateRange, setConfirmationDateRange] = useState<DateRange>();
   const [weddingDateRange, setWeddingDateRange] = useState<DateRange>();

   const handleChristianNamesChange = (e: SelectChangeEvent<typeof christianNames>) => {
      const {
         target: { value },
      } = e;
      setChristianNames(
         // On autofill we get a stringified value.
         typeof value === 'string' ? value.split(',') : value
      );
   };

   const handleBaptismDateChange = (dateRange?: DateRangePickerDates) => {
      setBaptismDateRange(dateRange?.startDate && dateRange.endDate ? dateRange : undefined);
   };

   const handleFirstCommunicationDateChange = (dateRange?: DateRangePickerDates) => {
      setFirstCommunicationDateRange(
         dateRange?.startDate && dateRange.endDate ? dateRange : undefined
      );
   };

   const handleConfirmationDateChange = (dateRange?: DateRangePickerDates) => {
      setConfirmationDateRange(dateRange?.startDate && dateRange.endDate ? dateRange : undefined);
   };

   const handleWeddingDateChange = (dateRange?: DateRangePickerDates) => {
      setWeddingDateRange(dateRange?.startDate && dateRange.endDate ? dateRange : undefined);
   };

   const handleFormSubmit = (formValues: ParishionerFilterFormData) => {
      onSubmit?.({
         ...formValues,
         christianNames,
         baptismDateRange,
         firstCommunicationDateRange,
         confirmationDateRange,
         weddingDateRange,
      });
   };

   return (
      <form onSubmit={handleSubmit(handleFormSubmit)}>
         <InputField name="fullName" label="Họ tên" control={control} />

         <Box mt={3}>
            <FormControl fullWidth size="small">
               <InputLabel id="christian-name-select-label">Tên thánh</InputLabel>
               <Select
                  labelId="christian-name-select-label"
                  id="christian-name-select"
                  multiple
                  value={christianNames}
                  onChange={handleChristianNamesChange}
                  label="Tên thánh"
                  MenuProps={MenuProps}
                  renderValue={(selected) => (
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                           <Chip key={value} label={value} size="small" />
                        ))}
                     </Box>
                  )}
               >
                  <ListSubheader>Nam</ListSubheader>
                  {MaleChristianNames.map((name) => (
                     <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, christianNames, theme)}
                     >
                        {name}
                     </MenuItem>
                  ))}
                  <ListSubheader>Nữ</ListSubheader>
                  {FemaleChristianNames.map((name) => (
                     <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, christianNames, theme)}
                     >
                        {name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Box>

         <Box mt={3}>
            <DateRangeField label="Ngày rửa tội" onChange={handleBaptismDateChange} />
         </Box>

         <Box mt={3}>
            <DateRangeField
               label="Ngày rước lễ lần đầu"
               onChange={handleFirstCommunicationDateChange}
            />
         </Box>

         <Box mt={3}>
            <DateRangeField label="Ngày thêm sức" onChange={handleConfirmationDateChange} />
         </Box>

         <Box mt={3}>
            <DateRangeField label="Ngày cưới" onChange={handleWeddingDateChange} />
         </Box>

         <div className="flex gap-2 mt-5">
            <Button>Xoá</Button>
            <Button type="primary" htmlType="submit" icon={<FilterIcon className="w-5 h-5" />}>
               Lọc
            </Button>
         </div>
      </form>
   );
}
