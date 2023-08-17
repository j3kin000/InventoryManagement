export enum PRODUCT_ACTION_TYPES {
  FETCH_PRODUCT_START = 'FETCH_PRODUCT_START',
  FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS',
  FETCH_PRODUCT_FAILED = 'FETCH_PRODUCT_FAILED',

  POST_PRODUCT_START = 'POST_PRODUCT_START',
  POST_PRODUCT_SUCCESS = 'POST_PRODUCT_SUCCESS',
  POST_PRODUCT_FAILED = 'POST_PRODUCT_FAILED',

  PUT_PRODUCT_START = 'PUT_PRODUCT_START',
  PUT_PRODUCT_SUCCESS = 'PUT_PRODUCT_SUCCESS',
  PUT_PRODUCT_FAILED = 'PUT_PRODUCT_FAILED',

  DELETE_PRODUCT_START = 'DELETE_PRODUCT_START',
  DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAILED = 'DELETE_PRODUCT_FAILED',
}

export type ProductProps = {
  uid: string;
  inventoryUid: string;
  image: string;
  createdAt: string;
  productName: string;
  stock: string;
  originalPrice: string;
  salesPrice: string;
};

export type ProductState = {
  isLoading: boolean;
  error: null | Error;
  product: ProductProps[] | [];
};
