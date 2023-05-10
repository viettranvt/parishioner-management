import { Button } from 'components/common';
import { PlusIcon } from 'components/icons';
import * as React from 'react';

export interface AddParishionerButtonProps {
   onClick?: () => void;
}

export function AddParishionerButton({ onClick }: AddParishionerButtonProps) {
   return (
      <Button
         icon={<PlusIcon className="w-4 h-4" />}
         onClick={(e) => {
            e.preventDefault();
            onClick && onClick();
         }}
      >
         Thêm
      </Button>
   );
}
