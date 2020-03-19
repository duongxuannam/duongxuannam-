import get from 'lodash/get';

const getUser = state => get(state.data.profile, 'user', {});

const getUserName = state => get(state.data.profile, ['user', 'name'], {});

const ProfileSelector = {
  getUser,
  getUserName,
};

export default ProfileSelector;
