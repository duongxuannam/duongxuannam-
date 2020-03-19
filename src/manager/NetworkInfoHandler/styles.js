import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'utils/utility';

export default StyleSheet.create({
  wrapNoNetwork: {
    top: getStatusBarHeight(),
    width: '100%',
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  noNetworkText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
