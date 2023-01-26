import { Button, Dropdown } from 'components/common';
import { MoreVerticalIcon } from 'components/icons';
import { useMemo } from 'react';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

interface SimpleInfoProps {
   fullName: string;
   avatar?: string;
   title?: string;
}

export interface ParishionerCardProps extends SimpleInfoProps {
   mode?: 'simple' | 'actions';
}

function SimpleInfo({ fullName, avatar, title }: SimpleInfoProps) {
   const hasTitle = useMemo(() => title !== undefined, [title]);
   return (
      <div className="flex items-center space-x-3">
         <div>
            <Avatar name={fullName} src={avatar} size={hasTitle ? '36' : '28'} round />
         </div>
         <div className="flex flex-col">
            <span>{fullName}</span>
            {hasTitle && <span className="text-xs text-gray-500 mt-0.5">{title}</span>}
         </div>
      </div>
   );
}

export function ParishionerCard({ mode = 'simple', ...simpleInfo }: ParishionerCardProps) {
   if (mode === 'simple') {
      return <SimpleInfo {...simpleInfo} />;
   }

   return (
      <div className="card p-2 pl-3 flex justify-between items-center flex-row bg-gray-100 hover:bg-primary-light duration-150">
         <SimpleInfo {...simpleInfo} />
         <Dropdown
            menuItems={[
               <Link key="detail" to="/">
                  Chi tiết
               </Link>,
               <Link key="edit-info" to="/">
                  Sửa thông tin
               </Link>,
               <Link key="re-select" to="/">
                  Chọn lại
               </Link>,
               <Link key="remove" to="/">
                  Xoá
               </Link>,
            ]}
         >
            <Button
               className="bg-transparent hover:bg-transparent"
               size="small"
               icon={<MoreVerticalIcon />}
               shape="circle"
               outlined={false}
            />
         </Dropdown>
      </div>
   );
}
