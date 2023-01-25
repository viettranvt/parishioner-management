import { SButton } from 'components/common';
import { DeleteIcon, EditIcon, SearchIcon } from 'components/icons';
import { ParishionerSummary } from 'components/parishioner-summary';
import { PaginationButtons } from 'components/tables/pagination-buttons';

const tableItems = [
   {
      avatar:
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      fullName: 'Nguyễn Văn A',
      holyName: 'Joseph',
      birthDate: '03/12/1998',
      gender: 'Nam',
      parishName: 'Thánh Tuân',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      fullName: 'Nguyễn Văn A',
      holyName: 'Joseph',
      birthDate: '03/12/1998',
      gender: 'Nam',
      parishName: 'Thánh Tuân',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      fullName: 'Nguyễn Văn A',
      holyName: 'Joseph',
      birthDate: '03/12/1998',
      gender: 'Nam',
      parishName: 'Thánh Tuân',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      fullName: 'Nguyễn Văn A',
      holyName: 'Joseph',
      birthDate: '03/12/1998',
      gender: 'Nam',
      parishName: 'Thánh Tuân',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      fullName: 'Nguyễn Văn A',
      holyName: 'Joseph',
      birthDate: '03/12/1998',
      gender: 'Nam',
      parishName: 'Thánh Tuân',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      fullName: 'Nguyễn Văn A',
      holyName: 'Joseph',
      birthDate: '03/12/1998',
      gender: 'Nam',
      parishName: 'Thánh Tuân',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      fullName: 'Nguyễn Văn A',
      holyName: 'Joseph',
      birthDate: '03/12/1998',
      gender: 'Nam',
      parishName: 'Thánh Tuân',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      fullName: 'Nguyễn Văn A',
      holyName: 'Joseph',
      birthDate: '03/12/1998',
      gender: 'Nam',
      parishName: 'Thánh Tuân',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      fullName: 'Nguyễn Văn A',
      holyName: 'Joseph',
      birthDate: '03/12/1998',
      gender: 'Nam',
      parishName: 'Thánh Tuân',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      fullName: 'Nguyễn Văn A',
      holyName: 'Joseph',
      birthDate: '03/12/1998',
      gender: 'Nam',
      parishName: 'Thánh Tuân',
   },
];

export interface ParishionerTableProps {}

export function ParishionerTable(props: ParishionerTableProps) {
   return (
      <>
         <div className="w-full shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
               <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                     <th className="py-3 px-4 text-center">#</th>
                     <th className="py-3 px-4">Họ tên</th>
                     <th className="py-3 px-4">Tên thánh</th>
                     <th className="py-3 px-4">Ngày sinh</th>
                     <th className="py-3 px-4">Giới tính</th>
                     <th className="py-3 px-4">Giáo họ</th>
                     <th className="py-3 px-4">Thao tác</th>
                  </tr>
               </thead>
               <tbody className="text-gray-600 divide-y">
                  {tableItems.map((item, idx) => (
                     <tr key={idx}>
                        <td className="px-4 py-2.5 whitespace-nowrap text-center">{idx + 1}</td>
                        <td className="px-4 py-2.5 whitespace-nowrap">
                           <ParishionerSummary avatar={item.avatar} fullName={item.fullName} />
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap">{item.holyName}</td>
                        <td className="px-4 py-2.5 whitespace-nowrap">{item.birthDate}</td>
                        <td className="px-4 py-2.5 whitespace-nowrap">{item.gender}</td>
                        <td className="px-4 py-2.5 whitespace-nowrap">{item.parishName}</td>
                        <td className="px-4 py-2.5 whitespace-nowrap">
                           <div className="flex gap-2">
                              <SButton
                                 type="secondary"
                                 size="small"
                                 icon={<SearchIcon className="w3 h-3" />}
                              >
                                 Chi tiết
                              </SButton>
                              <SButton
                                 type="secondary"
                                 size="small"
                                 icon={<EditIcon className="w3 h-3" />}
                              >
                                 Sửa
                              </SButton>
                              <SButton
                                 type="secondary"
                                 size="small"
                                 icon={<DeleteIcon className="w3 h-3" />}
                              >
                                 Xoá
                              </SButton>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="mt-6">
            <PaginationButtons />
         </div>
      </>
   );
}
