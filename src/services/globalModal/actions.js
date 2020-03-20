/**
 * utils & constants
 */
/**
 * internal imports
 */
import * as types from './types';

/**
 * @param {String} modalName
 * @param {Object} modalProps
 */
export const showModal = (modalName, modalProps) => ({
  type: types.SHOW_MODAL,
  payload: {
    modalName,
    modalProps,
  },
});

export const hideModal = () => ({
  type: types.HIDE_MODAL,
});

export const clearModal = () => ({
  type: types.CLEAR_MODAL,
});

/**
 * @param {Object} modalProps
 */
export const SET_MODAL_PROPS = modalProps => ({
  type: types.SET_MODAL_PROPS,
  payload: modalProps,
});
