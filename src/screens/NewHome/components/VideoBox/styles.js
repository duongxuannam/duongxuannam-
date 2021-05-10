import { StyleSheet } from 'react-native';
import Screens, { responsiveFontSize, responsiveHeight, responsiveWidth } from 'utils/screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 0.4,
    borderColor: 'black',
    backgroundColor: '#363537',
  },
  nameBox: {
    position: 'absolute',
    zIndex: 100,
    top: 8,
    left: 8,
    padding: 8,
    width: responsiveWidth(120),
    justifyContent: 'center',
  },
  nameBoxCurrent: {
    position: 'absolute',
    zIndex: 100,
    top: 8,
    left: 8,
    padding: 10,
    width: responsiveWidth(290),
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flexWrap: 'wrap',
  },
  iconBox: {
    position: 'absolute',
    zIndex: 100,
    top: 8,
    right: 8,
    borderRadius: 10,
    padding: 10,
    height: 40,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rtcBox: {
    width: '100%',
    height: '100%',
  },
});
