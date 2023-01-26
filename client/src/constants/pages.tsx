import LoginPage from 'features/auth/pages/login-page';
import DashboardPage from 'features/dashboard/pages/dashboard-page';
import ParishionerDetailPage from 'features/parishioner/pages/parishioner-detail-page';
import ParishionerListPage from 'features/parishioner/pages/parishioner-list-page';

export enum PageId {
   login,
   dashboard,
   parishionerList,
   parishionerDetail,
}

export interface PageConfig {
   id: PageId;
   path: string;
   title?: string;
   isPrivate?: boolean;
   element: JSX.Element;
   showOnNavbar?: boolean;
   navTitle?: string;
   relatedPageId?: PageId;
}

export const Pages = new Map<PageId, PageConfig>([
   [PageId.login, { id: PageId.login, path: '/dang-nhap', element: <LoginPage /> }],
   // [
   //    PageId.dashboard,
   //    {
   //       id: PageId.dashboard,
   //       path: '/tong-quan',
   //       element: <DashboardPage />,
   //       isPrivate: true,
   //       showOnNavbar: true,
   //       navTitle: 'Tổng quan',
   //       title: 'Tổng quan',
   //    },
   // ],
   [
      PageId.parishionerList,
      {
         id: PageId.parishionerList,
         title: 'Danh sách giáo dân',
         path: '/danh-sach-giao-dan',
         element: <ParishionerListPage />,
         isPrivate: true,
         showOnNavbar: true,
         navTitle: 'Giáo dân',
      },
   ],
   [
      PageId.parishionerDetail,
      {
         id: PageId.parishionerDetail,
         title: 'Thông tin giáo dân',
         path: '/giao-dan/:id',
         element: <ParishionerDetailPage />,
         isPrivate: true,
         relatedPageId: PageId.parishionerList,
      },
   ],
]);
