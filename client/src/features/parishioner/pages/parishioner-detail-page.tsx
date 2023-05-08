import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Button, FormFieldLabel } from 'components/common';
import { DateField, InputField, RadioField, SelectField } from 'components/forms/fields';
import { ArrowLeftIcon, CheckIcon, PlusIcon, RefreshIcon } from 'components/icons';
import { ParishionerCard, ParishionerCardStyle } from 'components/parishioner-card';
import { Gender } from 'constants/gender';
import { PageId, Pages } from 'constants/pages';
import { MaleChristianNames, ParishNames, Paths } from 'constants/strings';
import dayjs from 'dayjs';
import {
   parishionerActions,
   selectParishionerDetail,
} from 'features/parishioner/parishioner-slice';
import { ParishionerCreateRequestDTO, ParishionerFormData } from 'models';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

export function ParishionerDetailPage() {
   const { id } = useParams<{ id?: string }>();
   const isCreating = useMemo(() => !id, [id]);
   const dispatch = useAppDispatch();
   const parishionerDetail = useAppSelector(selectParishionerDetail);

   const defaultValues: ParishionerFormData = useMemo(
      () => ({
         fullName: '',
         gender: Gender.Male.toString(),
         christianName: '',
         parishName: '',
      }),
      []
   );
   const { control, handleSubmit, reset, watch } = useForm<ParishionerFormData>({
      defaultValues,
   });
   const selectedGender = +watch('gender');

   const handleResetForm = () => {
      reset();
   };

   const handleFormSubmit = (formValues: ParishionerFormData) => {
      const { gender } = formValues;
      const data: ParishionerCreateRequestDTO = {
         fullName: formValues.fullName,
         dateOfBirth: formValues.dateOfBirth?.toDate().getTime(),
         gender: gender !== undefined ? +gender : undefined,
         christianName: formValues.christianName,
         address: formValues.address,
         note: formValues.note,
         parishName: formValues.parishName,
         dateOfBaptism: formValues.dateOfBaptism?.toDate().getTime(),
         dateOfFirstCommunion: formValues.dateOfFirstCommunion?.toDate().getTime(),
         dateOfConfirmation: formValues.dateOfConfirmation?.toDate().getTime(),
         dateOfOath: formValues.dateOfOath?.toDate().getTime(),
         dateOfWedding: formValues.dateOfWedding?.toDate().getTime(),
         dateOfHolyOrder: formValues.dateOfHolyOrder?.toDate().getTime(),
         dateOfDeath: formValues.dateOfDeath?.toDate().getTime(),
      };

      if (isCreating) {
         dispatch(
            parishionerActions.createParishioner({
               ...data,
            })
         );
      } else {
         dispatch(
            parishionerActions.updateParishioner({
               id: id!,
               ...data,
            })
         );
      }
   };

   useEffect(() => {
      if (!isCreating) {
         dispatch(parishionerActions.fetchParishionerDetail(id!));
      }
   }, [dispatch, id, isCreating]);

   useEffect(() => {
      if (parishionerDetail) {
         reset({
            fullName: parishionerDetail.fullName,
            gender: parishionerDetail.gender.toString(),
            dateOfBirth: dayjs(parishionerDetail.dateOfBirth),
            christianName: parishionerDetail.christianName,
            address: parishionerDetail.address,
            note: parishionerDetail.note,
            parishName: parishionerDetail.parishName,
            dateOfBaptism: dayjs(parishionerDetail.dateOfBaptism),
            dateOfFirstCommunion: dayjs(parishionerDetail.dateOfFirstCommunion),
            dateOfConfirmation: dayjs(parishionerDetail.dateOfConfirmation),
            dateOfOath: dayjs(parishionerDetail.dateOfOath),
            dateOfWedding: dayjs(parishionerDetail.dateOfWedding),
            dateOfHolyOrder: dayjs(parishionerDetail.dateOfHolyOrder),
            dateOfDeath: dayjs(parishionerDetail.dateOfDeath),
         });
      }
   }, [parishionerDetail, reset]);

   useEffect(() => {
      reset(defaultValues);
   }, [defaultValues, reset]);

   return (
      <div className="pt-2 pb-10">
         <div>
            <h3 className="pb-4 text-white text-xl font-bold sm:text-2xl space-x-3 flex items-center gap-2">
               <Link to={Pages.get(PageId.ParishionerList)?.path || ''}>
                  <ArrowLeftIcon className="w-7 h-7" />
               </Link>
               <span>{isCreating ? 'Giáo dân mới' : 'Thông tin giáo dân'}</span>
            </h3>
         </div>

         <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mt-20 p-2 pr-4 pt-6 card w-full bg-base-100 shadow-2xl rounded-lg border-t-8 border-primary">
               <div className="grid grid-cols-5 gap-2">
                  <div className="col-span-1">
                     <div className="flex flex-col items-center">
                        <div className="-mt-24 rounded-full bg-primary p-1.5 shadow-md">
                           <div className="avatar border-8 border-primary-light rounded-full">
                              <div className="w-36 rounded-full">
                                 <img
                                    src={
                                       selectedGender === Gender.Male
                                          ? Paths.defaultMaleAvatar
                                          : Paths.defaultFemaleAvatar
                                    }
                                    alt="parishioner-avatar"
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
                        <div className="space-y-7">
                           <InputField label="Họ tên" name="fullName" control={control} />

                           <DateField label="Ngày sinh" name="dateOfBirth" control={control} />

                           <div className="ml-0.5">
                              <RadioField
                                 label="Giới tính"
                                 name="gender"
                                 control={control}
                                 options={[
                                    {
                                       name: 'Nam',
                                       value: Gender.Male.toString(),
                                    },
                                    {
                                       name: 'Nữ',
                                       value: Gender.Female.toString(),
                                    },
                                 ]}
                              />
                           </div>

                           <SelectField
                              name="christianName"
                              label="Tên thánh"
                              options={MaleChristianNames.map((name) => ({ name, value: name }))}
                              control={control}
                           />

                           <InputField
                              label="Địa chỉ"
                              name="address"
                              control={control}
                              multiline={true}
                              rows={3}
                           />

                           <InputField
                              label="Ghi chú"
                              name="note"
                              control={control}
                              multiline={true}
                              rows={3}
                           />
                        </div>

                        <div className="-mt-4 space-y-3">
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
                                    <div key={idx} className="w-full">
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

                        <div className="space-y-7">
                           <SelectField
                              name="parishName"
                              label="Giáo họ"
                              options={ParishNames.map((name) => ({ name, value: name }))}
                              control={control}
                           />

                           <DateField label="Ngày rửa tội" name="dateOfBaptism" control={control} />

                           <DateField
                              label="Ngày rước lễ lần đầu"
                              name="dateOfFirstCommunion"
                              control={control}
                           />

                           <DateField
                              label="Ngày thêm sức"
                              name="dateOfConfirmation"
                              control={control}
                           />

                           <DateField label="Ngày tuyên hứa" name="dateOfOath" control={control} />

                           <DateField label="Ngày cưới" name="dateOfWedding" control={control} />

                           <DateField
                              label="Ngày truyền chức thánh"
                              name="dateOfHolyOrder"
                              control={control}
                           />

                           <DateField label="Ngày mất" name="dateOfDeath" control={control} />
                        </div>
                     </div>
                  </div>
               </div>
               <div className="pt-12 pb-4 pl-4 pr-3.5">
                  <div className="w-full grid grid-cols-3 gap-4">
                     <Button icon={<ArrowLeftIcon className="w-4 h-4" />} size="lg">
                        Trở lại
                     </Button>
                     <Button icon={<RefreshIcon />} size="lg" onClick={handleResetForm}>
                        Khôi phục
                     </Button>
                     <Button type="primary" icon={<CheckIcon />} size="lg">
                        {isCreating ? 'Hoàn tất' : 'Lưu thay đổi'}
                     </Button>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
}
