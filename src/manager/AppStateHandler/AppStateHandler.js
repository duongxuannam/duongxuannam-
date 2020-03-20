import React from 'react';
import PropTypes from 'prop-types';
import { AppState } from 'react-native';

class AppStateHandler extends React.PureComponent {
  componentDidMount = () => {
    AppState.addEventListener('change', this.onAppStateChange);
  };

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.onAppStateChange);
  };

  onAppStateChange = nextAppState => {
    const { setAppState } = this.props;
    setAppState(nextAppState);
  };

  render() {
    return null;
  }
}

AppStateHandler.propTypes = {
  setAppState: PropTypes.func.isRequired,
};

export default AppStateHandler;
