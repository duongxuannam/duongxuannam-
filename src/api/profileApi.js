import { delay } from 'utils/frames';

const getProfile = async () => {
  console.log('what');
  await delay(1000);
  return {
    user: {
      name: 'Nam dang yeu',
    },
  };
};
export default {
  getProfile,
};
