import * as yup from 'yup';

export const InventoryFormSchema = yup.object().shape({
  title: yup.string().required('Please Enter your title'),
});

export const ProductFormSchema = yup.object().shape({
  image: yup.string(),
  productName: yup.string().required('Please Enter your Product Name'),
  stock: yup.string().required('Please Enter your Stock'),
  originalPrice: yup.string().required('Please Enter your Original Price'),
  salesPrice: yup.string().required('Please Enter your Sales Price'),
});
