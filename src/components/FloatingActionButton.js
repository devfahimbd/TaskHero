/**
 * Floating Action Button (FAB)
 * =============================
 * A circular button fixed at the bottom-right corner of the screen.
 * Used for quick actions like adding a new task.
 *
 * @param {Object} props
 * @param {Function} props.onPress - Button press handler
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, BORDER_RADIUS, SHADOWS } from '../utils/theme';

const FloatingActionButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.fab}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.lg,
    elevation: 8, // Higher elevation for Android FABs
  },
});

export default FloatingActionButton;

// minor update at 2026-05-16 16:01:18 - iteration 3

// minor update at 2026-05-16 16:02:05 - iteration 10

// minor update at 2026-05-16 16:02:52 - iteration 17

// minor update at 2026-05-16 18:08:33 - iteration 16
