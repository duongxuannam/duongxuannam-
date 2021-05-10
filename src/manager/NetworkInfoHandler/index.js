import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIsConnected } from 'services/networkInfo/actions';
import NetworkInfoHandler from './NetworkInfoHandler';

import NetworkInfoSelector from 'services/networkInfo/selectors';

const mapStateToProps = state => ({
  isConnected: NetworkInfoSelector.getIsConnected(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ setIsConnected }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NetworkInfoHandler);
