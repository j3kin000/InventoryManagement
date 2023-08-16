import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import inventoryReducer from './inventory/inventory.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
});
