import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Routes from 'navigation/routes';
import VideoCall from 'screens/VideoCall';
import TabBar from './TabBar';

const MainStack = createStackNavigator();

export default function _MainStack() {
  return (
    <MainStack.Navigator initialRouteName={Routes.TAB_BAR} headerMode={null}>
      <MainStack.Screen name={Routes.TAB_BAR} component={TabBar} />
      <MainStack.Screen name={Routes.VIDEO_CALL} component={VideoCall} />
    </MainStack.Navigator>
  );
}
