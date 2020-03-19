/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import BugSnagManager from 'utils/bugsnagManager';

import App from './App';
import { name as appName } from './app.json';

BugSnagManager.getInstance().init();

AppRegistry.registerComponent(appName, () => App);
