import {USER_ACTION_TYPES, UserState} from './user.types';
import {AnyAction} from 'redux';

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};
export default (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case USER_ACTION_TYPES.POST_USER_START:
    case USER_ACTION_TYPES.FETCH_USER_START:
    case USER_ACTION_TYPES.PUT_USER_START:
      return {...state, isLoading: true};

    case USER_ACTION_TYPES.POST_USER_SUCCESS:
    case USER_ACTION_TYPES.FETCH_USER_SUCCESS:
    case USER_ACTION_TYPES.PUT_USER_SUCCESS:
      return {...state, isLoading: false, currentUser: action.payload};

    case USER_ACTION_TYPES.POST_USER_FAILED:
    case USER_ACTION_TYPES.FETCH_USER_FAILED:
    case USER_ACTION_TYPES.PUT_USER_FAILED:
      return {...state, isLoading: false, error: action.payload};

    default:
      return state;
  }
};
