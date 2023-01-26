import { NotFound, Protected } from 'components/common';
import { AdminLayout } from 'components/layouts';
import { PageId, Pages } from 'constants/pages';
import { Navigate, Route, Routes } from 'react-router-dom';

const privatePages = Array.from(Pages.values()).filter((p) => p.isPrivate);
const loginPage = Pages.get(PageId.login);
const homePage = Pages.get(PageId.parishionerList);

function App() {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Navigate to={homePage?.path ?? loginPage?.path ?? '/'} />} />
            <Route path={loginPage?.path} element={loginPage?.element} />

            {privatePages.map((p) => (
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
      </div>
   );
}

export default App;
