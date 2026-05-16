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
  authDomain: 'task-hero-f2d01.firebaseapp.com',
  projectId: 'task-hero-f2d01',
  storageBucket: 'task-hero-f2d01.firebasestorage.app',
  messagingSenderId: '360271990389',
  appId: '1:360271990389:web:1fa951c5d04d1c793bf23c',
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
