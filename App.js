/**
 * TaskeHero - App Entry Point
 * ============================
 * Main application component that wraps the entire app
 * with necessary providers and registers notification handlers.
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

// Notification listeners
import * as Notifications from 'expo-notifications';

// Context Providers
import { AuthProvider } from './src/context/AuthContext';

// Navigation
import AppNavigator from './src/navigation/AppNavigator';

// Notification Service
import { requestNotificationPermissions } from './src/services/notificationService';

// Theme
import { COLORS } from './src/utils/theme';

export default function App() {
  /**
   * Setup notifications and notification handlers on app launch
   */
  useEffect(() => {
    // Request notification permissions
    requestNotificationPermissions();

    // Listen for notifications received while app is in foreground
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notification received:', notification);
      }
    );

    // Listen for notification tap events
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification tapped:', response);
        // Handle navigation based on notification data if needed
      });

    // Cleanup listeners on unmount
    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  return (
    <AuthProvider>
      <StatusBar
        style="dark"
        backgroundColor={COLORS.background}
      />
      <AppNavigator />
    </AuthProvider>
  );
}
