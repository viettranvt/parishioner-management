import { DateRange } from '@mui/icons-material';
import {
   Box,
   Button,
   FormControl,
   IconButton,
   InputAdornment,
   InputLabel,
   Modal,
   OutlinedInput,
} from '@mui/material';
import { DateRangePicker, DateRangePickerDates } from 'components/common';
import moment from 'moment';
import { useState } from 'react';

const pickerContentStyle = {
   position: 'absolute' as 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   backgroundColor: '#fff',
   padding: 10,
};

export interface DateRangeFieldProps {
   initialValues?: DateRangePickerDates;
   label?: string;
   customSize?: 'small' | 'medium';
   onChange?: (dateRange?: DateRangePickerDates) => void;
}

export function DateRangeField({
   label,
   customSize = 'small',
   onChange,
   initialValues,
}: DateRangeFieldProps) {
   const [text, setText] = useState<string>('');
   const [showPicker, setShowPicker] = useState<boolean>(false);
   const [selectedDateRange, setSelectedDateRange] = useState<DateRangePickerDates>();

   const handleShowPicker = () => {
      setShowPicker(true);
   };

   const handlePickerSelect = (dates?: DateRangePickerDates) => {
      setSelectedDateRange(dates);
   };

   const closePicker = () => {
      setShowPicker(false);
   };

   const handleSubmitPicker = () => {
      const startDate = selectedDateRange?.startDate;
      const endDate = selectedDateRange?.endDate;
      setText(
         startDate && endDate
            ? `${moment(startDate).format('DD/MM/YYYY')} - ${moment(endDate).format('DD/MM/YYYY')}`
            : ''
      );
      onChange?.(selectedDateRange);
      closePicker();
   };

   return (
      <>
         <FormControl variant="outlined" size={customSize} fullWidth>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
               onClick={handleShowPicker}
               onMouseDown={handleShowPicker}
               readOnly
               style={{ paddingRight: 0 }}
               value={text}
               type="text"
               label={label}
               endAdornment={
                  <InputAdornment position="end">
                     <IconButton onClick={handleShowPicker}>
                        <DateRange />
                     </IconButton>
                  </InputAdornment>
               }
            />
            {/* {error !== undefined && <FormHelperText error>{error?.message}</FormHelperText>} */}
         </FormControl>
         <Modal open={showPicker} onClose={closePicker}>
            <Box style={pickerContentStyle}>
               <DateRangePicker onSelect={handlePickerSelect} initialValues={initialValues} />
               <div className="flex justify-end gap-3">
                  <Button onClick={closePicker}>Huỷ bỏ</Button>
                  <Button onClick={handleSubmitPicker}>Xong</Button>
               </div>
            </Box>
         </Modal>
      </>
   );
}
