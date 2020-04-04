import React from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import throttle from 'lodash/throttle';
import { CommonActions } from '@react-navigation/native';

import Screen from 'utils/screen';
import Images from 'utils/images';
import styles from './styles';

const { height, width } = Screen;
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0))),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 0, 1))),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }

  goHome = () => {
    const { navigation } = this.props;
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'MainStack',
            params: {
              screen: 'Home',
            },
          },
        ],
      })
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }],
          }}
        >
          <Svg height={height + 50} width={width}>
            <ClipPath id="clip">
              <Circle r={height + 50} cx={width / 2} />
            </ClipPath>
            <Image
              href={Images.background_login}
              height={height + 50}
              width={width}
              preserveAspectRatio="xMidYMiid slice"
              clipPath="url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View style={styles.contentBox}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.buttonSignIn,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
              }}
            >
              <Text style={styles.signInTitle}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              ...styles.buttonFacebook,
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }],
            }}
          >
            <Text style={styles.facebookTitle}>SIGN IN WITH FACEBOOK</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.textInputAnimatedBox,
              {
                zIndex: this.textInputZindex,
                opacity: this.textInputOpacity,
                transform: [{ translateY: this.textInputY }],
              },
            ]}
          >
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={[styles.animatedCloseButtonBox]}>
                <Animated.Text
                  style={[
                    styles.closeButtonTitle,
                    {
                      transform: [
                        {
                          rotate: concat(this.rotateCross, 'deg'),
                        },
                      ],
                    },
                  ]}
                >
                  x
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>

            <TextInput style={styles.textInput} placeholder="EMAIL" placeholderTextColor="black" />
            <TextInput
              style={styles.textInput}
              placeholder="PASSWORD"
              secureTextEntry
              placeholderTextColor="black"
            />

            <Animated.View style={styles.buttonSignIn}>
              <TouchableOpacity onPress={this.events.goHome}>
                <Text style={styles.signInTitle}>SIGN IN</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }

  events = {
    goHome: throttle(this.goHome, 500),
  };
}

export default Login;
