import { ID } from 'models';

export interface ParishionerBasicResponseDTO {
   id: ID;
   fullName: string;
   parishName: string;
   christianName: string;
   gender: number;
}

export interface PaginatedParishionerResponseDTO extends ParishionerBasicResponseDTO {}
