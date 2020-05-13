import { delay } from 'utils/frames';
import axios from 'axios';

const getProfile = async () => {
  console.log('what');
  await delay(1000);
  return {
    user: {
      name: 'Nam dang yeu',
    },
  };
};

const testApi = async () => axios.get('/getArrUserInfo');

export default {
  getProfile,
  testApi,
};
