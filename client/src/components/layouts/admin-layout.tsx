import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import AppAssets from 'constants/app-assets';
import { PageConfig, Pages } from 'constants/pages';
import { Paths } from 'constants/strings';
import { authActions } from 'features/auth/auth-slice';
import { useActiveLocation } from 'hooks';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const navbarItems = Array.from(Pages.values()).filter((p) => p.isPrivate && p.showOnNavbar);

enum UserNavigationType {
   SignOut,
}

const userNavigation = [{ name: 'Đăng xuất', type: UserNavigationType.SignOut }];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export interface AdminLayoutProps {
   children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
   const activeLocation = useActiveLocation();
   const [activeNavItem, setActiveNavItem] = useState<PageConfig>();
   const dispatch = useDispatch();

   const handleClickUserNavigation = (type: UserNavigationType) => {
      switch (type) {
         case UserNavigationType.SignOut:
            dispatch(authActions.logout());
            break;

         default:
            break;
      }
   };

   useEffect(() => {
      let relatedPage: PageConfig | undefined;
      if (activeLocation?.relatedPageId) {
         relatedPage = Pages.get(activeLocation.relatedPageId);
      }

      setActiveNavItem(relatedPage || activeLocation);
   }, [activeLocation]);

   return (
      <>
         <div className="min-h-full">
            <Disclosure as="nav" className="bg-white shadow-xl">
               {({ open }) => (
                  <>
                     <div className="px-4 mx-auto max-w-7xl sm:px-6">
                        <div className="flex items-center justify-between h-16">
                           <div className="flex items-center">
                              <div className="flex-shrink-0">
                                 <div className="-ml-2">
                                    <Link to="/">
                                       <img
                                          className="w-16 h-16"
                                          src={AppAssets.logoPath}
                                          alt="App logo"
                                          width="100%"
                                          height="100%"
                                       />
                                    </Link>
                                 </div>
                              </div>
                              <div className="hidden md:block">
                                 <div className="flex items-baseline ml-10 space-x-4">
                                    {navbarItems.map((item) => {
                                       const active = activeNavItem?.id === item.id;
                                       return (
                                          <Link
                                             key={item.id}
                                             to={item.path}
                                             className={classNames(
                                                active
                                                   ? 'bg-primary-light text-primary font-bold'
                                                   : 'text-gray-600 font-bold hover:bg-primary-light hover:text-primary',
                                                'px-3 py-2 rounded-md text-sm font-medium duration-150'
                                             )}
                                             aria-current={active ? 'page' : undefined}
                                          >
                                             {item.navTitle}
                                          </Link>
                                       );
                                    })}
                                 </div>
                              </div>
                           </div>
                           <div className="hidden md:block">
                              <div className="flex items-center ml-4 md:ml-6">
                                 <button
                                    type="button"
                                    className="p-1 rounded-full bg-primary-light text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                 >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                                 </button>

                                 {/* Profile dropdown */}
                                 <Menu as="div" className="relative z-50 ml-3">
                                    <div>
                                       <Menu.Button className="flex items-center max-w-xs text-sm rounded-full bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                                          <span className="sr-only">Open user menu</span>
                                          <img
                                             className="w-8 h-8 rounded-full"
                                             src={Paths.defaultMaleAvatar}
                                             alt=""
                                          />
                                       </Menu.Button>
                                    </div>
                                    <Transition
                                       as={Fragment}
                                       enter="transition ease-out duration-100"
                                       enterFrom="transform opacity-0 scale-95"
                                       enterTo="transform opacity-100 scale-100"
                                       leave="transition ease-in duration-75"
                                       leaveFrom="transform opacity-100 scale-100"
                                       leaveTo="transform opacity-0 scale-95"
                                    >
                                       <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          {userNavigation.map((item) => (
                                             <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                   <span
                                                      onClick={() =>
                                                         handleClickUserNavigation(item.type)
                                                      }
                                                      className={classNames(
                                                         active ? 'bg-gray-100' : '',
                                                         'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                      )}
                                                   >
                                                      {item.name}
                                                   </span>
                                                )}
                                             </Menu.Item>
                                          ))}
                                       </Menu.Items>
                                    </Transition>
                                 </Menu>
                              </div>
                           </div>
                           <div className="flex -mr-2 md:hidden">
                              {/* Mobile menu button */}
                              <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                 <span className="sr-only">Open main menu</span>
                                 {open ? (
                                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                                 ) : (
                                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                                 )}
                              </Disclosure.Button>
                           </div>
                        </div>
                     </div>

                     <Disclosure.Panel className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                           {navbarItems.map((item) => {
                              const active = item.id === activeNavItem?.id;
                              return (
                                 <Link key={item.id} to={item.path}>
                                    <Disclosure.Button
                                       key={item.id}
                                       as="div"
                                       className={classNames(
                                          active
                                             ? 'bg-gray-900 text-white'
                                             : 'text-gray-100 hover:bg-gray-700 hover:text-white',
                                          'block px-3 py-2 rounded-md text-base font-medium'
                                       )}
                                       aria-current={active ? 'page' : undefined}
                                    >
                                       {item.navTitle}
                                    </Disclosure.Button>
                                 </Link>
                              );
                           })}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-700">
                           <div className="px-2 mt-3 space-y-1">
                              {userNavigation.map((item) => (
                                 <Disclosure.Button
                                    key={item.type}
                                    as="a"
                                    className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
                                 >
                                    {item.name}
                                 </Disclosure.Button>
                              ))}
                           </div>
                        </div>
                     </Disclosure.Panel>
                  </>
               )}
            </Disclosure>

            <main className="relative">
               <div
                  className="absolute inset-0 z-0 h-1/3"
                  style={{
                     backgroundColor: '#0EA5E9',
                     backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%230b9ee3' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%230998dc' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%230691d5' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%23048bce' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%230284C7' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%23048bce' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%230691d5' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%230998dc' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%230b9ee3' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%230EA5E9' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E\")",
                     backgroundAttachment: 'fixed',
                     backgroundSize: 'cover',
                  }}
               />
               <div className="relative z-10 py-6 mx-auto max-w-7xl sm:px-6">{children}</div>
            </main>
         </div>
      </>
   );
}
