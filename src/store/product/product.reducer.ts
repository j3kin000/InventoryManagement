import {AnyAction} from 'redux';
import {toastAlert} from '../../utils/utils';
import {PRODUCT_ACTION_TYPES, ProductState} from './product.types';

const INITIAL_STATE: ProductState = {
  isLoading: false,
  error: null,
  product: [],
};

export default (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_START:
    case PRODUCT_ACTION_TYPES.POST_PRODUCT_START:
    case PRODUCT_ACTION_TYPES.PUT_PRODUCT_START:
    case PRODUCT_ACTION_TYPES.DELETE_PRODUCT_START:
    case PRODUCT_ACTION_TYPES.DELETE_ALL_PRODUCT_START:
      return {...state, isLoading: true, error: null};

    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,

        product: action.payload,
      };

    case PRODUCT_ACTION_TYPES.POST_PRODUCT_SUCCESS: {
      const message = {
        title: 'Yey!',
        description: 'Sucesfully Created...',
        type: 'info',
      };
      toastAlert(message);
      return {
        ...state,
        isLoading: false,
        error: null,
        product: [...state.product, action.payload],
      };
    }

    case PRODUCT_ACTION_TYPES.PUT_PRODUCT_SUCCESS: {
      const message = {
        title: 'Yey!',
        description: 'Sucesfully Updated...',
        type: 'info',
      };
      toastAlert(message);

      return {
        ...state,
        isLoading: false,
        error: null,
        product: state.product.map(item =>
          item.uid === action.payload.uid ? action.payload : item,
        ),
      };
    }

    case PRODUCT_ACTION_TYPES.DELETE_PRODUCT_SUCCESS: {
      const message = {
        title: 'Yey!',
        description: 'Sucesfully Deleted...',
        type: 'info',
      };
      toastAlert(message);
      return {
        ...state,
        isLoading: false,
        error: null,
        product: state.product.filter(item => item.uid !== action.payload),
      };
    }

    case PRODUCT_ACTION_TYPES.DELETE_ALL_PRODUCT_SUCCESS: {
      const message = {
        title: 'Yey!',
        description: 'Sucesfully Deleted...',
        type: 'info',
      };
      toastAlert(message);
      return {
        ...state,
        isLoading: false,
        error: null,
        product: action.payload,
      };
    }
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_FAILED:
    case PRODUCT_ACTION_TYPES.POST_PRODUCT_FAILED:
    case PRODUCT_ACTION_TYPES.PUT_PRODUCT_FAILED:
    case PRODUCT_ACTION_TYPES.DELETE_PRODUCT_FAILED:
    case PRODUCT_ACTION_TYPES.DELETE_ALL_PRODUCT_FAILED: {
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
