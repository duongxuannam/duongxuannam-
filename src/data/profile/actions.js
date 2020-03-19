/**
 * APIs
 */
import ProfileApi from 'api/profileApi';
/**
 * internal imports
 */
import * as types from './types';

//
// ────────────────────────────────────────────────────────────── I ──────────
//   :::::: G E T   P R O F I L E : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
//

const getProfileRequest = () => ({
  type: types.GET_PROFILE_REQUEST,
});

const getProfileSuccess = data => ({
  type: types.GET_PROFILE_SUCCESS,
  payload: data,
});

const getProfileFailure = () => ({
  type: types.GET_PROFILE_FAILURE,
});

export const getProfile = () => async dispatch => {
  try {
    dispatch(getProfileRequest());
    const response = await ProfileApi.getProfile();
    dispatch(getProfileSuccess(response));
  } catch (error) {
    dispatch(getProfileFailure());
  }
};
