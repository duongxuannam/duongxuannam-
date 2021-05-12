/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Navigation from 'navigation';

import CommonService from 'manager/CommonService';
import AppStateHandler from 'manager/AppStateHandler';
import NetworkInfoHandler from 'manager/NetworkInfoHandler';
import NotificationHandler from 'manager/NotificationHandler';
import GlobalModal from 'manager/GlobalModal';
import GlobalToast from 'manager/GlobalToast';
// Redux Store
import { persistor, store } from 'configureStore';
import Platform from 'utils/platform';

if (Platform.isAndroid) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
          <CommonService />
          <AppStateHandler />
          <NetworkInfoHandler />
          <NotificationHandler />
          <GlobalModal />
          <GlobalToast />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
