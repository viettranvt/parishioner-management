import { Search } from '@mui/icons-material';
import {
   Box,
   Button,
   CircularProgress,
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
import { debounce } from 'lodash';
import { ParishionerBasicData } from 'models';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface ParishionerSelectModalProps {
   selectedOptions?: ParishionerBasicData[];
   totalOptions: number;
   fetchOptions: () => void;
   options: ParishionerBasicData[];
   open?: boolean;
   multipleSelect?: boolean;
   onClose: () => void;
   onSave: (data: ParishionerBasicData[]) => void;
   onSearch?: (term: string) => void;
}

export function ParishionerSelectModal({
   open = false,
   totalOptions,
   fetchOptions,
   onSearch,
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

   const handleSearchParishioner = (term: string) => {
      debouncedSearchParishioner(term);
   };

   const debouncedSearchParishioner = useMemo(
      () => (onSearch ? debounce(onSearch, 300) : () => true),
      [onSearch]
   );

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
                  placeholder="Họ tên"
                  type="search"
                  fullWidth
                  InputProps={{ startAdornment: <Search /> }}
                  onChange={(e) => handleSearchParishioner(e.target.value)}
               />
            </Box>
            <Box pt={2}>
               <div
                  id="scrollableDiv"
                  style={{
                     height: 300,
                     overflow: 'auto',
                  }}
               >
                  <List disablePadding>
                     <InfiniteScroll
                        scrollableTarget="scrollableDiv"
                        dataLength={options.length}
                        next={fetchOptions}
                        hasMore={options.length < totalOptions}
                        loader={
                           <div className="flex justify-center align-bottom">
                              <CircularProgress size={16} />
                              <span className="ml-2 text-sm">Đang tải thêm...</span>
                           </div>
                        }
                     >
                        {options.map((p) => (
                           <ListItemButton
                              key={p.id}
                              selected={selectedParishioners.findIndex((sp) => sp.id === p.id) > -1}
                              onClick={() => handleSelectParishioner(p)}
                           >
                              <ParishionerCard
                                 id={p.id}
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
                     </InfiniteScroll>
                  </List>
               </div>
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
