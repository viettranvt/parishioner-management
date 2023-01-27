import classNames from 'classnames';
import { Button, Dropdown } from 'components/common';
import { MoreVerticalIcon } from 'components/icons';
import { useMemo } from 'react';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

export enum ParishionerCardStyle {
   simple,
   actions,
}

interface SimpleInfoProps {
   fullName: string;
   avatar?: string;
   title?: string;
   style?: ParishionerCardStyle;
}

export interface ParishionerCardProps extends SimpleInfoProps {
   style?: ParishionerCardStyle;
}

function SimpleInfo({ fullName, avatar, title, style }: SimpleInfoProps) {
   const hasTitle = useMemo(() => title !== undefined, [title]);

   return (
      <div className="flex items-center space-x-3">
         <div
            className={classNames('bg-white rounded-full', {
               'p-1': style === ParishionerCardStyle.actions,
            })}
         >
            <Avatar name={fullName} src={avatar} size={hasTitle ? '36' : '28'} round />
         </div>
         <div className="flex flex-col">
            <span
               className={classNames({
                  'text-sm': style === ParishionerCardStyle.actions,
               })}
            >
               {fullName}
            </span>
            {hasTitle && <span className="text-xs text-gray-500 mt-1">{title}</span>}
         </div>
      </div>
   );
}

export function ParishionerCard({
   style = ParishionerCardStyle.simple,
   ...simpleInfoProps
}: ParishionerCardProps) {
   if (style === ParishionerCardStyle.simple) {
      return <SimpleInfo {...simpleInfoProps} />;
   }

   return (
      <div className="card p-1.5 rounded-lg flex justify-between items-center flex-row bg-slate-100 hover:bg-primary-light duration-150">
         <SimpleInfo style={style} {...simpleInfoProps} />
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
               size="sm"
               icon={<MoreVerticalIcon />}
               shape="circle"
               outlined={false}
            />
         </Dropdown>
      </div>
   );
}
