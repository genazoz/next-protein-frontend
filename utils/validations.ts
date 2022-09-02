import * as yup from "yup";

export const LoginFormSchema = yup.object({
  email: yup.string().email('Неверная почта').required('Почта обязательная'),
  password: yup
    .string()
    .min(6, 'Пароль не короче 6 символов')
    .required('Пароль обязательный'),
});

export const RegisterFormSchema = yup
  .object({
    fullName: yup.string().min(6, 'Имя и фамилия не короче 6 символов').required("Имя и фамилия обязательны"),
  }).concat(LoginFormSchema);
