import {Dispatch} from 'redux';
import {INVENTORY_ACTION_TYPES, InventoryProps} from './inventory.types';
import {createAction} from '../../utils/reducer/reducer.utils';
import {
  DELETE_ALL_INVENTORY,
  DELETE_INVENTORY,
  FETCH_INVENTORY,
  POST_INVENTORY,
  PUT_INVENTORY,
} from '../../database/inventory-table';

export const fetchInventoryAsync = () => async (dispatch: Dispatch) => {
  dispatch(createAction(INVENTORY_ACTION_TYPES.FETCH_INVENTORY_START));
  try {
    const result = await FETCH_INVENTORY();
    dispatch(
      createAction(INVENTORY_ACTION_TYPES.FETCH_INVENTORY_SUCCESS, result),
    );
  } catch (error) {
    dispatch(
      createAction(INVENTORY_ACTION_TYPES.FETCH_INVENTORY_FAILED, error),
    );
  }
};

export const postInventoryAsync =
  (data: InventoryProps) => async (dispatch: Dispatch) => {
    dispatch(createAction(INVENTORY_ACTION_TYPES.POST_INVENTORY_START));
    try {
      const result = await POST_INVENTORY(data);

      if (result.rowsAffected) {
        dispatch(
          createAction(INVENTORY_ACTION_TYPES.POST_INVENTORY_SUCCESS, data),
        );
      }
    } catch (error) {
      dispatch(
        createAction(INVENTORY_ACTION_TYPES.POST_INVENTORY_FAILED, error),
      );
    }
  };

export const putInventoryAsync =
  (data: InventoryProps) => async (dispatch: Dispatch) => {
    dispatch(createAction(INVENTORY_ACTION_TYPES.PUT_INVENTORY_START));
    try {
      const result = await PUT_INVENTORY(data);

      if (result.rowsAffected) {
        dispatch(
          createAction(INVENTORY_ACTION_TYPES.PUT_INVENTORY_SUCCESS, data),
        );

        // }, 1000);
      }
    } catch (error) {
      dispatch(
        createAction(INVENTORY_ACTION_TYPES.PUT_INVENTORY_FAILED, error),
      );
    }
  };

export const deleteInventoryAsync =
  (uid: string) => async (dispatch: Dispatch) => {
    dispatch(createAction(INVENTORY_ACTION_TYPES.DELETE_INVENTORY_START));
    try {
      const result = await DELETE_INVENTORY(uid);

      if (result.rowsAffected) {
        dispatch(
          createAction(INVENTORY_ACTION_TYPES.DELETE_INVENTORY_SUCCESS, uid),
        );
      }
    } catch (error) {
      dispatch(
        createAction(INVENTORY_ACTION_TYPES.DELETE_INVENTORY_FAILED, error),
      );
    }
  };

export const deleteAllInventoryAsync = () => async (dispatch: Dispatch) => {
  dispatch(createAction(INVENTORY_ACTION_TYPES.DELETE_ALL_INVENTORY_START));
  try {
    const result = await DELETE_ALL_INVENTORY();

    if (result.rowsAffected) {
      dispatch(
        createAction(INVENTORY_ACTION_TYPES.DELETE_ALL_INVENTORY_SUCCESS, []),
      );
    }
  } catch (error) {
    dispatch(
      createAction(INVENTORY_ACTION_TYPES.DELETE_ALL_INVENTORY_FAILED, error),
    );
  }
};
