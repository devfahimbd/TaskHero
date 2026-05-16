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

// minor update at 2026-05-16 16:01:30 - iteration 5

// minor update at 2026-05-16 18:05:04 - iteration 8

// minor update at 2026-05-16 18:08:13 - iteration 13

// minor update at 2026-05-16 18:12:59 - iteration 57

// minor update at 2026-05-16 18:19:27 - iteration 117

// minor update at 2026-05-16 18:20:06 - iteration 123

// minor update at 2026-05-16 18:21:11 - iteration 133

// minor update at 2026-05-16 18:21:38 - iteration 137

// minor update at 2026-05-16 18:22:16 - iteration 143

// minor update at 2026-05-16 18:22:29 - iteration 145

// minor update at 2026-05-16 18:22:36 - iteration 146

// minor update at 2026-05-16 18:22:42 - iteration 147

// minor update at 2026-05-16 18:28:58 - iteration 203
