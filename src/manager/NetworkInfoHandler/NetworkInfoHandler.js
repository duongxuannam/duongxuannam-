import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
/**
 * utils & constants
 */
import { l10n } from 'languages';
import { doNothing } from 'constants/propsConstant';
import HandleError from 'utils/handleError';
/**
 * internal imports
 */
import styles from './styles';

class NetworkInfoHandler extends React.PureComponent {
  /**
   * Should config animation before mounted
   */
  componentDidMount = () => {
    this.unsubscribe = NetInfo.addEventListener(this.onConnectionChange);
    AppState.addEventListener('change', this.onAppStateChange);
  };

  componentWillUnmount = () => {
    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe();
    }
    AppState.removeEventListener('change', this.onAppStateChange);
  };

  onAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.checkNetStatus();
    }
  };

  checkNetStatus = () => {
    NetInfo.fetch()
      .then(this.onConnectionChange)
      .catch(error => {
        HandleError.Action.handleFunction(error, 'NetInfo.fetch', { breadCrumb: true });
      });
  };

  /**
   * On network change
   */
  onConnectionChange = state => {
    const { setIsConnected, isConnected: isConnectedProps } = this.props;
    if (state.isConnected !== isConnectedProps) {
      setIsConnected(state.isConnected);
    }
  };

  render() {
    const { isConnected } = this.props;
    if (isConnected) {
      return null;
    }
    return (
      <View style={styles.wrapNoNetwork}>
        <Text style={styles.noNetworkText}>{l10n.no_internet_connection}</Text>
      </View>
    );
  }
}

NetworkInfoHandler.propTypes = {
  isConnected: PropTypes.bool,
  setIsConnected: PropTypes.func,
};

NetworkInfoHandler.defaultProps = {
  isConnected: true,
  setIsConnected: doNothing,
};

export default NetworkInfoHandler;
