import { NotFound, Protected } from 'components/common';
import { AdminLayout } from 'components/layouts';
import { PageId, Pages } from 'constants/pages';
import { Navigate, Route, Routes } from 'react-router-dom';

const PrivatePages = Array.from(Pages.values()).filter((p) => p.isPrivate);
const LoginPage = Pages.get(PageId.Login);
const HomePage = Pages.get(PageId.ParishionerList);

function App() {
   return (
      <Routes>
         <Route path="/" element={<Navigate to={HomePage?.path ?? LoginPage?.path ?? '/'} />} />
         <Route path={LoginPage?.path} element={LoginPage?.element} />

         {PrivatePages.map((p) => (
            <Route
               key={p.path}
               path={p.path}
               element={
                  <Protected>
                     <AdminLayout>{p.element}</AdminLayout>
                  </Protected>
               }
            />
         ))}

         <Route path="*" element={<NotFound />} />
      </Routes>
   );
}

export default App;
