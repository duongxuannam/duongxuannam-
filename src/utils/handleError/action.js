import Logger from 'utils/logger';
import BugSnagManager from 'utils/bugsnagManager';

function handleFunctionError(
  error,
  title,
  options,
  metaData
  // error: Error,
  // title: String,
  // options: { log: Boolean, breadCrumb: Boolean, notify: Boolean },
  // metaData: Object
) {
  const { log = true, breadCrumb = false, notify = false } = options || {};
  const errorTitle = typeof title === 'string' ? `${title} Error` : 'Error';

  if (log) {
    Logger.warn(errorTitle, error);
  }

  if (breadCrumb) {
    const _metaData = { ...(metaData || {}), error: {} };
    if (typeof error.code === 'number') {
      _metaData.error.code = error.code;
    }
    if (typeof error.message === 'string') {
      _metaData.error.message = error.message;
    }
    BugSnagManager.getInstance().leaveBreadcrumb(errorTitle, _metaData);
  }

  if (notify) {
    BugSnagManager.getInstance().notify(error);
  }
}

export default {
  handleFunction: handleFunctionError,
};
