/**
 * Loading Spinner Component
 * =========================
 * Full-screen loading indicator with an optional message.
 * Used during API calls, authentication, and data fetching.
 *
 * @param {Object} props
 * @param {string} props.message - Optional loading message
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../utils/theme';

const LoadingSpinner = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        {message && (
          <Text style={styles.message}>{message}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    alignItems: 'center',
    gap: SPACING.lg,
  },
  message: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.medium,
  },
});

export default LoadingSpinner;
