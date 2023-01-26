import { Divider, Button } from 'components/common';
import { ParishionerFilterForm } from 'components/forms';
import { PlusIcon } from 'components/icons';
import { ParishionerTable } from 'components/tables';

export default function ParishionerListPage() {
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
               <Button icon={<PlusIcon />} type="primary" outlined>
                  Thêm mới
               </Button>
            </div>
         </div>
         <Divider />
         <div className="grid grid-cols-4 gap-10">
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
