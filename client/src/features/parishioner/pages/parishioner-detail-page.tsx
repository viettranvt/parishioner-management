import { ParishionerCard } from 'components';
import {
   Button,
   DatePicker,
   Divider,
   FormFieldLabel,
   Input,
   Radio,
   Select,
   TextArea,
} from 'components/common';
import { ArrowLeftIcon, CheckIcon, PlusIcon, RefreshIcon } from 'components/icons';

export default function ParishionerDetailPage() {
   // const { id } = useParams();

   return (
      <div className="pb-10">
         <div>
            <h3 className="pb-2 text-primary text-xl font-bold sm:text-2xl space-x-3">
               <span>Thông tin giáo dân</span>
               <span className="text-gray-300">#1</span>
            </h3>
         </div>

         <div className="mt-20 p-2 pr-4 card w-full bg-base-100 shadow-2xl rounded-lg border-t-8 border-primary">
            <div className="grid grid-cols-5 gap-2">
               <div className="col-span-1">
                  <div className="flex flex-col items-center">
                     <div className="-mt-20 rounded-full bg-primary p-1.5">
                        <div className="avatar border-8 border-primary-light rounded-full">
                           <div className="w-36 rounded-full">
                              <img
                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                 alt=""
                              />
                           </div>
                        </div>
                     </div>
                     <div className="mt-1">
                        <FormFieldLabel>Ảnh đại diện</FormFieldLabel>
                     </div>
                  </div>
               </div>

               <div className="pt-2 pb-4 pr-4 col-span-4">
                  <div className="grid grid-cols-3 gap-12">
                     <div className="space-y-3">
                        <Input size="small" label="Họ tên" />

                        <Input size="small" label="Tên thánh" />

                        <DatePicker size="small" label="Ngày sinh" />

                        <Radio
                           size="small"
                           label="Giới tính"
                           options={[
                              { label: 'Nam', value: 1 },
                              { label: 'Nữ', value: 2 },
                           ]}
                        />

                        <div>
                           <FormFieldLabel>Địa chỉ</FormFieldLabel>
                           <div className="flex flex-col gap-3">
                              <Select
                                 size="small"
                                 placeholder="Chọn Tỉnh/Thành phố"
                                 options={[
                                    { label: 'Tây Ninh', value: 1 },
                                    { label: 'Bình Dương', value: 2 },
                                 ]}
                              />
                              <Select
                                 size="small"
                                 placeholder="Chọn Quận/Huyện"
                                 options={[
                                    { label: 'Quận 1', value: 1 },
                                    { label: 'Quận Bình Thạnh', value: 2 },
                                 ]}
                              />
                              <Select
                                 size="small"
                                 placeholder="Chọn Phường/Xã"
                                 options={[
                                    { label: 'Phường 1', value: 1 },
                                    { label: 'Phường 2', value: 2 },
                                 ]}
                              />
                              <Input size="small" placeholder="Nhập số nhà" />
                           </div>
                        </div>

                        <div>
                           <div className="pt-2">
                              <TextArea className="h-32" size="small" label="Ghi chú" />
                           </div>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div>
                           <FormFieldLabel>Cha</FormFieldLabel>
                           <ParishionerCard
                              fullName="Trần Văn B"
                              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              title="Juse • 17/03/1975"
                              mode="actions"
                           />
                        </div>
                        <div>
                           <FormFieldLabel>Mẹ</FormFieldLabel>
                           <ParishionerCard
                              fullName="Vũ Thị C"
                              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              title="Maria • 17/03/1975"
                              mode="actions"
                           />
                        </div>
                        <div>
                           <FormFieldLabel>Chồng/Vợ</FormFieldLabel>
                           <ParishionerCard
                              fullName="Vũ Thị E"
                              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              title="Maria • 17/03/1975"
                              mode="actions"
                           />
                        </div>
                        <div>
                           <FormFieldLabel>Người bảo lãnh</FormFieldLabel>
                           <Button icon={<PlusIcon className="w-4 h-4" />}>Thêm</Button>
                        </div>
                        <div className="pt-2">
                           <div className="flex justify-between items-center">
                              <FormFieldLabel>Con (3)</FormFieldLabel>
                              <Button
                                 icon={<PlusIcon className="w-5 h-5" />}
                                 shape="circle"
                                 size="small"
                                 type="primary"
                                 outlined
                              />
                           </div>
                           <div className="max-h-64 mt-2 p-2 pt-4 pl-5 border border-gray-200 rounded-xl space-y-4 overflow-y-auto">
                              {Array.from(Array(8).keys()).map((_, idx) => (
                                 <div key={idx} className="indicator w-full">
                                    <span className="indicator-item indicator-start badge badge-primary">
                                       {idx + 1}
                                    </span>
                                    <div className="w-full">
                                       <ParishionerCard
                                          fullName={`Nguyễn Thị D${idx + 1}`}
                                          avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                          title="Maria • 17/03/2011"
                                          mode="actions"
                                       />
                                    </div>
                                 </div>
                              ))}
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
            <div className="pt-12 pb-4 px-4">
               <div className="w-full grid grid-cols-3 gap-4">
                  <Button icon={<ArrowLeftIcon />} size="large">
                     Trở lại
                  </Button>
                  <Button icon={<RefreshIcon />} size="large">
                     Khôi phục
                  </Button>
                  <Button type="primary" icon={<CheckIcon />} size="large">
                     Lưu thay đổi
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
