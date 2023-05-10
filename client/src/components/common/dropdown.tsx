import { ReactNode } from 'react';

export interface DropdownProps {
   children: ReactNode;
   menuItems: ReactNode[];
}

export function Dropdown({ children, menuItems }: DropdownProps) {
   return (
      <div className="dropdown dropdown-end">
         <label tabIndex={0}>{children}</label>
         <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            {menuItems.map((item, idx) => (
               <li className="text-sm" key={idx}>
                  {item}
               </li>
            ))}
         </ul>
      </div>
   );
}
