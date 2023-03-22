export interface AuthLoginFormData {
   username: string;
   password: string;
}

export interface AuthUserData {
   id: number | string;
   username: string;
}

export interface AuthLoginData {
   accessToken: string;
   refreshToken: string;
   user: AuthUserData;
}
