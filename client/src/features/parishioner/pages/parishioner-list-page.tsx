import { Divider, SButton } from 'components/common';
import { ParishionerFilterForm } from 'components/forms';
import { ParishionerTable } from 'components/tables';

export interface ParishionerListPageProps {}

export default function ParishionerListPage(props: ParishionerListPageProps) {
   return (
      <>
         <div className="flex justify-between">
            <div>
               <h3 className="text-primary text-xl font-bold sm:text-2xl">Giáo dân</h3>
               <p className="text-gray-600 mt-2 text-sm">
                  <span>Tổng cộng:</span>
                  <span className="ml-2">
                     <strong>1.250</strong>
                  </span>
               </p>
            </div>
            <div>
               <SButton
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
                           d="M12 4.5v15m7.5-7.5h-15"
                        />
                     </svg>
                  }
                  outlined
               >
                  Thêm mới
               </SButton>
            </div>
         </div>
         <Divider />
         <div className="grid grid-cols-4 mt-6 gap-10">
            <div className="col-span-1">
               <ParishionerFilterForm />
            </div>
            <div className="col-span-3">
               <ParishionerTable />
            </div>
         </div>
      </>
   );
}
