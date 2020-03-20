import * as types from './types';

const initialState = {
  appState: 'active',
};

/**
 * Error reducer
 */
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.UPDATE:
      return {
        ...state,
        appState: payload,
      };
    default:
      return state;
  }
};
