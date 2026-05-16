/**
 * Authentication Context
 * ======================
 * Provides authentication state to the entire app via React Context.
 * Manages user session and provides auth methods.
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthChange, login as firebaseLogin, signUp as firebaseSignUp, logout as firebaseLogout } from '../services/authService';
import { requestNotificationPermissions } from '../services/notificationService';

// Create the context
const AuthContext = createContext(null);

/**
 * AuthProvider wraps the app and provides authentication state
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes on mount
  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Request notification permissions when user logs in
      if (currentUser) {
        requestNotificationPermissions();
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  /**
   * Log in with email and password
   * @param {string} email
   * @param {string} password
   */
  const login = async (email, password) => {
    await firebaseLogin(email, password);
    // Auth state change listener will update the user state
  };

  /**
   * Register with email and password, then auto-login
   * @param {string} email
   * @param {string} password
   */
  const signUp = async (email, password) => {
    await firebaseSignUp(email, password);
    // Auth state change listener will update the user state
  };

  /**
   * Log out the current user
   */
  const logout = async () => {
    await firebaseLogout();
    setUser(null);
  };

  // Context value object
  const value = {
    user,
    loading,
    login,
    signUp,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access auth context
 * Must be used within AuthProvider
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
