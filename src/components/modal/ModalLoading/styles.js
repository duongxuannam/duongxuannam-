import { StyleSheet } from 'react-native';
import Common from 'utils/common';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  wrapLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Common.border.radius.big,
  },
  wrapLoadingGif: {
    overflow: 'hidden',
    width: Common.gif.loading.width,
    height: Common.gif.loading.height,
    borderRadius: Common.border.radius.big,
  },
  gifLoadingTruck: {
    width: Common.gif.loading.width,
    height: Common.gif.loading.height,
    borderRadius: Common.border.radius.big,
  },
});

export default styles;
