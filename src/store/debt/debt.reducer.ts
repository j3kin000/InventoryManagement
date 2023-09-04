import {AnyAction} from 'redux';
import {DEBT_ACTION_TYPES, DebtState} from './debt.types';
import {toastAlert} from '../../utils/utils';

export const INITIAL_STATE: DebtState = {
  isLoading: false,
  error: null,
  debt: [],
};

export default (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case DEBT_ACTION_TYPES.FETCH_DEBT_START:
    case DEBT_ACTION_TYPES.POST_DEBT_START:
    case DEBT_ACTION_TYPES.PUT_DEBT_START:
    case DEBT_ACTION_TYPES.DELETE_DEBT_START:
    case DEBT_ACTION_TYPES.DELETE_ALL_DEBT_START:
      return {...state, isLoading: true, error: null};

    case DEBT_ACTION_TYPES.FETCH_DEBT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,

        debt: action.payload,
      };

    case DEBT_ACTION_TYPES.POST_DEBT_SUCCESS: {
      const message = {
        title: 'Yey!',
        description: 'Sucesfully Created...',
        type: 'success',
      };
      toastAlert(message);
      return {
        ...state,
        isLoading: false,
        error: null,
        debt: [...state.debt, action.payload],
      };
    }

    case DEBT_ACTION_TYPES.PUT_DEBT_SUCCESS: {
      const message = {
        title: 'Yey!',
        description: 'Sucesfully Updated...',
        type: 'success',
      };
      toastAlert(message);

      return {
        ...state,
        isLoading: false,
        error: null,
        debt: state.debt.map(item =>
          item.uid === action.payload.uid ? action.payload : item,
        ),
      };
    }

    case DEBT_ACTION_TYPES.DELETE_DEBT_SUCCESS: {
      const message = {
        title: 'Yey!',
        description: 'Sucesfully Deleted...',
        type: 'success',
      };
      toastAlert(message);
      return {
        ...state,
        isLoading: false,
        error: null,
        debt: state.debt.filter(item => item.uid !== action.payload),
      };
    }
    case DEBT_ACTION_TYPES.DELETE_ALL_DEBT_SUCCESS: {
      const message = {
        title: 'Yey!',
        description: 'Sucesfully Deleted...',
        type: 'success',
      };
      toastAlert(message);
      return {
        ...state,
        isLoading: false,
        error: null,
        debt: action.payload,
      };
    }
    case DEBT_ACTION_TYPES.FETCH_DEBT_FAILED:
    case DEBT_ACTION_TYPES.POST_DEBT_FAILED:
    case DEBT_ACTION_TYPES.PUT_DEBT_FAILED:
    case DEBT_ACTION_TYPES.DELETE_DEBT_FAILED:
    case DEBT_ACTION_TYPES.DELETE_ALL_DEBT_FAILED: {
      const message = {
        title: 'Ops!',
        description: 'Please try agains...',
        type: 'error',
      };
      toastAlert(message);
      return {...state, isLoading: false, error: action.payload};
    }

    default:
      return state;
  }
};
