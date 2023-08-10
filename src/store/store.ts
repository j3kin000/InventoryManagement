import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
  AnyAction,
} from 'redux';
import {persistReducer, persistStore, PersistConfig} from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootReducer} from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

type PersistConfigProps = PersistConfig<RootState> & {
  blacklist: (keyof RootState)[];
};

const persistConfig: PersistConfigProps = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  compose(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);
