import { SButton, SInput } from 'components/common';
import AppAssets from 'constants/app-assets';
import AppConfig from 'constants/app-config';
import * as React from 'react';

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
   return (
      <>
         <div className="mx-auto max-w-screen-xl px-3 py-24 lg:px-8">
            <div className="mx-auto max-w-lg">
               <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
                  {AppConfig.appName}
               </h1>

               <p className="mx-auto mt-4 max-w-md text-center text-gray-500">Giáo xứ Thánh Tuân</p>

               <img className="w-20 mx-auto mt-2 mb-4" src={AppAssets.logoPath} alt="logo" />

               <form className="py-8 px-3 lg:px-6 space-y-5">
                  <SInput label="Tên đăng nhập" />

                  <SInput type="password" label="Mật khẩu" />

                  <SButton>ĐĂNG NHẬP</SButton>
               </form>
            </div>
         </div>
      </>
   );
}
