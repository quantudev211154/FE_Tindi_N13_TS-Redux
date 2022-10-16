import * as yup from 'yup'

export const RegisterFormValidateShape = yup.object({
  name: yup
    .string()
    .required('Bạn cần phải điền tên muốn hiển thị')
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
      'Tên của bạn có vẻ không hợp lí lắm'
    ),
  phone: yup
    .string()
    .required('Hãy cung cấp số điện thoại của bạn')
    .matches(
      /^(0[3|5|7|8|9])+([0-9]{8})$/,
      'Số điện thoại phải dài đủ 10 kí tự và bắt đầu bằng các đầu số của Việt Nam (03|05|07|08|09)'
    ),
  password: yup
    .string()
    .required('Hãy tạo một mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
    .required('Đừng để trống mật khẩu'),
  rePassword: yup
    .string()
    .required('Hãy xác nhận mật khẩu của bạn')
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp nhau'),
})
