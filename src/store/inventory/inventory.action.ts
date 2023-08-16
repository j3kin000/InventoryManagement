import {Dispatch} from 'redux';
import {INVENTORY_ACTION_TYPES, InventoryProps} from './inventory.types';
import {createAction} from '../../utils/reducer/reducer.utils';
import {
  DELETE_INVENTORY,
  FETCH_INVENTORY,
  POST_INVENTORY,
  PUT_INVENTORY,
} from '../../database/inventory-table';
import {toastAlert} from '../../utils/utils';

export const fetchInventoryAsync = () => async (dispatch: Dispatch) => {
  dispatch(createAction(INVENTORY_ACTION_TYPES.FETCH_INVENTORY_START));
  try {
    const result = await FETCH_INVENTORY();
    console.log('RESULT', result);
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
      console.log('result postInventoryAsync', result);

      if (result.rowsAffected) {
        console.log('result postInventoryAsync success');

        dispatch(
          createAction(INVENTORY_ACTION_TYPES.POST_INVENTORY_SUCCESS, data),
        );
      }
    } catch (error) {
      console.log('ERROR ACTION', error);
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
      console.log('result putInventoryAsync', result);

      if (result.rowsAffected) {
        console.log('result putInventoryAsync success');

        // setTimeout(() => {

        dispatch(
          createAction(INVENTORY_ACTION_TYPES.PUT_INVENTORY_SUCCESS, data),
        );

        // }, 1000);
      }
    } catch (error) {
      console.log('ERROR ACTION', error);

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
      console.log('result deleteInventoryAsync', result);

      if (result.rowsAffected) {
        console.log('result deleteInventoryAsync success');

        dispatch(
          createAction(INVENTORY_ACTION_TYPES.DELETE_INVENTORY_SUCCESS, uid),
        );
      }
    } catch (error) {
      console.log('ERROR ACTION', error);
      dispatch(
        createAction(INVENTORY_ACTION_TYPES.DELETE_INVENTORY_FAILED, error),
      );
    }
  };
