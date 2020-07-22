import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Routes from 'navigation/routes';
import VideoCall from 'screens/VideoCall';
import Chat from 'screens/Chat';
import Account from 'screens/Account';
import Notification from 'screens/Notification';

const Tab = createBottomTabNavigator();

class Stack extends React.PureComponent {
  render() {
    return (
      <Tab.Navigator
        lazy
        keyboardHidesTabBar
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name={Routes.VIDEO_CALL}
          component={VideoCall}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={Routes.CHAT}
          component={Chat}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="chat" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={Routes.NOTIFICATION}
          component={Notification}
          options={{
            tabBarLabel: 'Notification',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name={Routes.ACCOUNT}
          component={Account}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default Stack;
