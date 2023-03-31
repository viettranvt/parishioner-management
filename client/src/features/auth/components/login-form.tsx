import { Button } from '@mui/material';
import { InputField } from 'components/forms/fields';
import { AuthLoginFormData } from 'models';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CircularProgress } from '@mui/material';
import { SecurityIcon } from 'components/icons';

export interface LoginFormProps {
   onSubmit?: (formValues: AuthLoginFormData) => void;
}

const schema = yup.object().shape({
   username: yup.string().required('Bắt buộc'),
   password: yup.string().required('Bắt buộc'),
});

export function LoginForm({ onSubmit }: LoginFormProps) {
   const {
      control,
      handleSubmit,
      formState: { isSubmitting },
   } = useForm<AuthLoginFormData>({
      defaultValues: {
         username: '',
         password: '',
      },
      resolver: yupResolver(schema),
   });

   const handleFormSubmit = (formValues: AuthLoginFormData) => {
      onSubmit?.(formValues);
   };

   return (
      <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
         <InputField
            name="username"
            control={control}
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            autoFocus
            customSize="medium"
         />

         <InputField
            name="password"
            control={control}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
            customSize="medium"
         />

         <div>
            <Button
               fullWidth
               size="large"
               type="submit"
               variant="contained"
               startIcon={
                  isSubmitting ? <CircularProgress size={16} color="inherit" /> : <SecurityIcon />
               }
               disabled={isSubmitting}
               className="bg-gradient-to-r from-primary-dark to-primary"
            >
               ĐĂNG NHẬP
            </Button>
         </div>
      </form>
   );
}
