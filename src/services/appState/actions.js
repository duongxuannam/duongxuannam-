import * as types from './types';

/**
 * Set app state
 * @param {String} state
 */
export const setAppState = state => ({
  type: types.UPDATE,
  payload: state,
});
