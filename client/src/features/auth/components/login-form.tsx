import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'components/forms/fields';
import { SecurityIcon } from 'components/icons';
import { selectLogging } from 'features/auth/auth-slice';
import { AuthLoginFormData } from 'models';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

export interface LoginFormProps {
   onSubmit?: (formValues: AuthLoginFormData) => void;
}

const schema = yup.object().shape({
   username: yup.string().required('Bắt buộc'),
   password: yup.string().required('Bắt buộc'),
});

export function LoginForm({ onSubmit }: LoginFormProps) {
   const { control, handleSubmit } = useForm<AuthLoginFormData>({
      defaultValues: {
         username: '',
         password: '',
      },
      resolver: yupResolver(schema),
   });
   const logging = useSelector(selectLogging);

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
            <LoadingButton
               fullWidth
               size="large"
               type="submit"
               variant="contained"
               startIcon={<SecurityIcon />}
               loading={logging}
               loadingPosition="start"
               className="bg-gradient-to-r from-primary-dark to-primary"
            >
               ĐĂNG NHẬP
            </LoadingButton>
         </div>
      </form>
   );
}
