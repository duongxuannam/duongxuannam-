import React from 'react';
import PropTypes from 'prop-types';
import { MODAL_NAMES } from 'constants/modalConstants';
import ModalLoading from 'components/modal/ModalLoading';

const MODAL_COMPONENTS = {
  /**
   * @COMMON
   */
  [MODAL_NAMES.COMMON.MODAL_LOADING]: ModalLoading,
};

class GlobalModal extends React.PureComponent {
  render() {
    const { modalName, modalProps, isVisible } = this.props;
    const ComponentToRender = MODAL_COMPONENTS[modalName];
    if (ComponentToRender) {
      return <ComponentToRender modalName={modalName} isVisible={isVisible} {...modalProps} />;
    }
    return null;
  }
}

GlobalModal.propTypes = {
  modalName: PropTypes.string,
  modalProps: PropTypes.shape({}),
  isVisible: PropTypes.bool,
};

GlobalModal.defaultProps = {
  modalName: '',
  modalProps: null,
  isVisible: false,
};

export default GlobalModal;
