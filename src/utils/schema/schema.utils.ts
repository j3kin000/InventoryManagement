import * as yup from 'yup';

export const InventoryFormSchema = yup.object().shape({
  title: yup.string().required('Please Enter your title'),
});

export const ProductFormSchema = yup.object().shape({
  image: yup.string(),
  productName: yup.string().required('Please Enter your Product Name'),
  stock: yup
    .string()
    .required('Please Enter your Stock')
    .matches(/^[0-9]+(\.[0-9]+)?$/, 'Stock must be a valid number'),
  originalPrice: yup
    .string()
    .required('Please Enter your Original Price')
    .matches(/^[0-9]+(\.[0-9]+)?$/, 'Stock must be a valid number'),
  salesPrice: yup
    .string()
    .required('Please Enter your Sales Price')
    .matches(/^[0-9]+(\.[0-9]+)?$/, 'Stock must be a valid number'),
});

export const ProductSchema = yup.object().shape({
  uid: yup.string(),
  image: yup.string(),
  productName: yup.string().required('Please Enter your Product Name'),
  salesPrice: yup.string(),
  numberItems: yup
    .string()
    .required('Please Enter the number of product')
    .matches(/^[0-9]+(\.[0-9]+)?$/, 'Stock must be a valid number'),
});
export const DebtFormSchema = yup.object().shape({
  name: yup.string().required('Please Enter your  Name'),
  items: yup
    .array()
    .of(ProductSchema)
    .required('Please select a product')
    .min(1, 'At least one product is required'),
});
