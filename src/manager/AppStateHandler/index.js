import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAppState } from 'services/appState/actions';
import AppStateHandler from './AppStateHandler';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAppState,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AppStateHandler);
