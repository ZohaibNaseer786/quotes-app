import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../splashScreen/SplashScreen';
import WizardScreen from '../wizardScreen/WizardScreen';
import AppStack from './appNavigation/AppNavigation';
import { ScreensName } from '../../assets/string/String';
import { COLORS } from '../../assets/colors/color';

const RootStack = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const navHeaderHandler = () => ({
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: COLORS.primary_color,
  },
  headerTintColor: COLORS.white,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20.47,
  },
});

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name={ScreensName.SplashScreen}
          component={SplashScreen}
          options={navOptionHandler}
        />
        <RootStack.Screen
          name={ScreensName.WizardScreen}
          component={WizardScreen}
          options={navOptionHandler}
        />
        <RootStack.Screen
          name={ScreensName.AppScreen}
          component={AppStack}
          options={navOptionHandler}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
