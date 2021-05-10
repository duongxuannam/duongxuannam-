import React from 'react';
import PropTypes from 'prop-types';
/**
 * Firebase
 */
import FCMService from 'services/firebaseMessagingService';
import LocalNotificationService from 'services/localNotificationService';
/**
 * utils & constants
 */
import { doNothing } from 'constants/propsConstant';

class NotificationHandler extends React.PureComponent {
  componentDidMount() {
    FCMService.registerAppWithFCM();
    FCMService.register(this.onRegister, this.onNotification, this.onOpenNotification);
    LocalNotificationService.configure(this.onOpenNotification);
  }

  onRegister = token => {
    console.log('[App] onRegister: ', token);
  };

  onNotification = notify => {
    console.log('[App] onNotification: ', notify);
    const options = {
      soundName: 'default',
      playSound: true, //,
      // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
      // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
    };
    LocalNotificationService.showNotification(0, notify.title, notify.body, notify, options);
  };

  onOpenNotification = notify => {
    console.log('handle notification in here');
    console.log('[App] onOpenNotification: ', notify);
    alert('Open Notification: ' + notify?.body);
  };

  render() {
    return null;
  }
}

NotificationHandler.propTypes = {
  isConnected: PropTypes.bool,
  setIsConnected: PropTypes.func,
};

NotificationHandler.defaultProps = {
  isConnected: true,
  setIsConnected: doNothing,
};

export default NotificationHandler;
