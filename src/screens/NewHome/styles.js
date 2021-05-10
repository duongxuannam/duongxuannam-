import { StyleSheet } from 'react-native';
import { heightPhone, widthPhone } from 'utils/screen';

export default StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
  },
  row: { flexDirection: 'row', flex: 1, margin: 5 },
  boxVideoList: {
    width: widthPhone / 2,
    aspectRatio: 1,
    margin: 5,
  },
});
