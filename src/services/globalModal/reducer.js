import { MODAL_NAMES } from 'constants/modalConstants';
import * as types from './types';

const initialState = {
  isVisible: false,
  modalName: '',
  modalProps: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
      if (state.isVisible && state.modalName === MODAL_NAMES.COMMON.MODAL_BLACKLIST) {
        return state;
      }
      return {
        ...state,
        isVisible: true,
        modalName: action.payload.modalName,
        modalProps: action.payload.modalProps,
      };
    case types.SET_MODAL_PROPS:
      return {
        ...state,
        modalProps: action.payload,
      };
    case types.HIDE_MODAL:
      return {
        ...state,
        isVisible: false,
      };
    case types.CLEAR_MODAL:
      return initialState;
    default:
      return state;
  }
};
