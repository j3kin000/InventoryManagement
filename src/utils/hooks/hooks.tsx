import {ProductProps} from '../../store/product/product.types';

export const getProductList = (product: ProductProps[]) => {
  return product.map((item, key) => ({
    uid: item.uid,
    label: item.productName,
    value: item.productName,
    image: item.image,
    salesPrice: item.salesPrice,
  }));
};
