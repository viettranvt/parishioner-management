import { useAppSelector } from 'app/hooks';

export interface AuthHookData {
   isLoggedIn: boolean;
}

export const useAuth = (): AuthHookData => {
   const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

   return { isLoggedIn };
};
