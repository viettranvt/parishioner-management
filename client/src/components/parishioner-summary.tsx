import Avatar from 'react-avatar';

export interface ParishionerSummaryProps {
   fullName: string;
   avatar?: string;
}

export function ParishionerSummary({ fullName, avatar }: ParishionerSummaryProps) {
   return (
      <div className="flex items-center space-x-4">
         <div>
            <Avatar name={fullName} src={avatar} size="28" round />
         </div>
         <div>
            <span>{fullName}</span>
         </div>
      </div>
   );
}
