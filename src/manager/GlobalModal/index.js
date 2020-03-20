import { connect } from 'react-redux';
import GlobalModalSelector from 'services/globalModal/selectors';
import GlobalModal from './GlobalModal';

export default connect(
  state => ({
    isVisible: GlobalModalSelector.getIsVisible(state),
    modalName: GlobalModalSelector.getModalName(state),
    modalProps: GlobalModalSelector.getModalProps(state),
  }),
  null
)(GlobalModal);
