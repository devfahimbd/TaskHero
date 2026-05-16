/**
 * App Navigator
 * ==============
 * Root navigation component using React Navigation Native Stack.
 * Handles authentication-based routing (Auth stack vs Main stack).
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../utils/theme';

// Screen imports
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';

import { SCREENS } from '../utils/constants';

const Stack = createNativeStackNavigator();

/**
 * Auth Stack - Screens shown when user is NOT logged in
 */
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
    <Stack.Screen name={SCREENS.SIGNUP} component={SignupScreen} />
  </Stack.Navigator>
);

/**
 * Main Stack - Screens shown when user IS logged in
 */
const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
    <Stack.Screen
      name={SCREENS.ADD_TASK}
      component={AddTaskScreen}
      options={{ presentation: 'modal' }}
    />
    <Stack.Screen name={SCREENS.EDIT_TASK} component={EditTaskScreen} />
  </Stack.Navigator>
);

/**
 * Root Navigator - Routes between Auth and Main stacks
 * based on authentication state
 */
const AppNavigator = () => {
  const { user, loading } = useAuth();

  // Show a centered loading spinner while checking auth state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;

// minor update at 2026-05-16 16:02:25 - iteration 13

// minor update at 2026-05-16 18:05:49 - iteration 15

// minor update at 2026-05-16 18:07:21 - iteration 5

// minor update at 2026-05-16 18:08:19 - iteration 14

// minor update at 2026-05-16 18:11:04 - iteration 39

// minor update at 2026-05-16 18:13:12 - iteration 59

// minor update at 2026-05-16 18:14:16 - iteration 69

// minor update at 2026-05-16 18:15:22 - iteration 79

// minor update at 2026-05-16 18:16:39 - iteration 91

// minor update at 2026-05-16 18:16:52 - iteration 93

// minor update at 2026-05-16 18:19:07 - iteration 114

// minor update at 2026-05-16 18:23:36 - iteration 155

// minor update at 2026-05-16 18:24:56 - iteration 167
