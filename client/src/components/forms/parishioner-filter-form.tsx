import { Input, Select, Button } from 'components/common';
import { FilterIcon } from 'components/icons';

export interface ParishionerFilterFormProps {}

export function ParishionerFilterForm(props: ParishionerFilterFormProps) {
   return (
      <div>
         <div className="grid gap-2">
            <Input size="small" label="Tên" placeholder="Nguyễn Văn A" />
            <Select size="small" label="Giáo họ" options={[{ label: 'Thánh Tuân', value: 1 }]} />
            <Select
               size="small"
               label="Ngày rửa tội"
               options={[
                  { label: '2020 - 2021', value: 1 },
                  { label: '2022 - 2023', value: 2 },
               ]}
            />
            <Select
               size="small"
               label="Ngày rước lễ lần đầu"
               options={[
                  { label: '2020 - 2021', value: 1 },
                  { label: '2022 - 2023', value: 2 },
               ]}
            />
            <Select
               size="small"
               label="Ngày thêm sức"
               options={[
                  { label: '2020 - 2021', value: 1 },
                  { label: '2022 - 2023', value: 2 },
               ]}
            />
            <Select
               size="small"
               label="Ngày cưới"
               options={[
                  { label: '2020 - 2021', value: 1 },
                  { label: '2022 - 2023', value: 2 },
               ]}
            />
         </div>
         <div className="flex gap-2 mt-5">
            <Button>Xoá</Button>
            <Button type="primary" icon={<FilterIcon />}>
               Lọc
            </Button>
         </div>
      </div>
   );
}
