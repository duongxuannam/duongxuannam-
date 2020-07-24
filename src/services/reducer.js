import {combineReducers} from 'redux';
import {reducer as networkInfoReducer} from './networkInfo/reducer';
import {reducer as appStateReducer} from './appState/reducer';
import {reducer as globalModalReducer} from './globalModal/reducer';
import {reducer as globalToastReducer} from './globalToast/reducer';
/**
 * Main Services reducer
 */
const reducer = combineReducers({
  networkInfo: networkInfoReducer,
  appState: appStateReducer,
  globalModal: globalModalReducer,
  globalToast: globalToastReducer,
});

export default reducer;
