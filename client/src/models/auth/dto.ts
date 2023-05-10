import { ID } from 'models/common';

export interface AuthLoginRequestDTO {
   username: string;
   password: string;
}

export interface AuthLoginResponseDTO {
   token: string;
   refreshToken: string;
   authInfo: {
      id: ID;
      username: string;
   };
}
