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
