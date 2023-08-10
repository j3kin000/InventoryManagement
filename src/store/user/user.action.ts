import {Dispatch} from 'redux';
import {USER_ACTION_TYPES, UserProps} from './user.types';
import {createAction} from '../../utils/reducer/reducer.utils';
import {FETCH_USER, POST_USER, PUT_USER} from '../../database/user-table';

export const postUserAsync =
  (data: UserProps) => async (dispatch: Dispatch) => {
    dispatch(createAction(USER_ACTION_TYPES.POST_USER_START));
    try {
      const result = POST_USER(data);
      dispatch(createAction(USER_ACTION_TYPES.POST_USER_SUCCESS, data));
    } catch (error) {
      dispatch(createAction(USER_ACTION_TYPES.POST_USER_FAILED, error));
    }
  };

export const fetchUserAsync = (data: string) => async (dispatch: Dispatch) => {
  dispatch(createAction(USER_ACTION_TYPES.FETCH_USER_START));
  try {
    const result = FETCH_USER(data);
    dispatch(createAction(USER_ACTION_TYPES.FETCH_USER_SUCCESS, data));
  } catch (error) {
    dispatch(createAction(USER_ACTION_TYPES.FETCH_USER_FAILED, error));
  }
};

export const putUserAsync = (data: UserProps) => async (dispatch: Dispatch) => {
  dispatch(createAction(USER_ACTION_TYPES.FETCH_USER_START));
  try {
    const result = PUT_USER(data);
    dispatch(createAction(USER_ACTION_TYPES.FETCH_USER_SUCCESS, data));
  } catch (error) {
    dispatch(createAction(USER_ACTION_TYPES.FETCH_USER_FAILED, error));
  }
};
