import { PageId, Pages } from 'constants/pages';
import { useAuth } from 'hooks';
import { Navigate } from 'react-router-dom';

const loginPage = Pages.get(PageId.login);

export interface ProtectedProps {
   children: JSX.Element;
}

export function Protected({ children }: ProtectedProps) {
   const isLoggedIn = useAuth();
   if (!isLoggedIn) {
      return <Navigate to={loginPage?.path || ''} replace />;
   }

   return children;
}
