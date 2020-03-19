import * as types from './types';

/**
 * Set network info
 * @param {Boolean} isConnected
 */
export const setIsConnected = isConnected => ({
  type: types.UPDATE,
  payload: isConnected,
});
