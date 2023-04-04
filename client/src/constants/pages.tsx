import LoginPage from 'features/auth/pages/login-page';
import ParishionerDetailPage from 'features/parishioner/pages/parishioner-detail-page';
import ParishionerListPage from 'features/parishioner/pages/parishioner-list-page';

export enum PageId {
   Login,
   Dashboard,
   ParishionerList,
   ParishionerDetail,
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
   [PageId.Login, { id: PageId.Login, path: '/dang-nhap', element: <LoginPage /> }],
   // [
   //    PageId.Dashboard,
   //    {
   //       id: PageId.Dashboard,
   //       path: '/tong-quan',
   //       element: <DashboardPage />,
   //       isPrivate: true,
   //       showOnNavbar: true,
   //       navTitle: 'Tổng quan',
   //       title: 'Tổng quan',
   //    },
   // ],
   [
      PageId.ParishionerList,
      {
         id: PageId.ParishionerList,
         title: 'Danh sách giáo dân',
         path: '/danh-sach-giao-dan',
         element: <ParishionerListPage />,
         isPrivate: true,
         showOnNavbar: true,
         navTitle: 'Giáo dân',
      },
   ],
   [
      PageId.ParishionerDetail,
      {
         id: PageId.ParishionerDetail,
         title: 'Thông tin giáo dân',
         path: '/giao-dan/:id',
         element: <ParishionerDetailPage />,
         isPrivate: true,
         relatedPageId: PageId.ParishionerList,
      },
   ],
]);
