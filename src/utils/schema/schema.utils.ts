import * as yup from 'yup';

export const InventoryFormSchema = yup.object().shape({
  title: yup.string().required('Please Enter your title'),
});
