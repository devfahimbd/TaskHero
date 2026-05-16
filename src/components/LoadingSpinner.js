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

// minor update at 2026-05-16 18:07:08 - iteration 3

// minor update at 2026-05-16 18:07:47 - iteration 9

// minor update at 2026-05-16 18:11:36 - iteration 44

// minor update at 2026-05-16 18:11:55 - iteration 47

// minor update at 2026-05-16 18:14:49 - iteration 74

// minor update at 2026-05-16 18:16:26 - iteration 89

// minor update at 2026-05-16 18:20:13 - iteration 124

// minor update at 2026-05-16 18:20:26 - iteration 126

// minor update at 2026-05-16 18:27:43 - iteration 192

// minor update at 2026-05-16 18:32:05 - iteration 231

// minor update at 2026-05-16 18:33:06 - iteration 240
