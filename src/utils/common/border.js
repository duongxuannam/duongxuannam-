import { StyleSheet } from 'react-native';
import Font from './font';

const radius = {
  superSmall: Font.res5,
  verySmall: Font.res7,
  small: Font.res9,
  normal: Font.res11,
  big: Font.res14,
  veryBig: Font.res16,
  superBig: Font.res18,
  extraSuperBig: Font.res25,
  extremelyBig: Font.res30,
};

export default {
  radius,
  thin: StyleSheet.hairlineWidth,
  medium: StyleSheet.hairlineWidth * 2,
  semiBold: StyleSheet.hairlineWidth * 3,
  bold: StyleSheet.hairlineWidth * 4,
};
