import * as Yup from 'yup';

export const addNoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Zorunlu'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Zorunlu'),
  time: Yup.string().required('Zorunlu'),
  date: Yup.string().required('Zorunlu'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçerli bir e-posta adresi giriniz')
    .min(10, 'E-posta en az 10 karakter olmalı')
    .max(50, 'E-posta en fazla 50 karakter olabilir')
    .required('E-posta zorunludur'),

  password: Yup.string()
    .min(5, 'Şifre en az 5 karakter olmalı')
    .max(50, 'Şifre en fazla 50 karakter olabilir')
    .required('Şifre zorunludur'),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'İsim en az 2 karakter olmalı')
    .max(50, 'İsim en fazla 50 karakter olabilir')
    .required('İsim zorunludur'),

  email: Yup.string()
    .email('Geçerli bir e-posta adresi giriniz')
    .min(10, 'E-posta en az 10 karakter olmalı')
    .max(50, 'E-posta en fazla 50 karakter olabilir')
    .required('E-posta zorunludur'),

  password: Yup.string()
    .min(5, 'Şifre en az 5 karakter olmalı')
    .max(50, 'Şifre en fazla 50 karakter olabilir')
    .required('Şifre zorunludur'),
});
