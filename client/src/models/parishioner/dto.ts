import { ID } from 'models';

export interface ParishionerBasicResponseDTO {
   id: ID;
   fullName: string;
   parishName: string;
   christianName: string;
   gender: number;
   dateOfBirth?: string;
}

export interface PaginatedParishionerResponseDTO extends ParishionerBasicResponseDTO {}

export interface ParishionerDetailResponseDTO extends ParishionerBasicResponseDTO {
   address?: string;
   note?: string;
   dateOfBaptism?: string;
   dateOfFirstCommunion?: string;
   dateOfConfirmation?: string;
   dateOfOath?: string;
   dateOfWedding?: string;
   dateOfHolyOrder?: string;
   dateOfDeath?: string;
   guarantor?: ParishionerBasicResponseDTO;
}

export interface ParishionerCreateRequestDTO {
   fullName: string;
   dateOfBirth?: number; // milliseconds
   gender?: number;
   christianName?: string;
   address?: string;
   note?: string;
   parishName?: string;
   dateOfBaptism?: number; // milliseconds
   dateOfFirstCommunion?: number; // milliseconds
   dateOfConfirmation?: number; // milliseconds
   dateOfOath?: number; // milliseconds
   dateOfWedding?: number; // milliseconds
   dateOfHolyOrder?: number; // milliseconds
   dateOfDeath?: number; // milliseconds
   guarantorId?: ID;
}

export interface ParishionerUpdateRequestDTO {
   id: ID;
   fullName: string;
   dateOfBirth?: number; // milliseconds
   gender?: number;
   christianName?: string;
   address?: string;
   note?: string;
   parishName?: string;
   dateOfBaptism?: number; // milliseconds
   dateOfFirstCommunion?: number; // milliseconds
   dateOfConfirmation?: number; // milliseconds
   dateOfOath?: number; // milliseconds
   dateOfWedding?: number; // milliseconds
   dateOfHolyOrder?: number; // milliseconds
   dateOfDeath?: number; // milliseconds
   guarantorId?: ID;
}
