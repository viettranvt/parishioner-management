import classNames from 'classnames';
import { Button as CustomButton, Dropdown } from 'components/common';
import { MoreVerticalIcon } from 'components/icons';
import { PageId, Pages } from 'constants/pages';
import { ID } from 'models';
import { useMemo } from 'react';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

export enum ParishionerCardStyle {
   simple,
   actions,
}

interface SimpleInfoProps {
   id: ID;
   fullName: string;
   avatar?: string;
   title?: string;
   style?: ParishionerCardStyle;
}

export interface ParishionerCardProps extends SimpleInfoProps {
   style?: ParishionerCardStyle;
   onReselect?: () => void;
   onRemove?: () => void;
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
            <Avatar
               name={fullName}
               src={avatar}
               size={hasTitle ? '36' : '28'}
               round
               initials={(name) => {
                  const partials = name.split(' ').slice(-2);
                  return `${partials[0].charAt(0)}${
                     partials.length > 1 ? partials[1].charAt(0) : ''
                  }`;
               }}
            />
         </div>
         <div className="flex flex-col">
            <span
               className={classNames({
                  'text-sm': style === ParishionerCardStyle.actions,
               })}
            >
               {fullName}
            </span>
            {hasTitle && <span className="mt-1 text-xs text-gray-500">{title}</span>}
         </div>
      </div>
   );
}

export function ParishionerCard({
   style = ParishionerCardStyle.simple,
   onReselect,
   onRemove,
   ...simpleInfoProps
}: ParishionerCardProps) {
   if (style === ParishionerCardStyle.simple) {
      return <SimpleInfo {...simpleInfoProps} />;
   }

   const detailPath =
      Pages.get(PageId.ParishionerDetail)?.path.replace(':id', simpleInfoProps.id) ?? '';

   return (
      <div className="card p-1.5 rounded-lg flex justify-between items-center flex-row bg-slate-100 hover:bg-primary-light duration-150">
         <SimpleInfo style={style} {...simpleInfoProps} />
         <Dropdown
            menuItems={[
               <Link key="detail" to={detailPath}>
                  Chi tiết
               </Link>,
               <Link key="edit-info" to={detailPath}>
                  Sửa thông tin
               </Link>,
               <span key="reselect" onClick={onReselect}>
                  Chọn lại
               </span>,
               <span key="remove" onClick={onRemove}>
                  Loại bỏ
               </span>,
            ]}
         >
            <CustomButton
               className="bg-transparent hover:bg-transparent"
               size="sm"
               icon={<MoreVerticalIcon />}
               shape="circle"
               outlined={false}
               htmlType="button"
            />
         </Dropdown>
      </div>
   );
}
