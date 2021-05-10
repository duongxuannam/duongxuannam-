import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GlobalToastSelector from 'services/globalToast/selectors';
import { clearToast } from 'services/globalToast/actions';
import GlobalToast from './GlobalToast';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearToast,
    },
    dispatch
  );

const mapStateToProps = state => ({
  isVisible: GlobalToastSelector.getIsVisible(state),
  toastProps: GlobalToastSelector.getToastProps(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalToast);
