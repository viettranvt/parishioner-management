import { Button, Divider } from 'components/common';
import { ParishionerFilterForm } from 'components/forms';
import { PlusIcon } from 'components/icons';
import { ParishionerTable } from 'components/tables';

export default function ParishionerListPage() {
   return (
      <>
         <div className="flex justify-between">
            <div className="text-white">
               <h3 className="text-xl font-bold sm:text-2xl">Giáo dân</h3>
               <p className="mt-2 text-sm">
                  <span>Tổng cộng:</span>
                  <span className="ml-2">
                     <strong>1.250</strong>
                  </span>
               </p>
            </div>
            <div>
               <Button icon={<PlusIcon className="w-5 h-5" />} type="primary" outlined contrast>
                  Thêm mới
               </Button>
            </div>
         </div>
         <div className="card bg-base-100 mt-6 p-4 shadow-lg">
            <div className="grid grid-cols-4 gap-4">
               <div className="col-span-1">
                  <div className="card p-4 pt-3">
                     <span className="text-sm">Lọc theo tiêu chí</span>
                     <Divider className="my-2" />
                     <ParishionerFilterForm />
                  </div>
               </div>
               <div className="col-span-3">
                  <ParishionerTable />
               </div>
            </div>
         </div>
      </>
   );
}
