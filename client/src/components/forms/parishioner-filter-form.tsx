import { SInput, SDropdown, SButton } from 'components/common';

export interface ParishionerFilterFormProps {}

export function ParishionerFilterForm(props: ParishionerFilterFormProps) {
   return (
      <div>
         <div className="grid gap-4">
            <SInput label="Tên" placeholder="Nguyễn Văn A" />
            <SDropdown label="Giáo họ" options={[{ label: 'Thánh Tuân', value: 1 }]} />
            <SDropdown
               label="Ngày rửa tội"
               options={[
                  { label: '2020 - 2021', value: 1 },
                  { label: '2022 - 2023', value: 2 },
               ]}
            />
            <SDropdown
               label="Ngày rước lễ lần đầu"
               options={[
                  { label: '2020 - 2021', value: 1 },
                  { label: '2022 - 2023', value: 2 },
               ]}
            />
            <SDropdown
               label="Ngày thêm sức"
               options={[
                  { label: '2020 - 2021', value: 1 },
                  { label: '2022 - 2023', value: 2 },
               ]}
            />
            <SDropdown
               label="Ngày cưới"
               options={[
                  { label: '2020 - 2021', value: 1 },
                  { label: '2022 - 2023', value: 2 },
               ]}
            />
         </div>
         <div className="flex gap-2 mt-5">
            <SButton type="secondary">Xoá</SButton>
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
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                     />
                  </svg>
               }
            >
               Lọc
            </SButton>
         </div>
      </div>
   );
}
