import { Clear, FilterAlt } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
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
import { DateRangePickerDates } from 'components/common';
import { DateRangeField, DateRangeFieldMethods, InputField } from 'components/forms/fields';
import { FemaleChristianNames, MaleChristianNames } from 'constants/strings';
import { DateRange, ParishionerFilterFormData } from 'models';
import { useRef, useState } from 'react';
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

function getChristianNameSelectStyles(name: string, personName: string[], theme: Theme) {
   return {
      fontWeight:
         personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
   };
}

interface ActionButtonProps {
   loading?: boolean;
}

export interface ParishionerFilterFormProps {
   initialValues?: ParishionerFilterFormData;
   btnSubmitProps?: ActionButtonProps;
   btnClearProps?: ActionButtonProps;
   onSubmit?: (formValues?: ParishionerFilterFormData) => void;
}

export function ParishionerFilterForm({
   onSubmit,
   initialValues,
   btnSubmitProps,
   btnClearProps,
}: ParishionerFilterFormProps) {
   const theme = useTheme();
   const { control, handleSubmit, reset } = useForm<ParishionerFilterFormData>({
      defaultValues: {
         ...initialValues,
         fullName: initialValues?.fullName || '',
      },
   });
   const [christianNames, setChristianNames] = useState<string[]>([]);
   const [baptismDateRange, setBaptismDateRange] = useState<DateRange | undefined>();
   const [firstCommunionDateRange, setFirstCommunionDateRange] = useState<DateRange>();
   const [confirmationDateRange, setConfirmationDateRange] = useState<DateRange>();
   const [weddingDateRange, setWeddingDateRange] = useState<DateRange>();
   const baptismDateRangeFieldRef = useRef<DateRangeFieldMethods>(null);
   const firstCommunionDateRangeFieldRef = useRef<DateRangeFieldMethods>(null);
   const confirmationDateRangeFieldRef = useRef<DateRangeFieldMethods>(null);
   const weddingDateRangeFieldRef = useRef<DateRangeFieldMethods>(null);

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

   const handleFirstCommunionDateChange = (dateRange?: DateRangePickerDates) => {
      setFirstCommunionDateRange(dateRange?.startDate && dateRange.endDate ? dateRange : undefined);
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
         firstCommunionDateRange,
         confirmationDateRange,
         weddingDateRange,
      });
   };

   const clear = () => {
      reset();
      setChristianNames([]);
      baptismDateRangeFieldRef.current?.clear();
      firstCommunionDateRangeFieldRef.current?.clear();
      confirmationDateRangeFieldRef.current?.clear();
      weddingDateRangeFieldRef.current?.clear();
      onSubmit?.(undefined);
   };

   const submit = () => {
      handleSubmit(handleFormSubmit)();
   };

   return (
      <>
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
                           style={getChristianNameSelectStyles(name, christianNames, theme)}
                        >
                           {name}
                        </MenuItem>
                     ))}
                     <ListSubheader>Nữ</ListSubheader>
                     {FemaleChristianNames.map((name) => (
                        <MenuItem
                           key={name}
                           value={name}
                           style={getChristianNameSelectStyles(name, christianNames, theme)}
                        >
                           {name}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </Box>

            <Box mt={3}>
               <DateRangeField
                  ref={baptismDateRangeFieldRef}
                  label="Ngày rửa tội"
                  onChange={handleBaptismDateChange}
               />
            </Box>

            <Box mt={3}>
               <DateRangeField
                  ref={firstCommunionDateRangeFieldRef}
                  label="Ngày rước lễ lần đầu"
                  onChange={handleFirstCommunionDateChange}
               />
            </Box>

            <Box mt={3}>
               <DateRangeField
                  ref={confirmationDateRangeFieldRef}
                  label="Ngày thêm sức"
                  onChange={handleConfirmationDateChange}
               />
            </Box>

            <Box mt={3}>
               <DateRangeField
                  ref={weddingDateRangeFieldRef}
                  label="Ngày cưới"
                  onChange={handleWeddingDateChange}
               />
            </Box>
         </form>

         <div className="flex gap-2 mt-5">
            <LoadingButton
               onClick={clear}
               variant="outlined"
               className="w-1/2"
               loading={btnSubmitProps?.loading}
               loadingPosition="start"
               startIcon={<Clear />}
            >
               Xoá
            </LoadingButton>
            <LoadingButton
               onClick={submit}
               variant="contained"
               className="w-1/2"
               loading={btnSubmitProps?.loading}
               loadingPosition="start"
               startIcon={<FilterAlt />}
            >
               Lọc
            </LoadingButton>
         </div>
      </>
   );
}
