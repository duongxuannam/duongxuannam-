import { delay } from 'utils/frames';

const getPartners = async () => {
  await delay(1000);
  return [{ name: 'Nammmm' }, { name: 'Nu' }];
};
export default {
  getPartners,
};
