import { Platform as NativePlatform } from 'react-native';
import Config from 'react-native-config';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import Constants from './constants';

const APP_USE_TRANSLUCENT_STATUS_BAR = true;

const PLATFORM = NativePlatform.OS;
const isAndroid = PLATFORM === 'android';
const isIos = PLATFORM === 'ios';
const hasNotch = DeviceInfo.hasNotch();
const androidAPILevel = isAndroid ? NativePlatform.Version : 0;
const androidVersion = isAndroid ? DeviceInfo.getSystemVersion() : '';
const iosVersion = isIos ? NativePlatform.Version : 0;
const isSupportTranslucentBar = (isIos && !hasNotch) || androidAPILevel >= 21;
const isSupportStatusBarContent = APP_USE_TRANSLUCENT_STATUS_BAR && (isIos || androidAPILevel > 22);
const DeviceId = getUniqueId();
const deviceModel = DeviceInfo.getModel();
const KeyboardEvent = {
  Show: isIos ? 'keyboardWillShow' : 'keyboardDidShow',
  Hide: isIos ? 'keyboardWillHide' : 'keyboardDidHide',
};
const ConnectionEvent = 'connectionChange';
// check app version
const nativeVersion = DeviceInfo.getVersion();
const jsVersion = Constants.CODE_BUNDLE_ID;

const isDev = !!global.__DEV__;
const isProduction = !isDev && Config.IS_TEST_MODE === 'false';
const isBuildTest = !isDev && Config.IS_TEST_MODE === 'true';
const enableAnalytic = isProduction || isBuildTest;
const APP_ID = isProduction
  ? 'b240c7ba56830b0d8b0f3c8392c4813a'
  : '3deb9fd76db47dca2d3e4853453651b1';

const Platform = {
  APP_ID,
  APP_USE_TRANSLUCENT_STATUS_BAR,
  IS_TEST_MODE: Config.IS_TEST_MODE === 'true',
  androidAPILevel,
  androidVersion,
  LGV_APP_ID: Config.LGV_APP_ID,
  ConnectionEvent,
  DeviceId,
  enableAnalytic,
  deviceModel,
  hasNotch,
  iosVersion,
  isAndroid,
  isBuildTest,
  isDev,
  isIos,
  isProduction,
  isSupportStatusBarContent,
  isSupportTranslucentBar,
  KeyboardEvent,
  nativeVersion,
  jsVersion,
  OS: PLATFORM,
};

export default Platform;
