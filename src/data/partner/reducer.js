import * as types from './types';

const initialState = {
  partners: [],
};

const partnerReducer = (state = initialState, action) => {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_PARTNERS_REQUEST:
      return { ...state, partners: [] };

    case types.GET_PARTNERS_SUCCESS:
      return { ...state, partners: payload };

    case types.GET_PARTNERS_FAILURE:
      return { ...state };

    default:
      return state;
  }
};

export default partnerReducer;
