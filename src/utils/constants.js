/**
 * Application Constants
 * =====================
 * Central location for app-wide constant values,
 * screen names, error messages, and configuration.
 */

// Screen names used in React Navigation
export const SCREENS = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  HOME: 'Home',
  ADD_TASK: 'AddTask',
  EDIT_TASK: 'EditTask',
};

// Authentication error messages
export const AUTH_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required.',
  EMAIL_INVALID: 'Please enter a valid email address.',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters.',
  CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password.',
  PASSWORDS_DONT_MATCH: 'Passwords do not match.',
  LOGIN_SUCCESS: 'Welcome back!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
};

// Task-related messages
export const TASK_MESSAGES = {
  TITLE_REQUIRED: 'Task title is required.',
  ADD_SUCCESS: 'Task added successfully!',
  UPDATE_SUCCESS: 'Task updated successfully!',
  DELETE_SUCCESS: 'Task deleted.',
  COMPLETE_SUCCESS: 'Task completed!',
  INCOMPLETE_SUCCESS: 'Task marked as pending.',
  DELETE_CONFIRM: 'Are you sure you want to delete this task?',
  DELETE_CONFIRM_SUBTITLE: 'This action cannot be undone.',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
};

// Empty state messages
export const EMPTY_STATE = {
  NO_TASKS_TITLE: 'No Tasks Yet',
  NO_TASKS_SUBTITLE: 'Tap the + button to add your first task and start being productive!',
  NO_PENDING_TITLE: 'All Caught Up!',
  NO_PENDING_SUBTITLE: 'No pending tasks. Great job staying on top of things!',
  NO_COMPLETED_TITLE: 'Nothing Completed',
  NO_COMPLETED_SUBTITLE: 'Complete some tasks to see them here.',
};

// minor update at 2026-05-16 16:01:37 - iteration 6
