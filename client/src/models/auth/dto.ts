export interface AuthLoginRequestDTO {
   username: string;
   password: string;
}

export interface AuthLoginResponseDTO {
   token: string;
   refreshToken: string;
   authInfo: {
      id: number;
      username: string;
   };
}
