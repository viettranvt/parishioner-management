import { ArrowForward, Delete, Edit } from '@mui/icons-material';
import {
   IconButton,
   styled,
   Table,
   TableBody,
   TableCell,
   tableCellClasses,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
} from '@mui/material';
import { history } from 'app/store';
import { ConfirmModal } from 'components/modals';
import { ParishionerCard } from 'components/parishioner-card';
import { Gender } from 'constants/gender';
import { PageId, Pages } from 'constants/pages';
import { DateFormat } from 'constants/strings';
import { ParishionerBasicData } from 'models';
import moment from 'moment';
import { useState } from 'react';

export interface ParishionerTableProps {
   parishioners: ParishionerBasicData[];
   page?: number;
   limit?: number;
   onDelete?: (row: ParishionerBasicData) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.grey[50],
      fontWeight: 600,
   },
}));

export function ParishionerTable({
   parishioners,
   page = 1,
   limit = 10,
   onDelete,
}: ParishionerTableProps) {
   const [openDeletionConfirmModal, setOpenDeletionConfirmModal] = useState<boolean>(false);
   const [focusedRow, setFocusedRow] = useState<ParishionerBasicData | undefined>(undefined);

   const handleRowClick = (data: ParishionerBasicData) => {
      history.push((Pages.get(PageId.ParishionerDetail)?.path ?? '').replace(':id', data.id));
   };

   const handleDeleteRow = (data: ParishionerBasicData) => {
      setFocusedRow(data);
      setOpenDeletionConfirmModal(true);
   };

   const handleCloseDeletionConfirmModal = () => {
      setFocusedRow(undefined);
      setOpenDeletionConfirmModal(false);
   };

   const handleOkDeletionConfirmModal = () => {
      if (focusedRow && onDelete) {
         onDelete(focusedRow);
         handleCloseDeletionConfirmModal();
      }
   };

   return (
      <>
         <TableContainer sx={{ height: 500 }}>
            <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
               <TableHead>
                  <TableRow>
                     <StyledTableCell>Họ tên</StyledTableCell>
                     <StyledTableCell>Tên thánh</StyledTableCell>
                     <StyledTableCell>Ngày sinh</StyledTableCell>
                     <StyledTableCell>Giới tính</StyledTableCell>
                     <StyledTableCell>Giáo họ</StyledTableCell>
                     <StyledTableCell></StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {parishioners.map((row) => {
                     const { dateOfBirth } = row;
                     return (
                        <TableRow
                           key={row.id}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                           hover
                           onClick={() => handleRowClick(row)}
                        >
                           <TableCell>
                              {' '}
                              <ParishionerCard fullName={row.fullName} />
                           </TableCell>
                           <TableCell>{row.christianName}</TableCell>
                           <TableCell>
                              {dateOfBirth ? (
                                 moment(dateOfBirth).format(DateFormat)
                              ) : (
                                 <Typography variant="caption" display="block" gutterBottom>
                                    Chưa xác định
                                 </Typography>
                              )}
                           </TableCell>
                           <TableCell>{row.gender === Gender.Male ? 'Nam' : 'Nữ'}</TableCell>
                           <TableCell>{row.parishName}</TableCell>
                           <TableCell align="right">
                              <div className="flex justify-end gap-4">
                                 <IconButton size="small">
                                    <Edit fontSize="small" />
                                 </IconButton>
                                 <IconButton
                                    size="small"
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       handleDeleteRow(row);
                                    }}
                                 >
                                    <Delete fontSize="small" />
                                 </IconButton>
                                 <IconButton size="small">
                                    <ArrowForward fontSize="small" />
                                 </IconButton>
                              </div>
                           </TableCell>
                        </TableRow>
                     );
                  })}
               </TableBody>
            </Table>
         </TableContainer>
         <ConfirmModal
            message="Bạn thật sự muốn xoá thông tin giáo dân này?"
            open={openDeletionConfirmModal}
            onOk={handleOkDeletionConfirmModal}
            onCancel={handleCloseDeletionConfirmModal}
            onClose={handleCloseDeletionConfirmModal}
         />
      </>
   );
}
