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
   dateOfFirstCommunication?: string;
   dateOfConfirmation?: string;
   dateOfOath?: string;
   dateOfWedding?: string;
   dateOfHolyOrder?: string;
   dateOfDeath?: string;
}
