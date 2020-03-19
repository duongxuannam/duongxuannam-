/**
 * general handler for api response.
 * thow new Error if api response error
 * @param {Object} response
 */
const handleApiError = response => {
  if (!response) {
    throw new Error('server_not_response');
  }
  const { errors } = response;
  if (!errors) {
    return response;
  }
  const message = Array.isArray(errors) ? errors.join(' ') : 'unknown error';
  throw new Error(message);
};

export default {
  handle: handleApiError,
};
