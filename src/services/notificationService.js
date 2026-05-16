/**
 * Notification Service
 * ====================
 * Handles local push notifications using expo-notifications:
 * - Request notification permissions
 * - Schedule notifications for tasks
 * - Cancel scheduled notifications
 * - Configure notification handlers
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';

/**
 * Configure how notifications are displayed when the app is in the foreground
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Request notification permissions from the user
 * Handles both Android and iOS permission flows
 * @returns {boolean} Whether permissions were granted
 */
export const requestNotificationPermissions = async () => {
  try {
    if (!Device.isDevice) {
      // Running on emulator/simulator - permissions not needed for testing
      console.log('Running on emulator. Notifications may not work as expected.');
      return true;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Only ask if we don't already have permission
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Configure Android notification channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('task-reminders', {
        name: 'Task Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#6C63FF',
      });
    }

    return finalStatus === 'granted';
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

/**
 * Schedule a local notification for a task
 * @param {string} taskId - The task's document ID (used as notification identifier)
 * @param {string} title - Task title to display in notification
 * @param {Date} scheduledDate - When to trigger the notification
 */
export const scheduleTaskNotification = async (taskId, title, scheduledDate) => {
  try {
    // Don't schedule if the date is in the past
    if (new Date(scheduledDate) <= new Date()) {
      console.log('Notification date is in the past. Skipping.');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder',
        body: title,
        data: { taskId },
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: scheduledDate,
        // channelId only needed for Android
        ...(Platform.OS === 'android' && { channelId: 'task-reminders' }),
      },
    });

    console.log(`Notification scheduled for "${title}" at ${scheduledDate}`);
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

/**
 * Cancel a previously scheduled notification
 * @param {string} taskId - The task's document ID (notification identifier)
 */
export const cancelTaskNotification = async (taskId) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(taskId);
    console.log(`Notification cancelled for task: ${taskId}`);
  } catch (error) {
    console.error('Error cancelling notification:', error);
  }
};
