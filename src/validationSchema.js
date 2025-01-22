import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a vaild email address.')
    .test('is-valid-email', 'Please enter a valid email address.', (value) => {
      if (!value) return false;
      const domainPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 도메인 검사
      return domainPattern.test(value);
    })
    .required('Email is required.'),
  pw: Yup.string()
    .min(8, 'Password must be at least 8 characters long.')
    .required('Password is required.'),
});
