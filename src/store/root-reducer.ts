import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import inventoryReducer from './inventory/inventory.reducer';
import productReducer from './product/product.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
  product: productReducer,
});
