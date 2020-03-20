import { StyleSheet } from 'react-native';
import Common from 'utils/common';
import Colors from 'utils/colors';
import { LayerIndexValue } from 'constants/layerConstants';

export default StyleSheet.create({
  animatedContainer: {
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    borderRadius: Common.height.res15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Common.width.res20,
    marginHorizontal: Common.width.res10,

    elevation: LayerIndexValue.TOAST_LAYER,
    zIndex: LayerIndexValue.TOAST_LAYER,
    bottom: Common.height.res50,
  },
  icon: {
    fontSize: Common.height.res20,
    color: Colors.white,
    marginLeft: Common.width.res5,
    marginVertical: Common.height.res5,
  },
  messageTxt: {
    fontSize: Common.height.res14,
    lineHeight: Common.height.res18,
    color: Colors.white,
    marginHorizontal: Common.width.res5,
    marginVertical: Common.height.res5,
  },
});
