import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1 },
  customerContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  actionContainer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    minHeight: 50,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subActionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4A8AF4',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  localContainer: {
    position: 'absolute',
    zIndex: 100,
    bottom: 150,
    right: 20,
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: 'pink',
    overflow: 'hidden',
  },

  rtcBox: {
    flex: 1,
  },
});
