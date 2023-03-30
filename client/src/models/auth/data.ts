import { ID } from 'models/common';

export interface AuthLoginFormData {
   username: string;
   password: string;
}

export interface AuthUserData {
   id: ID;
   username: string;
}

export interface AuthLoginData {
   accessToken: string;
   refreshToken: string;
   user: AuthUserData;
}
