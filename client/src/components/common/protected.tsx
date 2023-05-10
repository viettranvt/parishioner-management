import { PageId, Pages } from 'constants/pages';
import { useAuth } from 'hooks';
import { Navigate } from 'react-router-dom';

const LoginPage = Pages.get(PageId.Login);

export interface ProtectedProps {
   children: JSX.Element;
}

export function Protected({ children }: ProtectedProps) {
   const { isLoggedIn } = useAuth();
   if (!isLoggedIn) {
      return <Navigate to={LoginPage?.path || ''} replace />;
   }

   return children;
}
