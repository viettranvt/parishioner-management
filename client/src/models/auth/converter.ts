import { AuthLoginFormData, AuthLoginRequestDTO } from 'models/auth';

export const createLoginPayload = (data: AuthLoginFormData): AuthLoginRequestDTO => ({
   username: data.username,
   password: data.password,
});
