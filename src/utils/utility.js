import { StatusBar, Linking, Alert } from 'react-native';
import isNil from 'lodash/isNil';
import { l10n } from 'languages';
import Platform from './platform';
import Constants from './constants';
import HandleError from './handleError';

/**
 * Get the current route name
 * @param {Object} navigationState Navigation state
 */
export const getActiveRouteName = navigationState => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};

export const getActiveRouteStack = (navigationState, rootNavigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  const _rootNavigationState = rootNavigationState || route;
  if (route.routes) {
    return getActiveRouteStack(route, _rootNavigationState);
  }
  return {
    screen: route.routeName,
    stack: navigationState?.routeName,
    rootStack: _rootNavigationState?.routeName,
  };
};

/**
 * Get height of status bar
 */
export const getStatusBarHeight = skipAndroid => {
  if (Platform.isIos) {
    return Platform.hasNotch ? 44 : 20;
  }
  if (skipAndroid) {
    return 0;
  }
  return StatusBar.currentHeight;
};

/**
 * Get random hex color
 */
export const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const isRemoteUrl = url => url && url.includes('https://');

export const getLocation = location => {
  if (isNil(location)) {
    return '';
  }
  const cityOrAddress = location.city || location.address || '';
  return cityOrAddress
    .replace(', Việt Nam', '')
    .replace(', Viet Nam', '')
    .replace(', Vietnam', '');
};

export const convertToInternational = number => {
  if (number && number.length > 0 && number[0] === '0') {
    return `+84${number.slice(1)}`;
  }
  return number;
};

export async function openUrlByLinking(url) {
  const functionName = 'openUrlByLinking';
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  } catch (error) {
    HandleError.Action.handleFunction(error, functionName, { breadCrumb: true });
  }
}

export const call = async (phoneNumber, prompt = false) => {
  let url = `tel:${phoneNumber}`;
  if (prompt && Platform.isIos) {
    url = `telprompt:${phoneNumber}`;
  }
  openUrlByLinking(url);
};

export const getModelDescription = ({ model: m }) => {
  if (!m) {
    return null;
  }
  if (m && m.weight && m.box_dimensions) {
    return `${m.weight} tấn | ${m.box_dimensions
      .split('x')
      .map((d, idx) => `${['dài', 'rộng', 'cao'][idx]} ${d}m`)
      .join(' x ')}`;
  }
  if (m.box_dimensions) {
    const parentheseRegex = /\((.*?)\)/;
    if (m.box_dimensions.match(parentheseRegex)) {
      return `${m.box_dimensions.split(parentheseRegex)[0] || ''} ${m.box_dimensions
        .match(/\((.*?)\)/)[1]
        .split('x')
        .map((d, idx) => `${['dài', 'rộng', 'cao'][idx]} ${d}m`)
        .join(' x ')}`;
    }
    return m.box_dimensions;
  }
  return null;
};

export const getCustomDescription = truck => {
  const weight = (truck.capacity && `${truck.capacity} tấn -`) || '';
  const length = (truck.length && `dài ${truck.length}m`) || '';
  const truckWidth = (truck.width && `rộng ${truck.width}m`) || '';
  const truckHeight = (truck.height && `cao ${truck.height}m`) || '';
  return `${weight} ${length} ${truckWidth} ${truckHeight}`;
};

export const getNumberOnly = (string = '') => string.replace(/[^\d]+/g, '');

/**
 * Get stringee provider phone number base on targetPhoneNumber want to call
 */
export const getStringeeProviderPhoneNumber = targetPhoneNumber => {
  const arrMobiPhone = ['8470', '8476', '8477', '8478', '8479', '8489', '8490', '8493'];
  const arrVinaPhone = ['8481', '8482', '8483', '8484', '8485', '8488', '8491', '8494'];
  const arrViettel = [
    '8432',
    '8433',
    '8434',
    '8435',
    '8436',
    '8437',
    '8438',
    '8439',
    '8486',
    '8496',
    '8497',
    '8498',
  ];
  for (let i = 0; i < arrMobiPhone.length; i += 1) {
    const needle = arrMobiPhone[i];
    const { length } = needle;
    if (targetPhoneNumber.substring(0, length) === needle) {
      return Constants.STRINGEE_MOBIPHONE_PHONE_NUMBER;
    }
  }
  for (let i = 0; i < arrViettel.length; i += 1) {
    const needle = arrViettel[i];
    const { length } = needle;
    if (targetPhoneNumber.substring(0, length) === needle) {
      return Constants.STRINGEE_VIETTEL_PHONE_NUMBER;
    }
  }
  for (let i = 0; i < arrVinaPhone.length; i += 1) {
    const needle = arrVinaPhone[i];
    const { length } = needle;
    if (targetPhoneNumber.substring(0, length) === needle) {
      return Constants.STRINGEE_VINAPHONE_PHONE_NUMBER;
    }
  }
  return Constants.STRINGEE_MOBIPHONE_PHONE_NUMBER;
};

export const showAlert = (message, callback, messCancel, messsOk) => {
  if (!callback) {
    return;
  }
  Alert.alert(
    l10n.notifications,
    message,
    [
      { text: messCancel, onPress: () => callback(Constants.ALERT_TYPE.CANCEL), style: 'cancel' },
      { text: messsOk, onPress: () => callback(Constants.ALERT_TYPE.OK) },
    ],
    { cancelable: false }
  );
};

export const getFilePathForPlatform = response => {
  if (Platform.isIos) {
    return response.uri;
  }
  return response.path ? `file://${response.path}` : response.uri;
};

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
