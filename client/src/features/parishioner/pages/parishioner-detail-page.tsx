import { CheckOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { history } from 'app/store';
import { ParishionerSelectModal } from 'components';
import { Button as CustomButton, FormFieldLabel } from 'components/common';
import { DateField, InputField, RadioField, SelectField } from 'components/forms/fields';
import { ArrowLeftIcon, PlusIcon, RefreshIcon } from 'components/icons';
import { ParishionerCard, ParishionerCardStyle } from 'components/parishioner-card';
import { ApiParamField } from 'constants/api';
import { Gender } from 'constants/gender';
import { PageId, Pages } from 'constants/pages';
import {
   DateFormat,
   FemaleChristianNames,
   MaleChristianNames,
   ParishNames,
   Paths,
} from 'constants/strings';
import dayjs, { Dayjs } from 'dayjs';
import { AddParishionerButton } from 'features/parishioner/pages/add-parishioner-button';
import {
   parishionerActions,
   selectParishionerDetail,
   selectParishionerList,
   selectParishionerPagination,
} from 'features/parishioner/parishioner-slice';
import { cloneDeep } from 'lodash';
import {
   ID,
   Op,
   ParishionerBasicData,
   ParishionerCreateRequestDTO,
   ParishionerFormData,
} from 'models';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

enum RelativeType {
   Father,
   Mother,
   MarriagePartner,
   Guarantor,
   Children,
}

interface RemoveRelativeOptions {
   childrenId?: ID;
}

const schema = yup.object().shape({
   fullName: yup.string().required('Bắt buộc'),
   christianName: yup.string().required('Bắt buộc'),
   parishName: yup.string().required('Bắt buộc'),
});

export function ParishionerDetailPage() {
   const { id } = useParams<{ id?: string }>();
   const isCreating = useMemo(() => !id, [id]);
   const dispatch = useAppDispatch();
   const parishionerDetail = useAppSelector(selectParishionerDetail);
   const parishioners = useAppSelector(selectParishionerList);
   const parishionerPagination = useAppSelector(selectParishionerPagination);
   const [father, setFather] = useState<ParishionerBasicData>();
   const [mother, setMother] = useState<ParishionerBasicData>();
   const [marriagePartner, setMarriagePartner] = useState<ParishionerBasicData>();
   const [guarantor, setGuarantor] = useState<ParishionerBasicData>();
   const [children, setChildren] = useState<ParishionerBasicData[]>();
   const [selectedParishioners, setSelectedParishioner] = useState<ParishionerBasicData[]>([]);
   const [workingRelativeType, setWorkingRelativeType] = useState<RelativeType | undefined>();
   const [reselectedChild, setReselectedChild] = useState<ParishionerBasicData>();

   const defaultValues: ParishionerFormData = useMemo(
      () => ({
         fullName: '',
         gender: Gender.Male.toString(),
         christianName: '',
         parishName: '',
      }),
      []
   );
   const { control, handleSubmit, reset, watch, setValue } = useForm<ParishionerFormData>({
      defaultValues,
      resolver: yupResolver(schema),
   });
   const selectedGender = +watch('gender');
   const christianName = watch('christianName');

   const [openRelativeSelectModal, setOpenRelativeSelectModal] = useState<boolean>(false);

   const handleResetForm = () => {
      reset();
      setFather(parishionerDetail?.father);
      setMother(parishionerDetail?.mother);
      setMarriagePartner(parishionerDetail?.wifeOrHusband);
      setGuarantor(parishionerDetail?.guarantor);
      setChildren(parishionerDetail?.children);
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
         fatherId: father?.id,
         motherId: mother?.id,
         guarantorId: guarantor?.id,
         wifeOrHusbandId: marriagePartner?.id,
         childIds: children?.map((c) => c.id),
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

   const handleCloseRelativeSelectModal = () => {
      setOpenRelativeSelectModal(false);
      setWorkingRelativeType(undefined);
      setReselectedChild(undefined);
   };

   const handleSaveRelativeSelectModal = (data: ParishionerBasicData[]) => {
      const singleRelative = data[0];

      switch (workingRelativeType) {
         case RelativeType.Father:
            setFather(singleRelative);
            break;

         case RelativeType.Mother:
            setMother(singleRelative);
            break;

         case RelativeType.MarriagePartner:
            setMarriagePartner(singleRelative);
            break;

         case RelativeType.Guarantor:
            setGuarantor(singleRelative);
            break;

         case RelativeType.Children:
            setChildren((prev) => {
               if (!reselectedChild) {
                  return [...(prev ?? []), singleRelative];
               }

               const newChildren = cloneDeep(prev) ?? [];
               const index = (prev ?? []).findIndex((c) => c.id === reselectedChild.id);
               if (index > -1) {
                  newChildren[index] = singleRelative;
               }

               return newChildren;
            });
            break;

         default:
            break;
      }

      handleCloseRelativeSelectModal();
   };

   const handleAddRelative = (relativeType: RelativeType) => {
      switch (relativeType) {
         case RelativeType.Father:
            setSelectedParishioner(father ? [father] : []);
            break;

         case RelativeType.Mother:
            setSelectedParishioner(mother ? [mother] : []);
            break;

         case RelativeType.MarriagePartner:
            setSelectedParishioner(marriagePartner ? [marriagePartner] : []);
            break;

         case RelativeType.Guarantor:
            setSelectedParishioner(guarantor ? [guarantor] : []);
            break;

         case RelativeType.Children:
            setSelectedParishioner([]);
            break;

         default:
            break;
      }

      setWorkingRelativeType(relativeType);
      setOpenRelativeSelectModal(true);
   };

   const handleClickBtnAddRelative = (relativeType: RelativeType) => {
      handleAddRelative(relativeType);
   };

   const handleRemoveRelative = (relativeType: RelativeType, options?: RemoveRelativeOptions) => {
      switch (relativeType) {
         case RelativeType.Father:
            setFather(undefined);
            break;

         case RelativeType.Mother:
            setMother(undefined);
            break;

         case RelativeType.MarriagePartner:
            setMarriagePartner(undefined);
            break;

         case RelativeType.Guarantor:
            setGuarantor(undefined);
            break;

         case RelativeType.Children:
            setChildren((prev) => {
               const index = (prev ?? []).findIndex((c) => c.id === options?.childrenId);
               const newChildren = [...(prev ?? [])];
               if (index > -1) {
                  newChildren.splice(index, 1);
               }

               return newChildren;
            });
            break;

         default:
            break;
      }
   };

   const genParishionerTitle = useMemo(
      () =>
         (data: ParishionerBasicData): string =>
            [
               data.christianName,
               data.dateOfBirth ? moment(data.dateOfBirth).format(DateFormat) : undefined,
               data.parishName,
            ]
               .filter((e) => e)
               .join(' • '),
      []
   );

   const handleClickBtnAddChildren = () => {
      handleAddRelative(RelativeType.Children);
   };

   const handleReselectChild = (child: ParishionerBasicData) => {
      setReselectedChild(child);
      setWorkingRelativeType(RelativeType.Children);
      setSelectedParishioner([child]);
      setOpenRelativeSelectModal(true);
   };

   const mapDate = (date?: string): Dayjs | undefined => (date ? dayjs(date) : undefined);

   useEffect(() => {
      if (!isCreating) {
         dispatch(parishionerActions.fetchParishionerDetail(id!));
      }

      return () => {
         dispatch(parishionerActions.clearParishionerDetail());
      };
   }, [dispatch, id, isCreating]);

   useEffect(() => {
      if (parishionerDetail) {
         reset({
            fullName: parishionerDetail.fullName,
            gender: parishionerDetail.gender.toString(),
            dateOfBirth: mapDate(parishionerDetail.dateOfBirth),
            christianName: parishionerDetail.christianName,
            address: parishionerDetail.address,
            note: parishionerDetail.note,
            parishName: parishionerDetail.parishName,
            dateOfBaptism: mapDate(parishionerDetail.dateOfBaptism),
            dateOfFirstCommunion: mapDate(parishionerDetail.dateOfFirstCommunion),
            dateOfConfirmation: mapDate(parishionerDetail.dateOfConfirmation),
            dateOfOath: mapDate(parishionerDetail.dateOfOath),
            dateOfWedding: mapDate(parishionerDetail.dateOfWedding),
            dateOfHolyOrder: mapDate(parishionerDetail.dateOfHolyOrder),
            dateOfDeath: mapDate(parishionerDetail.dateOfDeath),
         });

         setFather(parishionerDetail.father);
         setMother(parishionerDetail.mother);
         setGuarantor(parishionerDetail.guarantor);
         setMarriagePartner(parishionerDetail.wifeOrHusband);
         setChildren(parishionerDetail.children);
      }
   }, [dispatch, parishionerDetail, reset]);

   useEffect(() => {
      reset(defaultValues);
   }, [defaultValues, reset]);

   useEffect(() => {
      dispatch(parishionerActions.fetchParishionerOptions({ page: 1, limit: 10 }));
   }, [dispatch]);

   useEffect(() => {
      if (
         (selectedGender === Gender.Male && !MaleChristianNames.includes(christianName)) ||
         (selectedGender === Gender.Female && !FemaleChristianNames.includes(christianName))
      ) {
         setValue('christianName', '');
      }
   }, [christianName, selectedGender, setValue]);

   return (
      <>
         <div className="pt-2 pb-10">
            <div>
               <h3 className="flex items-center gap-2 pb-4 space-x-3 text-xl font-bold text-white sm:text-2xl">
                  <Link to={Pages.get(PageId.ParishionerList)?.path || ''}>
                     <ArrowLeftIcon className="w-7 h-7" />
                  </Link>
                  <span>{isCreating ? 'Giáo dân mới' : 'Thông tin giáo dân'}</span>
               </h3>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
               <div className="w-full p-2 pt-6 pr-4 mt-20 border-t-8 rounded-lg shadow-2xl card bg-base-100 border-primary">
                  <div className="grid grid-cols-5 gap-2">
                     <div className="col-span-1">
                        <div className="flex flex-col items-center">
                           <div className="-mt-24 rounded-full bg-primary p-1.5 shadow-md">
                              <div className="border-8 rounded-full avatar border-primary-light">
                                 <div className="rounded-full w-36">
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

                     <div className="col-span-4 pt-2 pb-4 pr-4">
                        <div className="grid grid-cols-3 gap-12">
                           <div className="space-y-7">
                              <InputField
                                 label="Họ tên"
                                 name="fullName"
                                 control={control}
                                 showAsterisk
                              />

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
                                 options={(selectedGender === Gender.Male
                                    ? MaleChristianNames
                                    : FemaleChristianNames
                                 ).map((name) => ({ name, value: name }))}
                                 control={control}
                                 showAsterisk
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
                                 {father ? (
                                    <ParishionerCard
                                       id={father.id}
                                       fullName={father.fullName}
                                       title={genParishionerTitle(father)}
                                       style={ParishionerCardStyle.actions}
                                       onReselect={() => handleAddRelative(RelativeType.Father)}
                                       onRemove={() => handleRemoveRelative(RelativeType.Father)}
                                    />
                                 ) : (
                                    <AddParishionerButton
                                       onClick={() =>
                                          handleClickBtnAddRelative(RelativeType.Father)
                                       }
                                    />
                                 )}
                              </div>
                              <div>
                                 <FormFieldLabel>Mẹ</FormFieldLabel>
                                 {mother ? (
                                    <ParishionerCard
                                       id={mother.id}
                                       fullName={mother.fullName}
                                       title={genParishionerTitle(mother)}
                                       style={ParishionerCardStyle.actions}
                                       onReselect={() => handleAddRelative(RelativeType.Mother)}
                                       onRemove={() => handleRemoveRelative(RelativeType.Mother)}
                                    />
                                 ) : (
                                    <AddParishionerButton
                                       onClick={() =>
                                          handleClickBtnAddRelative(RelativeType.Mother)
                                       }
                                    />
                                 )}
                              </div>
                              <div>
                                 <FormFieldLabel>Chồng/Vợ</FormFieldLabel>
                                 {marriagePartner ? (
                                    <ParishionerCard
                                       id={marriagePartner.id}
                                       fullName={marriagePartner.fullName}
                                       title={genParishionerTitle(marriagePartner)}
                                       style={ParishionerCardStyle.actions}
                                       onReselect={() =>
                                          handleAddRelative(RelativeType.MarriagePartner)
                                       }
                                       onRemove={() =>
                                          handleRemoveRelative(RelativeType.MarriagePartner)
                                       }
                                    />
                                 ) : (
                                    <AddParishionerButton
                                       onClick={() =>
                                          handleClickBtnAddRelative(RelativeType.MarriagePartner)
                                       }
                                    />
                                 )}
                              </div>
                              <div>
                                 <FormFieldLabel>Người bảo lãnh</FormFieldLabel>
                                 {guarantor ? (
                                    <ParishionerCard
                                       id={guarantor.id}
                                       fullName={guarantor.fullName}
                                       title={genParishionerTitle(guarantor)}
                                       style={ParishionerCardStyle.actions}
                                       onReselect={() => handleAddRelative(RelativeType.Guarantor)}
                                       onRemove={() => handleRemoveRelative(RelativeType.Guarantor)}
                                    />
                                 ) : (
                                    <AddParishionerButton
                                       onClick={() =>
                                          handleClickBtnAddRelative(RelativeType.Guarantor)
                                       }
                                    />
                                 )}
                              </div>
                              <div className="pt-2">
                                 <div className="flex justify-between">
                                    <FormFieldLabel>Con ({children?.length ?? 0})</FormFieldLabel>
                                    {Boolean(children?.length) && (
                                       <CustomButton
                                          icon={<PlusIcon className="w-4 h-4" />}
                                          shape="circle"
                                          size="sm"
                                          onClick={handleClickBtnAddChildren}
                                       />
                                    )}
                                 </div>
                                 <div className="mt-2 space-y-2">
                                    {children?.map((c) => (
                                       <ParishionerCard
                                          key={c.id}
                                          id={c.id}
                                          fullName={c.fullName}
                                          title={genParishionerTitle(c)}
                                          style={ParishionerCardStyle.actions}
                                          onReselect={() => handleReselectChild(c)}
                                          onRemove={() =>
                                             handleRemoveRelative(RelativeType.Children, {
                                                childrenId: c.id,
                                             })
                                          }
                                       />
                                    ))}
                                 </div>
                                 {/* {(children?.length ?? 0) > 2 && (
                                    <div className="mt-3">
                                       <Button>Xem thêm</Button>
                                    </div>
                                 )} */}
                                 {!Boolean(children?.length) && (
                                    <AddParishionerButton onClick={handleClickBtnAddChildren} />
                                 )}
                              </div>
                           </div>

                           <div className="space-y-7">
                              <SelectField
                                 name="parishName"
                                 label="Giáo họ"
                                 options={ParishNames.map((name) => ({ name, value: name }))}
                                 control={control}
                                 showAsterisk
                              />

                              <DateField
                                 label="Ngày rửa tội"
                                 name="dateOfBaptism"
                                 control={control}
                              />

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

                              <DateField
                                 label="Ngày tuyên hứa"
                                 name="dateOfOath"
                                 control={control}
                              />

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
                     <div className="grid w-full grid-cols-3 gap-4">
                        <Button
                           startIcon={<ArrowLeftIcon className="w-4 h-4" />}
                           variant="outlined"
                           onClick={() => {
                              history.back();
                           }}
                        >
                           Trở lại
                        </Button>
                        <Button
                           startIcon={<RefreshIcon />}
                           onClick={handleResetForm}
                           variant="outlined"
                        >
                           Khôi phục
                        </Button>
                        <Button variant="contained" startIcon={<CheckOutlined />} type="submit">
                           {isCreating ? 'Hoàn tất' : 'Lưu thay đổi'}
                        </Button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
         <ParishionerSelectModal
            selectedOptions={selectedParishioners}
            options={parishioners}
            open={openRelativeSelectModal}
            onClose={handleCloseRelativeSelectModal}
            onSave={handleSaveRelativeSelectModal}
            totalOptions={parishionerPagination.total}
            fetchOptions={() => {
               dispatch(
                  parishionerActions.fetchParishionerOptions({
                     page: parishionerPagination.page + 1,
                     limit: parishionerPagination.limit,
                  })
               );
            }}
            onSearch={(term) => {
               dispatch(
                  parishionerActions.fetchParishionerList({
                     page: 1,
                     limit: parishionerPagination.limit,
                     filters: term
                        ? [{ field: ApiParamField.fullName, op: Op.Like, val: [term] }]
                        : undefined,
                  })
               );
            }}
         />
      </>
   );
}
