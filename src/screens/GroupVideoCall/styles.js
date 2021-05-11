import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // container: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  containerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  btn: { marginVertical: 40 },
  text: {
    fontSize: 30,
  },
  rtcview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    width: '80%',
    backgroundColor: 'black',
  },
  rtc: {
    width: '80%',
    height: '100%',
  },
  toggleButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
