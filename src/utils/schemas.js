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
