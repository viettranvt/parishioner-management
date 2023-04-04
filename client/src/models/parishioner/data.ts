import { Gender } from 'constants/gender';
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
