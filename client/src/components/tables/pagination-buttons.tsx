import { useState } from 'react';

const previousButtonText = 'Trang trước';
const nextButtonText = 'Trang sau';

export interface PaginationButtonsProps {}

export function PaginationButtons(props: PaginationButtonsProps) {
   const [pages, setPages] = useState(['1', '2', '3', , '...', '8', '9', '10']);
   const [currentPage, setCurrentPage] = useState('1');

   return (
      <div className="max-w-screen-xl text-gray-600">
         <div className="hidden items-center justify-between sm:flex" aria-label="Pagination">
            <a href="javascript:void(0)" className="hover:text-primary flex items-center gap-x-2">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
               >
                  <path
                     fillRule="evenodd"
                     d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                     clipRule="evenodd"
                  />
               </svg>
               {previousButtonText}
            </a>
            <ul className="flex items-center gap-1">
               {pages.map((item, idx) => (
                  <li key={item} className="text-sm">
                     {item == '...' ? (
                        <div>{item}</div>
                     ) : (
                        <a
                           href="javascript:void(0)"
                           aria-current={currentPage == item ? 'page' : false}
                           className={`px-3 py-2 rounded-lg duration-150 hover:text-primary hover:bg-primary-light ${
                              currentPage == item ? 'bg-primary-light text-primary font-medium' : ''
                           }`}
                        >
                           {item}
                        </a>
                     )}
                  </li>
               ))}
            </ul>
            <a href="javascript:void(0)" className="hover:text-primary flex items-center gap-x-2">
               {nextButtonText}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
               >
                  <path
                     fillRule="evenodd"
                     d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                     clipRule="evenodd"
                  />
               </svg>
            </a>
         </div>
         {/* On mobile version */}
         <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
            <a
               href="javascript:void(0)"
               className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
            >
               {previousButtonText}
            </a>
            <div className="font-medium">
               Page {currentPage} of {pages.length}
            </div>
            <a
               href="javascript:void(0)"
               className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
            >
               {nextButtonText}
            </a>
         </div>
      </div>
   );
}
