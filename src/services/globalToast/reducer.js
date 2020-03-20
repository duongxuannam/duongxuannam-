import * as types from './types';

const initialState = {
  isVisible: false,
  toastProps: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_TOAST:
      return {
        ...state,
        isVisible: true,
        toastProps: action.payload.toastProps,
      };
    case types.CLEAR_TOAST:
      return initialState;
    default:
      return state;
  }
};
