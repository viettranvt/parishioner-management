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
import { ParishionerCard } from 'components/parishioner-card';
import { Gender } from 'constants/gender';
import { PageId, Pages } from 'constants/pages';
import { DateFormat } from 'constants/strings';
import { ParishionerBasicData } from 'models';
import moment from 'moment';

export interface ParishionerTableProps {
   parishioners: ParishionerBasicData[];
   page?: number;
   limit?: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.grey[50],
      fontWeight: 600,
   },
}));

export function ParishionerTable({ parishioners, page = 1, limit = 10 }: ParishionerTableProps) {
   const handleRowClick = (data: ParishionerBasicData) => {
      history.push((Pages.get(PageId.ParishionerDetail)?.path ?? '').replace(':id', data.id));
   };

   return (
      <>
         <TableContainer sx={{ height: 500 }}>
            <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
               <TableHead>
                  <TableRow>
                     <StyledTableCell align="center">STT</StyledTableCell>
                     <StyledTableCell>Họ tên</StyledTableCell>
                     <StyledTableCell>Tên thánh</StyledTableCell>
                     <StyledTableCell>Ngày sinh</StyledTableCell>
                     <StyledTableCell>Giới tính</StyledTableCell>
                     <StyledTableCell>Giáo họ</StyledTableCell>
                     <StyledTableCell></StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {parishioners.map((row, idx) => {
                     const { dateOfBirth } = row;
                     return (
                        <TableRow
                           key={row.id}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                           hover
                           onClick={() => handleRowClick(row)}
                        >
                           <TableCell align="center">{(page - 1) * limit + idx + 1}</TableCell>
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
                                 <IconButton size="small">
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
      </>
   );
}
