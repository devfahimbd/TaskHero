/**
 * Firebase Configuration
 * ======================
 * Central Firebase initialization file.
 * Replace the firebaseConfig object with your own Firebase project credentials.
 *
 * Steps to get your config:
 * 1. Go to Firebase Console > Project Settings > General > Your apps > Web app
 * 2. Copy the firebaseConfig object
 */

import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: 'AIzaSyBY5ul4EGOa60Qrhr2xL5ReNRtnh5Xa7HM',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with React Native persistence (AsyncStorage)
// This keeps the user logged in across app restarts
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
export default app;
