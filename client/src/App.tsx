import { Backdrop, CircularProgress } from '@mui/material';
import { NotFound, Protected } from 'components/common';
import { AdminLayout } from 'components/layouts';
import { PageId, Pages } from 'constants/pages';
import { selectParishionerLoading } from 'features/parishioner/parishioner-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

const PrivatePages = Array.from(Pages.values()).filter((p) => p.isPrivate);
const LoginPage = Pages.get(PageId.Login);
const HomePage = Pages.get(PageId.ParishionerList);

function App() {
   const [loading, setLoading] = useState(false);
   const parishionerLoading = useSelector(selectParishionerLoading);

   useEffect(() => {
      setLoading(parishionerLoading);
   }, [parishionerLoading]);

   return (
      <>
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

         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
      </>
   );
}

export default App;
