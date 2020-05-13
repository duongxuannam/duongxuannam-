import axios from 'axios';
import Config from 'react-native-config';
import { doNothing } from 'constants/propsConstant';
import Platform from 'utils/platform';
import ErrorConstants from 'constants/errorConstants';
import { l10n } from 'languages';

const { ERROR_MESSAGES, ERROR_CODES } = ErrorConstants;

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;

let axiosSetupCompleted = false;
/**
 * set baseUrl for axios
 * if in production environment, baseUrl alway from config
 *
 * else get from params
 *
 * TODO: This function look like weird and not consistency by the way output depend on environment values.
 * Need refactor it
 *
 * @param {String} baseUrl
 */
const setBaseUrl = baseUrl => {
  console.log('baseUrl', baseUrl);
  let newBaseUrl;

  if (Platform.isProduction) {
    newBaseUrl = Config.URL_API;

    // newBaseUrl =   Constants.LOGIVAN_SERVERS.PRODUCTION;
  } else if (baseUrl) {
    newBaseUrl = baseUrl;
  } else {
    console.log('Config.URL_API', Config.URL_API);

    // newBaseUrl = Config.URL_API;
    newBaseUrl = 'http://192.168.1.47:3000';
    // newBaseUrl = Constants.LOGIVAN_SERVERS.PRODUCTION;
  }

  axios.defaults.baseURL = newBaseUrl;

  return newBaseUrl;
};

const clearBaseUrl = () => {
  axios.defaults.baseURL = '';
};

const setHeaderToken = newToken => {
  if (newToken) {
    const currentToken = axios?.defaults?.headers?.Authorization || '';
    if (currentToken === `Bearer ${newToken}`) {
      return;
    }
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      DeviceID: Platform.DeviceId,
      Platform: Platform.OS,
      Authorization: `Bearer ${newToken}`,
    };
  } else {
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      DeviceID: Platform.DeviceId,
      Platform: Platform.OS,
    };
  }
};

const clearHeaderToken = () => {
  axios.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    DeviceID: Platform.DeviceId,
    Platform: Platform.OS,
  };
};

const getErrorMessagesFromServer = responseData => {
  const { messages, _error, errors } = responseData;
  if (typeof messages === 'string') {
    return messages;
  }

  if (typeof errors === 'string') {
    return errors;
  }

  if (Array.isArray(errors)) {
    return errors.join(' ');
  }

  if (typeof _error?.message === 'string') {
    return _error.message;
  }

  if (typeof _error === 'string') {
    return _error;
  }

  return ERROR_MESSAGES.DEFAULT;
};

const setupOnResponseInterceptors = (
  onReceivedToken = doNothing,
  onUnauthenticated = doNothing
) => {
  if (axiosSetupCompleted) {
    return;
  }
  axiosSetupCompleted = true;
  setBaseUrl();
  const onResponseSuccess = response => {
    const authorization = response?.headers?.authorization || '';
    if (authorization) {
      axios.defaults.headers.Authorization = `Bearer ${authorization}`;
      onReceivedToken(authorization);
    }
    return response.data;
  };

  const onResponseError = error => {
    console.log('err ', error);
    let alertMessage = ERROR_MESSAGES.DEFAULT;
    if (!error.response) {
      switch (error.message) {
        case 'Network Error':
          alertMessage = l10n.no_internet_connection;
          break;
        default:
          alertMessage = error.message || ERROR_MESSAGES.DEFAULT;
          break;
      }
      throw new Error(alertMessage);
    }

    const {
      response: { status, data },
    } = error;
    const errorDataFromServer = data || {};

    switch (status) {
      case ERROR_CODES.BAD_REQUEST:
        alertMessage = ERROR_MESSAGES.BAD_REQUEST;
        break;
      case ERROR_CODES.UNAUTHORIZED:
        onUnauthenticated();
        break;

      case ERROR_CODES.FORBIDDEN:
        alertMessage = ERROR_MESSAGES.FORBIDDEN;
        break;
      case ERROR_CODES.TIMEOUT:
        alertMessage = ERROR_MESSAGES.TIMEOUT;
        break;
      case ERROR_CODES.UNPROCESSABLE:
        alertMessage = getErrorMessagesFromServer(errorDataFromServer);
        break;
      case ERROR_CODES.INTERNAL_SERVER_ERROR:
        alertMessage = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
        break;
      case ERROR_CODES.SERVER_NOT_AVAILABLE:
        alertMessage = ERROR_MESSAGES.SERVER_NOT_AVAILABLE;
        break;

      case ERROR_CODES.NOT_FOUND:
        alertMessage = ERROR_MESSAGES.NOT_FOUND;
        break;

      default:
        alertMessage = ERROR_MESSAGES.DEFAULT;
        break;
    }
    const finalError = new Error(alertMessage);
    finalError.code = status;
    finalError.response = error.response;

    throw finalError;
  };

  axios.interceptors.response.use(onResponseSuccess, onResponseError);
  // axios.interceptors.request.use(
  //   function(config) {
  //     // Do something before request is sent
  //     console.log('con f', config);
  //     return config;
  //   },
  //   function(error) {
  //     // Do something with request error
  //     return Promise.reject(error);
  //   }
  // );
};

const SetupAxios = {
  setBaseUrl,
  clearBaseUrl,
  setHeaderToken,
  clearHeaderToken,
  setupOnResponseInterceptors,
};

export default SetupAxios;
