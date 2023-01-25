import * as React from 'react';

export interface SDropdownOption<Value> {
   label: string;
   value?: Value;
}

export interface SDropdownProps<OptionValue> {
   label?: string;
   options?: SDropdownOption<OptionValue>[];
}

export function SDropdown<OptionValue extends string | number>({
   label,
   options,
}: SDropdownProps<OptionValue>) {
   return (
      <div>
         <div className="mb-1">
            <label className="text-sm">{label}</label>
         </div>
         <div className="relative">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5"
               viewBox="0 0 20 20"
               fill="currentColor"
            >
               <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
               />
            </svg>
            <select className="w-full p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
               {(options || []).map((o) => (
                  <option key={o.value} value={o.value}>
                     {o.label}
                  </option>
               ))}
            </select>
         </div>
      </div>
   );
}
