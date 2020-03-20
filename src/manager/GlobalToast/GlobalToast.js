import React from 'react';
import PropTypes from 'prop-types';

import Toast from './Toast';

class GlobalToast extends React.PureComponent {
  render() {
    const { toastProps, isVisible, clearToast } = this.props;
    if (!isVisible) {
      return null;
    }
    return <Toast {...toastProps} clearToast={clearToast} />;
  }
}

GlobalToast.propTypes = {
  toastProps: PropTypes.shape({}),
  isVisible: PropTypes.bool,
  clearToast: PropTypes.func.isRequired,
};

GlobalToast.defaultProps = {
  toastProps: null,
  isVisible: false,
};

export default GlobalToast;
