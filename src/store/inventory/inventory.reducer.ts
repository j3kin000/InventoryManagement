import {AnyAction} from 'redux';
import {INVENTORY_ACTION_TYPES, InventoryState} from './inventory.types';
import {toastAlert} from '../../utils/utils';

const INITIAL_STATE: InventoryState = {
  isLoading: false,
  error: null,
  inventory: [],
};

export default (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case INVENTORY_ACTION_TYPES.FETCH_INVENTORY_START:
    case INVENTORY_ACTION_TYPES.POST_INVENTORY_START:
    case INVENTORY_ACTION_TYPES.PUT_INVENTORY_START:
    case INVENTORY_ACTION_TYPES.DELETE_INVENTORY_START:
    case INVENTORY_ACTION_TYPES.DELETE_ALL_INVENTORY_START:
      return {...state, isLoading: true, error: null};

    case INVENTORY_ACTION_TYPES.FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,

        inventory: action.payload,
      };

    case INVENTORY_ACTION_TYPES.POST_INVENTORY_SUCCESS: {
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
        inventory: [...state.inventory, action.payload],
      };
    }

    case INVENTORY_ACTION_TYPES.PUT_INVENTORY_SUCCESS: {
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
        inventory: state.inventory.map(item =>
          item.uid === action.payload.uid ? action.payload : item,
        ),
      };
    }

    case INVENTORY_ACTION_TYPES.DELETE_INVENTORY_SUCCESS: {
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
        inventory: state.inventory.filter(item => item.uid !== action.payload),
      };
    }
    case INVENTORY_ACTION_TYPES.DELETE_ALL_INVENTORY_SUCCESS: {
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
        inventory: action.payload,
      };
    }
    case INVENTORY_ACTION_TYPES.FETCH_INVENTORY_FAILED:
    case INVENTORY_ACTION_TYPES.POST_INVENTORY_FAILED:
    case INVENTORY_ACTION_TYPES.PUT_INVENTORY_FAILED:
    case INVENTORY_ACTION_TYPES.DELETE_INVENTORY_FAILED:
    case INVENTORY_ACTION_TYPES.DELETE_ALL_INVENTORY_FAILED: {
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
