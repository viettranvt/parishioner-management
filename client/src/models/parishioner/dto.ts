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
   dateOfBaptism?: number;
   dateOfFirstCommunion?: number;
   dateOfConfirmation?: number;
   dateOfOath?: number;
   dateOfWedding?: number;
   dateOfHolyOrder?: number;
   dateOfDeath?: number;
}
