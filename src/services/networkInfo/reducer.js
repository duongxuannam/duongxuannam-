import * as types from './types';

const initialState = {
  isConnected: true,
};

/**
 * Error reducer
 */
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.UPDATE:
      return {
        ...state,
        isConnected: payload,
      };
    default:
      return state;
  }
};
