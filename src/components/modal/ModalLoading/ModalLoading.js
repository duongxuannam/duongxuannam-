import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Images from 'utils/images';
import { doNothing } from 'constants/propsConstant';
import styles from './styles';

class ModalLoading extends React.PureComponent {
  render() {
    const { isVisible, clearModal } = this.props;
    return (
      <Modal
        style={styles.modal}
        onModalHide={clearModal}
        hideModalContentWhileAnimating
        animationIn="fadeIn"
        animationOut="fadeOut"
        avoidKeyboard
        backdropOpacity={0.5}
        useNativeDriver
        isVisible={isVisible}
      >
        <View style={styles.wrapLoading}>
          <View style={styles.wrapLoadingGif}>
            <Image source={Images.loading_truck} style={styles.gifLoadingTruck} />
          </View>
        </View>
      </Modal>
    );
  }
}

ModalLoading.propTypes = {
  isVisible: PropTypes.bool,
  clearModal: PropTypes.func,
  hideModal: PropTypes.func,
};

ModalLoading.defaultProps = {
  isVisible: false,
  clearModal: doNothing,
  hideModal: doNothing,
};

export default ModalLoading;
