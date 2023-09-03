import {Dispatch} from 'redux';
import {DEBT_ACTION_TYPES, DebtProps} from './debt.types';
import {createAction} from '../../utils/reducer/reducer.utils';
import {
  DELETE_DEBT,
  FETCH_DEBT,
  POST_DEBT,
  PUT_DEBT,
} from '../../database/debt-table';

export const fetchDebtAsync =
  (inventoryUid: string) => async (dispatch: Dispatch) => {
    dispatch(createAction(DEBT_ACTION_TYPES.FETCH_DEBT_START));
    try {
      const result = await FETCH_DEBT(inventoryUid);
      dispatch(createAction(DEBT_ACTION_TYPES.FETCH_DEBT_SUCCESS, result));
    } catch (error) {
      dispatch(createAction(DEBT_ACTION_TYPES.FETCH_DEBT_FAILED, error));
    }
  };

export const postDebtAsync =
  (data: DebtProps) => async (dispatch: Dispatch) => {
    dispatch(createAction(DEBT_ACTION_TYPES.POST_DEBT_START));
    try {
      const result = await POST_DEBT(data);

      if (result.rowsAffected) {
        dispatch(createAction(DEBT_ACTION_TYPES.POST_DEBT_SUCCESS, data));
      }
    } catch (error) {
      dispatch(createAction(DEBT_ACTION_TYPES.POST_DEBT_FAILED, error));
    }
  };

export const putDebtAsync = (data: DebtProps) => async (dispatch: Dispatch) => {
  dispatch(createAction(DEBT_ACTION_TYPES.PUT_DEBT_START));
  try {
    const result = await PUT_DEBT(data);

    if (result.rowsAffected) {
      dispatch(createAction(DEBT_ACTION_TYPES.PUT_DEBT_SUCCESS, data));
    }
  } catch (error) {
    dispatch(createAction(DEBT_ACTION_TYPES.PUT_DEBT_FAILED, error));
  }
};

export const deleteDebtAsync = (uid: string) => async (dispatch: Dispatch) => {
  dispatch(createAction(DEBT_ACTION_TYPES.DELETE_DEBT_START));
  try {
    const result = await DELETE_DEBT(uid);

    if (result.rowsAffected) {
      dispatch(createAction(DEBT_ACTION_TYPES.DELETE_DEBT_SUCCESS, uid));
    }
  } catch (error) {
    dispatch(createAction(DEBT_ACTION_TYPES.DELETE_DEBT_FAILED, error));
  }
};
