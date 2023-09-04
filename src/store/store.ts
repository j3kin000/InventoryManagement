import {createStore, applyMiddleware, compose, AnyAction} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk, {ThunkDispatch} from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootReducer} from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  timeout: 500,
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  compose(applyMiddleware(thunk)),
);
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const persistor = persistStore(store);
