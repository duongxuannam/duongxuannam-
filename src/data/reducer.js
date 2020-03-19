import { combineReducers } from 'redux';

import PartnerReducer from './partner/reducer';
import ProfileReducer from './profile/reducer';
/**
 * Main data reducer
 */
const reducer = combineReducers({
  profile: ProfileReducer,
  partner: PartnerReducer,
});

export default reducer;
