import {combineReducers} from 'redux';
import dataReducer from 'data/reducer';
import servicesReducer from 'services/reducer';

/**
 * Final Reducer
 */
const appReducer = combineReducers({
  data: dataReducer,
  services: servicesReducer,
});

export default appReducer;
