import { ParishionerCard, ParishionerCardStyle } from 'components';
import {
   Button,
   DatePicker,
   FormFieldLabel,
   Input,
   Radio,
   Select,
   TextArea,
} from 'components/common';
import { ArrowLeftIcon, CheckIcon, PlusIcon, RefreshIcon } from 'components/icons';
import { PageId, Pages } from 'constants/pages';
import { Link } from 'react-router-dom';

export default function ParishionerDetailPage() {
   // const { id } = useParams();

   return (
      <div className="pt-2 pb-10">
         <div>
            <h3 className="pb-2 text-white text-xl font-bold sm:text-2xl space-x-3 flex items-center gap-2">
               <Link to={Pages.get(PageId.parishionerList)?.path || ''}>
                  <ArrowLeftIcon className="w-7 h-7" />
               </Link>
               <span>Thông tin giáo dân</span>
            </h3>
         </div>

         <div className="mt-20 p-2 pr-4 card w-full bg-base-100 shadow-2xl rounded-lg border-t-8 border-primary">
            <div className="grid grid-cols-5 gap-2">
               <div className="col-span-1">
                  <div className="flex flex-col items-center">
                     <div className="-mt-20 rounded-full bg-primary p-1.5 shadow-md">
                        <div className="avatar border-8 border-primary-light rounded-full">
                           <div className="w-36 rounded-full">
                              <img
                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                 alt=""
                              />
                           </div>
                        </div>
                     </div>
                     <div className="mt-2">
                        <FormFieldLabel>Ảnh đại diện</FormFieldLabel>
                     </div>
                  </div>
               </div>

               <div className="pt-2 pb-4 pr-4 col-span-4">
                  <div className="grid grid-cols-3 gap-12">
                     <div className="space-y-3">
                        <Input size="small" label="Họ tên" required />

                        <Input size="small" label="Tên thánh" required />

                        <DatePicker size="small" label="Ngày sinh" />

                        <Radio
                           size="small"
                           label="Giới tính"
                           options={[
                              { label: 'Nam', value: 1 },
                              { label: 'Nữ', value: 2 },
                           ]}
                        />

                        <TextArea size="small" label="Địa chỉ" />

                        <TextArea className="h-36" size="small" label="Ghi chú" />
                     </div>
                     <div className="space-y-3">
                        <div>
                           <FormFieldLabel>Cha</FormFieldLabel>
                           <ParishionerCard
                              fullName="Trần Văn B"
                              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              title="Juse • 17/03/1975"
                              style={ParishionerCardStyle.actions}
                           />
                        </div>
                        <div>
                           <FormFieldLabel>Mẹ</FormFieldLabel>
                           <ParishionerCard
                              fullName="Vũ Thị C"
                              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              title="Maria • 17/03/1975"
                              style={ParishionerCardStyle.actions}
                           />
                        </div>
                        <div>
                           <FormFieldLabel>Chồng/Vợ</FormFieldLabel>
                           <ParishionerCard
                              fullName="Vũ Thị E"
                              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              title="Maria • 17/03/1975"
                              style={ParishionerCardStyle.actions}
                           />
                        </div>
                        <div>
                           <FormFieldLabel>Người bảo lãnh</FormFieldLabel>
                           <Button icon={<PlusIcon className="w-4 h-4" />}>Thêm</Button>
                        </div>
                        <div className="pt-2">
                           <div className="flex justify-between">
                              <FormFieldLabel>Con (2)</FormFieldLabel>
                              <Button
                                 icon={<PlusIcon className="w-4 h-4" />}
                                 shape="circle"
                                 size="sm"
                              />
                           </div>
                           <div className="mt-2 space-y-2">
                              {Array.from(Array(2).keys()).map((_, idx) => (
                                 <div className="w-full">
                                    <ParishionerCard
                                       fullName={`Nguyễn Thị D${idx + 1}`}
                                       avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                       title="Maria • 17/03/2011"
                                       style={ParishionerCardStyle.actions}
                                    />
                                 </div>
                              ))}
                           </div>
                           <div className="mt-3">
                              <Button>Xem thêm</Button>
                           </div>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <Select
                           size="small"
                           label="Giáo họ"
                           options={[{ label: 'Thánh Tuân', value: 1 }]}
                        />
                        <DatePicker size="small" label="Ngày rửa tội" />
                        <DatePicker size="small" label="Ngày rước lễ lần đầu" />
                        <DatePicker size="small" label="Ngày thêm sức" />
                        <DatePicker size="small" label="Ngày cưới" />
                        <DatePicker size="small" label="Ngày tuyên hứa" />
                        <DatePicker size="small" label="Ngày truyền chức thánh" />
                        <DatePicker size="small" label="Ngày mất" />
                     </div>
                  </div>
               </div>
            </div>
            <div className="pt-12 pb-4 pl-4 pr-3.5">
               <div className="w-full grid grid-cols-3 gap-4">
                  <Button icon={<ArrowLeftIcon className="w-4 h-4" />} size="lg">
                     Trở lại
                  </Button>
                  <Button icon={<RefreshIcon />} size="lg">
                     Khôi phục
                  </Button>
                  <Button type="primary" icon={<CheckIcon />} size="lg">
                     Lưu thay đổi
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
