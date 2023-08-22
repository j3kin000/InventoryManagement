export enum DEBT_ACTION_TYPES {
  FETCH_DEBT_START = 'FETCH_DEBT_START',
  FETCH_DEBT_SUCCESS = 'FETCH_DEBT_SUCCESS',
  FETCH_DEBT_FAILED = 'FETCH_DEBT_FAILED',

  POST_DEBT_START = 'POST_DEBT_START',
  POST_DEBT_SUCCESS = 'POST_DEBT_SUCCESS',
  POST_DEBT_FAILED = 'POST_DEBT_FAILED',

  PUT_DEBT_START = 'PUT_DEBT_START',
  PUT_DEBT_SUCCESS = 'PUT_DEBT_SUCCESS',
  PUT_DEBT_FAILED = 'PUT_DEBT_FAILED',

  DELETE_DEBT_START = 'DELETE_DEBT_START',
  DELETE_DEBT_SUCCESS = 'DELETE_DEBT_SUCCESS',
  DELETE_DEBT_FAILED = 'DELETE_DEBT_FAILED',
}

export type DebtProps = {
  uid: string;
  name: string;
  inventoryUid: string;
  createdAt: string;
  items: itemProps[];
  isPaid: boolean;
};

export type itemProps = {
  uid: string;
  image: string;
  productName: string;
  salesPrice: string;
  numberItems: string;
};

export type DebtState = {
  isLoading: boolean;
  error: Error | null;
  debt: DebtProps[] | [];
};
