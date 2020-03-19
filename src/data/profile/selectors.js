import get from 'lodash/get';

const getUser = state => get(state.data.profile, 'user', {});

const ProfileSelector = {
  getUser,
};

export default ProfileSelector;
