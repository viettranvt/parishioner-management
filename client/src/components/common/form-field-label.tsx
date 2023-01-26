import * as React from 'react';

export interface FormFieldLabelProps {
   children: React.ReactNode;
}

export function FormFieldLabel({ children }: FormFieldLabelProps) {
   return (
      <label className="label">
         <span className="label-text text-gray-500">{children}</span>
      </label>
   );
}
