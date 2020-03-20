import { StyleSheet } from 'react-native';
import height from './height';
import Colors from '../colors';
import Border from './border';
import Common from './font';

export const ObjectStyles = {
  itemShadow: {
    elevation: 1,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.25,
  },
  itemBorderBottom: {
    borderBottomWidth: Border.thin,
    borderBottomColor: Colors.polo_blue,
  },
  itemBorderTop: {
    borderTopWidth: Border.thin,
    borderTopColor: Colors.light_gray,
  },
  itemTextShadow: {
    textShadowColor: Colors.black40,
    textShadowRadius: 2,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 2,
  },
};

export default StyleSheet.create({
  flex1Center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hide: { opacity: 0 },
  show: { opacity: 1 },
  fade: { opacity: 0.5 },
  flex1: { flex: 1 },
  absoluteFill: { ...StyleSheet.absoluteFillObject },
  absoluteFillCenter: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexDirectionRow: { flexDirection: 'row' },
  activityIndicator: {
    marginVertical: height.res5,
  },
  emptyMessage: {
    color: Colors.polo_blue,
    fontSize: 14,
    lineHeight: 30,
    textAlign: 'center',
  },
  space: {
    height: 40,
  },
  absolute: { position: 'absolute' },
  transparentBg: { backgroundColor: 'transparent' },
  flexCenter: { justifyContent: 'center', alignItems: 'center' },
  // color styles utils
  colorMain: { color: Colors.main },
  colorTealishGreen: { color: Colors.tealishGreen },
  colorWhite: { color: Colors.white },
  backgroundColorWhite: { backgroundColor: Colors.white },
  text: { fontSize: Common.res14 },
  widthP100: { width: '100%' },
});
