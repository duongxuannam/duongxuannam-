import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';
/**
 * Middleware
 */
import thunk from 'redux-thunk';
import { autoMergeLevel2, createMigrate, persistReducer, persistStore } from 'redux-persist';
import Platform from 'utils/platform';
import appReducer from '../reducers';

const stateMigrations = {
  0: () => ({}),
};

const persistConfig = {
  key: 'root',
  version: 0,
  storage: AsyncStorage,
  blacklist: [],
  whitelist: [],
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(stateMigrations),
  timeout: null,
};

const finalReducer = persistReducer(persistConfig, appReducer);
const finalMiddleware = [];
finalMiddleware.push(thunk);

export const store = Platform.isDev
  ? createStore(finalReducer, composeWithDevTools(applyMiddleware(...finalMiddleware)))
  : createStore(finalReducer, applyMiddleware(...finalMiddleware));

// export const store = createStore(appReducer);

export const persistor = persistStore(store);
