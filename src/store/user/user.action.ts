import {Dispatch} from 'redux';
import {USER_ACTION_TYPES, UserProps} from './user.types';
import {createAction} from '../../utils/reducer/reducer.utils';
import {FETCH_USER, POST_USER, PUT_USER} from '../../database/user-table';

export const postUserAsync =
  (data: UserProps) => async (dispatch: Dispatch) => {
    dispatch(createAction(USER_ACTION_TYPES.POST_USER_START));
    try {
      await POST_USER(data);
      dispatch(createAction(USER_ACTION_TYPES.POST_USER_SUCCESS, data));
    } catch (error) {
      dispatch(createAction(USER_ACTION_TYPES.POST_USER_FAILED, error));
    }
  };

export const fetchUserAsync = (data: string) => async (dispatch: Dispatch) => {
  dispatch(createAction(USER_ACTION_TYPES.FETCH_USER_START));
  try {
    await FETCH_USER(data);
    dispatch(createAction(USER_ACTION_TYPES.FETCH_USER_SUCCESS, data));
  } catch (error) {
    dispatch(createAction(USER_ACTION_TYPES.FETCH_USER_FAILED, error));
  }
};

export const putUserAsync = (data: UserProps) => async (dispatch: Dispatch) => {
  dispatch(createAction(USER_ACTION_TYPES.FETCH_USER_START));
  try {
    await PUT_USER(data);
    dispatch(createAction(USER_ACTION_TYPES.FETCH_USER_SUCCESS, data));
  } catch (error) {
    dispatch(createAction(USER_ACTION_TYPES.FETCH_USER_FAILED, error));
  }
};

export const postFirstTimeOpenAsync =
  (isFirstTimeOpen: boolean) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(
        createAction(
          USER_ACTION_TYPES.POST_FIRST_TIME_OPEN_SUCCESS,
          isFirstTimeOpen,
        ),
      );
    } catch (error) {
      dispatch(createAction(USER_ACTION_TYPES.POST_FIRST_TIME_OPEN_FAILED));
    }
  };
