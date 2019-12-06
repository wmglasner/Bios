import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TrackedScreen from '../screens/TrackedScreen';
import Quiz from '../screens/Quiz';
import DailyScreen from '../screens/DailyScreen';
import QuizFinished from '../screens/QuizFinished';
import Details from '../screens/Details';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const TrackedStack = createStackNavigator(
  {
    Tracked: TrackedScreen,
    Details: Details
  },
  config
);

TrackedStack.navigationOptions = {
  tabBarLabel: 'Tracked Species',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-link' : 'md-link'
      }
    />
  ),
};

TrackedStack.path='';

const QuizStack = createStackNavigator(
  {
    Quiz: Quiz,
    QuizFinished: QuizFinished,
  },
  config
);

QuizStack.navigationOptions = {
  tabBarLabel: 'Quiz',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

QuizStack.path='';
const DailyStack = createStackNavigator(
  {
    Daily: DailyScreen,
  },
  config
);

DailyStack.navigationOptions = {
  tabBarLabel: 'Daily',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-options' : 'md-options'
      }
    />
  ),
};

DailyStack.path='';

const tabNavigator = createBottomTabNavigator({
  DailyStack,
  QuizStack,
  TrackedStack,
});

tabNavigator.path = '';

export default tabNavigator;
