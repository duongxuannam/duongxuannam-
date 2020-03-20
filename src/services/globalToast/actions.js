/**
 * internal imports
 */
import * as types from './types';

/**
 * @param {Object} toastProps
 */
export const showToast = toastProps => ({
  type: types.SHOW_TOAST,
  payload: {
    toastProps,
  },
});

export const clearToast = () => ({
  type: types.CLEAR_TOAST,
});
