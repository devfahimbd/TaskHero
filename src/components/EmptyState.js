/**
 * Empty State Component
 * =====================
 * Reusable component displayed when there are no tasks.
 * Shows an icon, title, and subtitle with a clean, centered layout.
 *
 * @param {Object} props
 * @param {string} props.title - Empty state title
 * @param {string} props.subtitle - Empty state subtitle/description
 * @param {string} props.icon - Ionicons icon name
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, BORDER_RADIUS } from '../utils/theme';

const EmptyState = ({ title, subtitle, icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon || 'clipboard-outline'} size={56} color={COLORS.textTertiary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.xxxl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
});

export default EmptyState;

// minor update at 2026-05-16 16:01:04 - iteration 1

// minor update at 2026-05-16 16:03:05 - iteration 19

// minor update at 2026-05-16 18:04:23 - iteration 2

// minor update at 2026-05-16 18:07:01 - iteration 2

// minor update at 2026-05-16 18:10:57 - iteration 38

// minor update at 2026-05-16 18:11:42 - iteration 45

// minor update at 2026-05-16 18:11:48 - iteration 46

// minor update at 2026-05-16 18:12:27 - iteration 52

// minor update at 2026-05-16 18:18:22 - iteration 107

// minor update at 2026-05-16 18:18:55 - iteration 112

// minor update at 2026-05-16 18:19:47 - iteration 120
