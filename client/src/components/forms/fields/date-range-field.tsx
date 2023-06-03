import { DateRange, Close } from '@mui/icons-material';
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
import { DateFormat } from 'constants/strings';
import moment from 'moment';
import React, {
   forwardRef,
   useCallback,
   useEffect,
   useState,
   useImperativeHandle,
   ForwardedRef,
} from 'react';

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

export interface DateRangeFieldMethods {
   clear: () => void;
}

export const DateRangeField = forwardRef(function DateRangeField(
   { label, customSize = 'small', onChange, initialValues }: DateRangeFieldProps,
   ref: ForwardedRef<DateRangeFieldMethods>
) {
   const [text, setText] = useState<string>('');
   const showBtnClear = !!text;
   const [showPicker, setShowPicker] = useState<boolean>(false);
   const [selectedDateRange, setSelectedDateRange] = useState<DateRangePickerDates | undefined>();

   const handleShowPicker = () => {
      setShowPicker(true);
   };

   const handlePickerSelect = (dates?: DateRangePickerDates) => {
      setSelectedDateRange(dates);
   };

   const closePicker = () => {
      setShowPicker(false);
   };

   const updateText = useCallback((dates: Partial<DateRangePickerDates>) => {
      const startDate = dates?.startDate;
      const endDate = dates?.endDate;
      setText(
         startDate && endDate
            ? `${moment(startDate).format(DateFormat)} - ${moment(endDate).format(DateFormat)}`
            : ''
      );
   }, []);

   const handleSubmitPicker = () => {
      const startDate = selectedDateRange?.startDate;
      const endDate = selectedDateRange?.endDate;
      updateText({ startDate, endDate });
      onChange?.(selectedDateRange);
      closePicker();
   };

   const handleClearPicker = (e: React.MouseEvent) => {
      e.stopPropagation();
      clearPicker();
   };

   const clearPicker = useCallback(() => {
      setText('');
      setSelectedDateRange(undefined);
      onChange?.(undefined);
   }, [onChange]);

   useEffect(() => {
      updateText({ ...initialValues });
   }, [initialValues, updateText]);

   useImperativeHandle(
      ref,
      () => ({
         clear: clearPicker,
      }),
      [clearPicker]
   );

   return (
      <>
         <FormControl variant="outlined" size={customSize} fullWidth>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
               onClick={handleShowPicker}
               readOnly
               style={{ paddingRight: 0 }}
               value={text}
               type="text"
               label={label}
               endAdornment={
                  <InputAdornment position="end">
                     <IconButton onClick={showBtnClear ? handleClearPicker : handleShowPicker}>
                        {showBtnClear ? <Close /> : <DateRange />}
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
});
