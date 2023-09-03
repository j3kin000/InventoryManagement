import {Dispatch} from 'redux';
import {createAction} from '../../utils/reducer/reducer.utils';
import {PRODUCT_ACTION_TYPES, ProductProps} from './product.types';
import {
  DELETE_ALL_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCT,
  FetchProductProps,
  POST_PRODUCT,
  PUT_PRODUCT,
} from '../../database/product-table';

export const fetchProductAsync =
  (data: string) => async (dispatch: Dispatch) => {
    dispatch(createAction(PRODUCT_ACTION_TYPES.FETCH_PRODUCT_START));
    try {
      const result = await FETCH_PRODUCT(data);
      dispatch(
        createAction(PRODUCT_ACTION_TYPES.FETCH_PRODUCT_SUCCESS, result),
      );
    } catch (error) {
      dispatch(createAction(PRODUCT_ACTION_TYPES.FETCH_PRODUCT_FAILED, error));
    }
  };

export const postProductAsync =
  (data: ProductProps) => async (dispatch: Dispatch) => {
    dispatch(createAction(PRODUCT_ACTION_TYPES.POST_PRODUCT_START));
    try {
      const result = await POST_PRODUCT(data);
      if (result.rowsAffected) {
        dispatch(createAction(PRODUCT_ACTION_TYPES.POST_PRODUCT_SUCCESS, data));
      } else {
        dispatch(
          createAction(PRODUCT_ACTION_TYPES.POST_PRODUCT_FAILED, 'error'),
        );
      }
    } catch (error) {
      dispatch(createAction(PRODUCT_ACTION_TYPES.POST_PRODUCT_FAILED, error));
    }
  };

export const putProductAsync =
  (data: ProductProps) => async (dispatch: Dispatch) => {
    dispatch(createAction(PRODUCT_ACTION_TYPES.PUT_PRODUCT_START));
    try {
      const result = await PUT_PRODUCT(data);
      if (result.rowsAffected) {
        dispatch(createAction(PRODUCT_ACTION_TYPES.PUT_PRODUCT_SUCCESS, data));
      } else {
        dispatch(
          createAction(PRODUCT_ACTION_TYPES.PUT_PRODUCT_FAILED, 'ERRPR'),
        );
      }
    } catch (error) {
      dispatch(createAction(PRODUCT_ACTION_TYPES.PUT_PRODUCT_FAILED, error));
    }
  };

export const deleteProductAsync =
  (uid: string) => async (dispatch: Dispatch) => {
    dispatch(createAction(PRODUCT_ACTION_TYPES.DELETE_PRODUCT_START));
    try {
      const result = await DELETE_PRODUCT(uid);
      if (result.rowsAffected) {
        dispatch(
          createAction(PRODUCT_ACTION_TYPES.DELETE_PRODUCT_SUCCESS, uid),
        );
      }
    } catch (error) {
      dispatch(createAction(PRODUCT_ACTION_TYPES.DELETE_PRODUCT_FAILED, error));
    }
  };

export const deleteAllProductAsync =
  (uid: string) => async (dispatch: Dispatch) => {
    dispatch(createAction(PRODUCT_ACTION_TYPES.DELETE_ALL_PRODUCT_START));
    try {
      const result = await DELETE_ALL_PRODUCT();
      if (result.rowsAffected) {
        dispatch(
          createAction(PRODUCT_ACTION_TYPES.DELETE_ALL_PRODUCT_SUCCESS, uid),
        );
      }
    } catch (error) {
      dispatch(
        createAction(PRODUCT_ACTION_TYPES.DELETE_ALL_PRODUCT_FAILED, error),
      );
    }
  };
