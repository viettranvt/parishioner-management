import { useAppDispatch } from 'app/hooks';
import { Button, Input } from 'components/common';
import AppAssets from 'constants/app-assets';
import AppConfig from 'constants/app-config';
import { authActions } from 'features/auth/auth-slice';

export default function LoginPage() {
   const dispatch = useAppDispatch();

   const onBtnLoginClicked = () => {
      // TODO: get username & password from login form
      dispatch(
         authActions.login({
            username: '',
            password: '',
         })
      );
   };

   return (
      <div
         className="h-screen relative"
         style={{
            backgroundColor: '#ffffff',
            backgroundImage:
               "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='2'%3E%3Cpath transform='translate(0 0)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='4' transform='rotate(0 800 450)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(0 0)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='4'%3E%3Cpath transform='translate(0 0)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='8' transform='rotate(0 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='rotate(0 1400 132)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
         }}
      >
         <div className="card bg-base-100 shadow-2xl mx-auto xl:max-w-lg h-full rounded-none flex flex-row items-center">
            <div className="mx-auto" style={{ marginTop: '-30%' }}>
               <h1 className="text-center text-2xl font-bold text-primary sm:text-2xl">
                  {AppConfig.appName}
               </h1>

               {/* <p className="mx-auto mt-3 max-w-lg text-center text-gray-500">Giáo xứ Thánh Tuân</p> */}

               <img
                  className="w-44 mx-auto"
                  src={AppAssets.logoPath}
                  alt="logo"
                  style={{ marginTop: '-2%' }}
               />

               <div className="space-y-4">
                  <Input label="Tên đăng nhập" placeholder="Nhập tên đăng nhập" autofocus />

                  <Input type="password" label="Mật khẩu" placeholder="Nhập mật khẩu" />

                  <div className="pt-3">
                     <Button
                        onClick={onBtnLoginClicked}
                        type="primary"
                        className="bg-gradient-to-r from-primary-dark to-primary"
                        size="lg"
                        icon={
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                              />
                           </svg>
                        }
                     >
                        ĐĂNG NHẬP
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
