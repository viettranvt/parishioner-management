import { Gender } from 'constants/gender';
import { Dayjs } from 'dayjs';
import { DateRange, ID } from 'models';

export interface ParishionerBasicData {
   id: ID;
   fullName: string;
   parishName: string;
   christianName: string;
   gender: Gender;
   dateOfBirth?: string;
}

export interface ParishionerFilterFormData {
   fullName?: string;
   christianNames?: string[];
   baptismDateRange?: DateRange;
   firstCommunicationDateRange?: DateRange;
   confirmationDateRange?: DateRange;
   weddingDateRange?: DateRange;
}

export interface ParishionerFormData {
   fullName: string;
   christianName: string;
   dateOfBirth: Dayjs;
   parishName: string;
   gender: Gender;
   address?: string;
   note?: string;
   dateOfBaptism?: Dayjs;
   dateOfFirstCommunication?: Dayjs;
   dateOfConfirmation?: Dayjs;
   dateOfOath?: Dayjs;
   dateOfWedding?: Dayjs;
   dateOfHolyOrder?: Dayjs;
   dateOfDeath?: Dayjs;
}

export interface ParishionerDetailData extends ParishionerBasicData {
   address?: string;
   note?: string;
   dateOfBaptism?: string;
   dateOfFirstCommunication?: string;
   dateOfConfirmation?: string;
   dateOfOath?: string;
   dateOfWedding?: string;
   dateOfHolyOrder?: string;
   dateOfDeath?: string;
}
