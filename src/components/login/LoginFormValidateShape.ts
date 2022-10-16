import * as yup from 'yup'

export const LoginFormValidateShape = yup.object({
  phone: yup
    .string()
    .required('Đừng để trống số điện thoại')
    .matches(
      /^(0[3|5|7|8|9])+([0-9]{8})$/,
      'Số điện thoại phải dài đủ 10 kí tự và bắt đầu bằng các đầu số của Việt Nam (03|05|07|08|09)'
    ),
  password: yup.string().required('Đừng để trống mật khẩu'),
})
