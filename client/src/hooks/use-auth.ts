import { useAppSelector } from 'app/hooks';
import { LocalStorageItem } from 'constants/local-storage';
import { AuthUserData } from 'models';

export interface AuthHookData {
   isLoggedIn: boolean;
   currentUser?: AuthUserData;
}

export const useAuth = (): AuthHookData => {
   const isLoggedIn = useAppSelector(
      (state) =>
         state.auth.isLoggedIn || Boolean(localStorage.getItem(LocalStorageItem.accessToken))
   );

   const currentUser = useAppSelector((state) => state.auth.currentUser);

   return { isLoggedIn, currentUser };
};
