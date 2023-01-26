export interface SInputProps {
   label?: string;
   placeholder?: string;
   type?: React.HTMLInputTypeAttribute;
}

export function SInput({ label, placeholder, type }: SInputProps) {
   return (
      <div>
         <div className="mb-1">
            <label className="text-sm">{label}</label>
         </div>
         <input
            required
            type={type}
            placeholder={placeholder}
            className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
         />
      </div>
   );
}
