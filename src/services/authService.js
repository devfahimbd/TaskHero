/**
 * Authentication Service
 * ======================
 * Handles all Firebase Authentication operations:
 * - Sign up with email & password
 * - Login with email & password
 * - Logout
 * - Password reset
 * - Get current user
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Register a new user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's chosen password
 * @returns {Object} User credential from Firebase
 * @throws {Error} If registration fails
 */
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    // Map Firebase error codes to user-friendly messages
    const errorMessages = {
      'auth/email-already-in-use': 'This email is already registered.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/weak-password': 'Password must be at least 6 characters.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
    };
    const message = errorMessages[error.code] || error.message;
    throw new Error(message);
  }
};

/**
 * Log in an existing user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Object} User credential from Firebase
 * @throws {Error} If login fails
 */
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    const errorMessages = {
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/too-many-requests': 'Too many attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/invalid-credential': 'Invalid email or password.',
    };
    const message = errorMessages[error.code] || error.message;
    throw new Error(message);
  }
};

/**
 * Log out the current user
 * @throws {Error} If logout fails
 */
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error('Failed to log out. Please try again.');
  }
};

/**
 * Send a password reset email
 * @param {string} email - User's email address
 * @throws {Error} If sending reset email fails
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    const errorMessages = {
      'auth/user-not-found': 'No account found with this email.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
    };
    const message = errorMessages[error.code] || error.message;
    throw new Error(message);
  }
};

/**
 * Subscribe to authentication state changes
 * @param {Function} callback - Called with user object (null if logged out)
 * @returns {Function} Unsubscribe function
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
