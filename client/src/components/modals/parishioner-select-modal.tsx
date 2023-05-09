import { Search } from '@mui/icons-material';
import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   List,
   ListItemButton,
   TextField,
} from '@mui/material';
import { ParishionerCard } from 'components/parishioner-card';
import { Gender } from 'constants/gender';
import { DateFormat, Paths } from 'constants/strings';
import { ParishionerBasicData } from 'models';
import moment from 'moment';
import { useEffect, useState } from 'react';

export interface ParishionerSelectModalProps {
   selectedOptions?: ParishionerBasicData[];
   options: ParishionerBasicData[];
   open?: boolean;
   multipleSelect?: boolean;
   onClose: () => void;
   onSave: (data: ParishionerBasicData[]) => void;
}

export function ParishionerSelectModal({
   open = false,
   multipleSelect = false,
   options,
   selectedOptions,
   onClose,
   onSave,
}: ParishionerSelectModalProps) {
   const [selectedParishioners, setSelectedParishioners] = useState<ParishionerBasicData[]>([]);

   const handleSelectParishioner = (data: ParishionerBasicData) => {
      let newParishioners: ParishionerBasicData[] = [];
      const currentIndex = selectedParishioners.findIndex((p) => p.id === data.id);

      if (multipleSelect) {
         newParishioners = [...selectedParishioners];

         if (currentIndex === -1) {
            newParishioners.push(data);
         } else {
            newParishioners.splice(currentIndex, 1);
         }
      } else {
         if (currentIndex === -1) {
            newParishioners.push(data);
         }
      }

      setSelectedParishioners(newParishioners);
   };

   const handleClose = () => {
      onClose();
   };

   const handleOk = () => {
      onSave(selectedParishioners);
   };

   useEffect(() => {
      setSelectedParishioners(selectedOptions ?? []);
   }, [selectedOptions]);

   return (
      <Dialog open={open} fullWidth onClose={onClose}>
         <DialogTitle>Chọn giáo dân</DialogTitle>
         <DialogContent>
            <Box pt={2}>
               <TextField
                  label="Tìm kiếm giáo dân"
                  placeholder="Họ tên, tên thánh"
                  type="search"
                  fullWidth
                  InputProps={{ startAdornment: <Search /> }}
               />
            </Box>
            <Box pt={2}>
               <List disablePadding>
                  {options.map((p) => (
                     <ListItemButton
                        key={p.id}
                        selected={selectedParishioners.findIndex((sp) => sp.id === p.id) > -1}
                        onClick={() => handleSelectParishioner(p)}
                     >
                        <ParishionerCard
                           fullName={p.fullName}
                           avatar={
                              p.gender === Gender.Male
                                 ? Paths.defaultMaleAvatar
                                 : Paths.defaultFemaleAvatar
                           }
                           title={[
                              p.christianName,
                              p.dateOfBirth !== undefined
                                 ? moment(p.dateOfBirth).format(DateFormat)
                                 : undefined,
                              p.parishName,
                           ]
                              .filter((e) => e)
                              .join(' • ')}
                        />
                     </ListItemButton>
                  ))}
               </List>
            </Box>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>Huỷ bỏ</Button>
            <Button onClick={handleOk} autoFocus>
               Đồng ý
            </Button>
         </DialogActions>
      </Dialog>
   );
}
