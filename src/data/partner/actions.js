import PartnerApi from 'api/partnerApi';

import * as types from './types';

//
// ──────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: G E T   P A R T N E R  : :  :   :    :     :        :
// ──────────────────────────────────────────────────────────────────────────────────
//

export const getPartnersRequest = () => ({
  type: types.GET_PARTNER_REQUEST,
});

export const getPartnersSuccess = data => ({
  type: types.GET_PARTNERS_SUCCESS,
  payload: data,
});

export const getPartnersFailure = () => ({
  type: types.GET_PARTNERS_FAILURE,
});

export const getPartners = () => async dispatch => {
  try {
    dispatch(getPartnersRequest());
    const response = await PartnerApi.getPartners();
    dispatch(getPartnersSuccess(response));
  } catch (error) {
    dispatch(getPartnersFailure());
  }
};
