<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/Firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase" />
  <img src="https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=black" alt="Android" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<h1 align="center">TaskeHero</h1>

<p align="center">
  <b>A Production-Ready To-Do Reminder App built with React Native (Expo) & Firebase</b><br/>
  Stay organized, stay productive.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/Stars-⭐-yellow" alt="Stars" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Firebase Setup (Step-by-Step)](#firebase-setup-step-by-step)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Building for Production](#building-for-production)
- [Firestore Security Rules](#firestore-security-rules)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**TaskeHero** is a fully-featured task management and reminder application designed with clean architecture and production-ready code quality. It leverages **Firebase Authentication** for secure user management, **Firestore** for real-time data synchronization, and **expo-notifications** for scheduled local push notifications. The app features a modern, clean UI with smooth navigation, form validation, loading states, and persistent login sessions.

Whether you're building a personal productivity tool or learning best practices for React Native + Firebase, TaskeHero serves as an excellent reference project.

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React Native 0.76.5 |
| **Platform** | Expo SDK ~52 |
| **Backend** | Firebase (Auth + Firestore) |
| **Navigation** | React Navigation v7 (Native Stack) |
| **Notifications** | expo-notifications |
| **Date/Time Picker** | react-native-date-picker |
| **State Management** | React Context API |
| **Session Persistence** | @react-native-async-storage/async-storage |
| **Icons** | @expo/vector-icons (Ionicons) |
| **Build Service** | EAS Build (Expo Application Services) |

---

## Key Features

### Authentication
- Email & Password Sign Up with validation
- Login with error handling and loading states
- Logout functionality
- Persistent login sessions across app restarts (AsyncStorage)
- Forgot Password / Password Reset via email
- User-friendly error messages mapped from Firebase error codes

### Task Management
- Create tasks with title, optional description, and date/time reminder
- Edit existing tasks (title, description, reminder)
- Delete tasks with confirmation alert
- Toggle task completion status (Pending / Completed)
- Real-time updates via Firestore `onSnapshot` listener
- Tab-based filtering: All Tasks, Pending, Completed
- Task count badges on each tab

### Notifications
- Schedule local push notifications at exact date & time
- Notification permissions handled automatically
- Android notification channel configured with sound & vibration
- Notifications cancelled when tasks are completed or deleted
- Rescheduled when task reminders are edited

### Database (Firebase Firestore)
- Subcollection pattern: `/users/{userId}/tasks/{taskId}`
- User data isolation via Firestore security rules
- Real-time data synchronization with `onSnapshot`
- Optimized queries ordered by creation date (newest first)

### UI/UX
- Modern, clean design with consistent theme system
- Floating Action Button (FAB) for quick task creation
- Empty state components with contextual icons
- Loading spinners during all async operations
- Pull-to-refresh on task list
- Time-based greeting messages (Good Morning / Afternoon / Evening)
- Smooth animations and touch feedback
- Form validation with inline error messages
- Password visibility toggle on auth screens

### Code Quality
- Functional components with hooks throughout
- Clean, modular architecture (services, context, navigation, screens, components, utils)
- Comprehensive form validation utilities
- Proper async/await with try/catch error handling
- Reusable component library (FormInput, TaskItem, EmptyState, LoadingSpinner, FAB)
- Centralized theme system (colors, spacing, shadows, typography)
- Well-documented code with JSDoc comments

---

## Project Architecture

```
┌─────────────────────────────────────────────────┐
│                   App.js                        │
│         (AuthProvider + Notifications)          │
├─────────────────────────────────────────────────┤
│              AuthContext.js                      │
│          (Global Auth State)                     │
├────────────────────┬────────────────────────────┤
│    Auth Stack      │       Main Stack           │
│  ┌──────────────┐  │  ┌────────────────────┐   │
│  │  LoginScreen │  │  │    HomeScreen      │   │
│  └──────────────┘  │  │  (Tabs + FAB +     │   │
│  ┌──────────────┐  │  │   Real-time List)  │   │
│  │ SignupScreen │  │  └────────────────────┘   │
│  └──────────────┘  │  ┌────────────────────┐   │
│                    │  │  AddTaskScreen     │   │
│                    │  │  (Modal)           │   │
│                    │  └────────────────────┘   │
│                    │  ┌────────────────────┐   │
│                    │  │  EditTaskScreen    │   │
│                    │  └────────────────────┘   │
├────────────────────┴────────────────────────────┤
│              Services Layer                      │
│  ┌──────────┐ ┌──────────┐ ┌─────────────────┐ │
│  │Firebase  │ │  Auth    │ │     Task        │ │
│  │  Config  │ │ Service  │ │    Service      │ │
│  └──────────┘ └──────────┘ └─────────────────┘ │
│                    ┌─────────────────────────┐  │
│                    │  Notification Service   │  │
│                    └─────────────────────────┘  │
├─────────────────────────────────────────────────┤
│           Reusable Components                    │
│  TaskItem │ EmptyState │ FAB │ FormInput │ Spinner│
├─────────────────────────────────────────────────┤
│              Utilities                           │
│  theme.js │ constants.js │ validators.js        │
└─────────────────────────────────────────────────┘
```

---

## Folder Structure

```
TaskeHero/
├── App.js                              # Entry point - AuthProvider + notification setup
├── package.json                        # Dependencies and scripts
├── app.json                            # Expo configuration
├── babel.config.js                     # Babel transpiler config
├── eas.json                            # EAS Build profiles (dev/preview/production)
├── firestore.rules                     # Firestore security rules
├── .gitignore                          # Git ignore rules
├── README.md                           # This file
│
├── src/
│   ├── services/
│   │   ├── firebase.js                 # Firebase initialization + config
│   │   ├── authService.js              # Auth: signup, login, logout, reset
│   │   ├── taskService.js              # CRUD: add, update, delete, toggle, subscribe
│   │   └── notificationService.js      # Schedule/cancel local notifications
│   │
│   ├── context/
│   │   └── AuthContext.js              # Auth state provider + useAuth hook
│   │
│   ├── navigation/
│   │   └── AppNavigator.js             # Auth stack & Main stack navigation
│   │
│   ├── screens/
│   │   ├── LoginScreen.js              # Login with email/password
│   │   ├── SignupScreen.js             # Registration with validation
│   │   ├── HomeScreen.js               # Task list + tabs + FAB + logout
│   │   ├── AddTaskScreen.js            # Create task + date/time picker
│   │   └── EditTaskScreen.js           # Edit task + reschedule notification
│   │
│   ├── components/
│   │   ├── TaskItem.js                 # Task card with actions
│   │   ├── EmptyState.js               # Empty state placeholder
│   │   ├── FloatingActionButton.js     # FAB for adding tasks
│   │   ├── FormInput.js                # Reusable form input component
│   │   └── LoadingSpinner.js           # Loading indicator with message
│   │
│   └── utils/
│       ├── theme.js                    # Colors, spacing, shadows, typography
│       ├── constants.js                # Screen names, messages, labels
│       └── validators.js               # Form validation functions
│
└── assets/                             # App icons and splash images
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Installation |
|------|---------|-------------|
| **Node.js** | v18 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | (comes with Node.js) | Included with Node.js |
| **Expo CLI** | Latest | `npm install -g expo-cli` |
| **Android Studio** | Latest | [developer.android.com/studio](https://developer.android.com/studio) |
| **Android SDK** | API 33+ | Via Android Studio SDK Manager |
| **Java JDK** | 17 | Via Android Studio or [adoptium.net](https://adoptium.net/) |
| **Firebase Account** | Free tier | [console.firebase.google.com](https://console.firebase.google.com/) |

> **Note:** For building APK/AAB, a Firebase account and `google-services.json` are required.

---

## Firebase Setup (Step-by-Step)

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add Project"** (or "Create a project")
3. Enter your project name (e.g., `taskehero-app`)
4. You can **disable Google Analytics** (not required for this app)
5. Click **"Create Project"**

### Step 2: Register an Android App

1. In Firebase Console, go to **Project Settings** (gear icon top left)
2. Scroll down to **"Your apps"** section
3. Click the **Android icon**
4. Enter the package name: **`com.taskehero.app`** (must match `app.json`)
5. App nickname: `TaskeHero` (optional)
6. Click **"Register App"**
7. **Download `google-services.json`** and save it in the **project root** (same folder as `package.json`)
8. Click **"Next"** and **"Continue to console"**

### Step 3: Enable Authentication

1. In the left sidebar, go to **"Build" > "Authentication"**
2. Click **"Get Started"**
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **"Enable"** to **ON**
6. Click **"Save"**

### Step 4: Create Firestore Database

1. In the left sidebar, go to **"Build" > "Firestore Database"**
2. Click **"Create Database"**
3. Choose **"Start in test mode"** (for development)
4. Select a **Firestore location** closest to your users
5. Click **"Enable"**
6. Go to the **"Rules"** tab
7. Replace the default rules with the content from [`firestore.rules`](./firestore.rules)
8. Click **"Publish"**

### Step 5: Get Web App Config

1. Go back to **Project Settings** > **"Your apps"**
2. Click the **Web icon** (`</>`) to add a **Web App**
3. Enter any nickname (e.g., `taskehero-web`)
4. Click **"Register App"**
5. Copy the `firebaseConfig` object values
6. Open `src/services/firebase.js` and **replace the placeholder values**:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // Replace
  authDomain: "YOUR_PROJECT.firebaseapp.com",  // Replace
  projectId: "YOUR_PROJECT_ID",        // Replace
  storageBucket: "YOUR_PROJECT.appspot.com",  // Replace
  messagingSenderId: "YOUR_SENDER_ID", // Replace
  appId: "YOUR_APP_ID",                // Replace
};
```

> **Important:** The web app config is needed because Firebase SDK for React Native uses the web config format for initialization. The `google-services.json` is used separately for native Android authentication.

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/TaskeHero.git
cd TaskeHero

# 2. Install dependencies
npm install

# 3. Place your google-services.json in the project root
#    (Download from Firebase Console > Project Settings > Your Apps > Android)

# 4. Update Firebase config
#    Edit src/services/firebase.js with your Firebase web app credentials

# 5. Start the development server
npx expo start
```

---

## Running the App

### On Android Emulator

```bash
npx expo start
# Press 'a' in the terminal to open in Android emulator
```

### On Physical Android Device

1. Install **Expo Go** from Google Play Store
2. Run `npx expo start`
3. Scan the QR code with Expo Go app
4. Ensure your phone and computer are on the same WiFi network

### Clear Cache (if needed)

```bash
npx expo start -c
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Firebase connection error | Verify `firebaseConfig` in `firebase.js` |
| `google-services.json` not found | Place file in project root directory |
| Notifications not working on emulator | Test on a physical device |
| Duplicate module errors | Run `npx expo start -c` and `rm -rf node_modules && npm install` |
| Auth not persisting after restart | Ensure `@react-native-async-storage/async-storage` is installed |

---

## Building for Production

### Preview APK (for testing / direct install)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build preview APK
eas build --platform android --profile preview
```

This generates an **APK** file you can directly install on any Android device.

### Production AAB (for Google Play Store)

```bash
# Build production AAB
eas build --platform android --profile production
```

This generates an **AAB** file optimized for Google Play Store submission.

### Install APK on Phone

1. Download the APK from the EAS Build link
2. Transfer the APK to your phone (via USB, cloud, or download link)
3. On your phone, go to **Settings > Security > Enable "Unknown Sources"**
4. Open the APK file and tap **"Install"**

---

## Firestore Security Rules

The included `firestore.rules` enforces **user data isolation**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/tasks/{taskId} {
      // Only authenticated users can access their own tasks
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // New tasks must have a non-empty title and boolean completed status
      allow create: if request.auth != null
                    && request.auth.uid == userId
                    && request.resource.data.title is string
                    && request.resource.data.title.size() > 0
                    && request.resource.data.completed is bool;
    }
  }
}
```

### Key Security Features

- Users can **only read/write their own tasks** (UID path match)
- New tasks must include `title` (non-empty string) and `completed` (boolean)
- All other database paths are **denied by default**
- No user can access another user's data

---

## Screenshots

> Add your app screenshots here after building and running the app.

| Login | Home Screen | Add Task |
|-------|-------------|----------|
| *Add screenshot* | *Add screenshot* | *Add screenshot* |

| Edit Task | Notifications | Empty State |
|-----------|--------------|-------------|
| *Add screenshot* | *Add screenshot* | *Add screenshot* |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

### Contribution Guidelines

- Follow the existing code style and architecture
- Write clean, commented code
- Test all changes before submitting a PR
- Use meaningful commit messages

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ using React Native, Expo & Firebase
</p>
