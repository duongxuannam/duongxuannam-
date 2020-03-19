import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import * as types from './types';

const initialState = {
  user: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_REQUEST:
      return { ...state };
    case types.GET_PROFILE_SUCCESS:
      return { ...state, user: action?.payload?.user || {} };
    case types.GET_PROFILE_FAILURE:
      return { ...state };
    default:
      return state;
  }
};

export const PROFILE_PERSIST_KEY = 'PLAYHARD@profile';

const persistConfig = {
  key: PROFILE_PERSIST_KEY,
  storage: AsyncStorage,
  blacklist: ['match'],
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, profileReducer);

export default persistedReducer;
