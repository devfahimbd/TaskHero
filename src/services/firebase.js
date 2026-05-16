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
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
// Using getAuth() which is the standard and most compatible approach
// for Firebase v11+ with React Native (Expo)
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
export default app;

// minor update at 2026-05-16 16:03:13 - iteration 20

// minor update at 2026-05-16 18:16:13 - iteration 87

// minor update at 2026-05-16 18:17:50 - iteration 102

// minor update at 2026-05-16 18:18:16 - iteration 106

// minor update at 2026-05-16 18:19:21 - iteration 116

// minor update at 2026-05-16 18:19:59 - iteration 122
