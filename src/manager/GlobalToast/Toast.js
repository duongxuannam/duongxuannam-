import React from 'react';
import { Text, View, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import EASING_FUNCTIONS from 'react-native-animatable/easing';
/**
 * utils & constants
 */
import Colors from 'utils/colors';
/**
 * internal imports
 */
import Common from 'utils/common';
import styles from './styles';

class Toast extends React.PureComponent {
  animatedValue: Animated.Value = new Animated.Value(0);

  currentAnimation: Animated.CompositeAnimation = null;

  animatedStyle = {
    opacity: this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, this.props.opacity / 2, this.props.opacity],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [Common.height.res40, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  componentDidMount() {
    this.showToast(this.hideToast);
  }

  componentWillUnmount() {
    this.currentAnimation && this.currentAnimation.stop();
  }

  showToast = (onCompleted: Function) => {
    this.currentAnimation = Animated.timing(this.animatedValue, {
      toValue: 1,
      easing: EASING_FUNCTIONS['ease-in-out'],
      useNativeDriver: true,
      duration: 250,
    }).start(params => {
      this.currentAnimation = null;
      onCompleted instanceof Function && onCompleted(params);
    });
  };

  hideToast = (animationResult: Animated.EndResult, onCompleted: Function) => {
    const { duration, clearToast } = this.props;
    if (!animationResult.finished) {
      return;
    }
    this.currentAnimation = Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 250,
      easing: EASING_FUNCTIONS['ease-in-out'],
      delay: duration,
      useNativeDriver: true,
    }).start(params => {
      this.currentAnimation = null;
      onCompleted instanceof Function && onCompleted(params);
      params.finished && clearToast();
    });
  };

  render() {
    const { icon, foregroundColor, backgroundColor, message } = this.props;
    return (
      <Animated.View style={[styles.animatedContainer, this.animatedStyle]}>
        <View
          style={[
            styles.container,
            {
              backgroundColor,
            },
          ]}
        >
          {!!icon && (
            <Feather
              allowFontScaling={false}
              name={icon}
              style={[styles.icon, { color: foregroundColor }]}
            />
          )}

          {!!message && (
            <Text allowFontScaling={false} style={[styles.messageTxt, { color: foregroundColor }]}>
              {message}
            </Text>
          )}
        </View>
      </Animated.View>
    );
  }
}

Toast.propTypes = {
  duration: PropTypes.number,
  icon: PropTypes.string,
  opacity: PropTypes.number,
  backgroundColor: PropTypes.string,
  foregroundColor: PropTypes.string,
  message: PropTypes.string,
  clearToast: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  duration: 3000,
  icon: 'check',
  opacity: 0.95,
  backgroundColor: Colors.black,
  foregroundColor: Colors.white,
  message: null,
};

export default Toast;
