import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideModal, clearModal } from 'services/globalModal/actions';
import ModalLoading from './ModalLoading';

const mapDispatchToProps = dispatch => bindActionCreators({ hideModal, clearModal }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(ModalLoading);
