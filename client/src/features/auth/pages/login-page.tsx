import AppConfig from 'constants/app-config';
import * as React from 'react';

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
   return (
      <>
         <div className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
               <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                  {AppConfig.appName}
               </h1>

               <p className="mx-auto mt-4 max-w-md text-center text-gray-500">Giáo xứ Thánh Tuân</p>

               <form action="" className="mt-12 mb-6 space-y-6 rounded-lg p-8 shadow-2xl">
                  <p className="mb-6 text-lg font-medium text-center">
                     ĐĂNG NHẬP TÀI KHOẢN QUẢN TRỊ VIÊN
                  </p>

                  <div>
                     <label className="font-medium">Tên đăng nhập</label>
                     <input
                        required
                        placeholder="Nhập tên đăng nhập"
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                     />
                  </div>
                  <div>
                     <label className="font-medium">Mật khẩu</label>
                     <input
                        type="password"
                        required
                        placeholder="Nhập mật khẩu"
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                     />
                  </div>
                  <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                     ĐĂNG NHẬP
                  </button>
               </form>
            </div>
         </div>
      </>
   );
}
