import { combineReducers } from 'redux';
import { reducer as networkInfoReducer } from './networkInfo/reducer';

/**
 * Main Services reducer
 */
const reducer = combineReducers({
  networkInfo: networkInfoReducer,
});

export default reducer;
