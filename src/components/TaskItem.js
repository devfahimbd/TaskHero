/**
 * Task Item Component
 * ===================
 * Displays a single task card with:
 * - Checkbox to toggle completion
 * - Title and description
 * - Reminder date/time badge
 * - Edit and Delete action buttons
 * Visual feedback for completed tasks (strikethrough + opacity).
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, BORDER_RADIUS, SHADOWS } from '../utils/theme';

/**
 * TaskItem - Reusable card component for displaying a task
 * @param {Object} props
 * @param {Object} props.task - Task data object
 * @param {Function} props.onToggleComplete - Toggle task completion handler
 * @param {Function} props.onEdit - Edit task handler
 * @param {Function} props.onDelete - Delete task handler
 */
const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const { title, description, datetime, completed } = task;

  /**
   * Format the date/time for display
   */
  const formatDateTime = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const now = new Date();

    // Check if task is today
    const isToday = d.toDateString() === now.toDateString();
    const isTomorrow = new Date(now.setDate(now.getDate() + 1)).toDateString() === d.toDateString();

    const timeStr = d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    if (isToday) return `Today, ${timeStr}`;
    if (isTomorrow) return `Tomorrow, ${timeStr}`;

    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }) + `, ${timeStr}`;
  };

  const formattedDate = formatDateTime(datetime);

  return (
    <View
      style={[
        styles.container,
        completed && styles.completedContainer,
      ]}
    >
      {/* Checkbox / Completion Toggle */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={onToggleComplete}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            completed ? styles.checkboxChecked : styles.checkboxUnchecked,
          ]}
        >
          {completed && (
            <Ionicons name="checkmark" size={16} color={COLORS.white} />
          )}
        </View>
      </TouchableOpacity>

      {/* Task Content */}
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={onEdit}
        activeOpacity={0.7}
      >
        {/* Title */}
        <Text
          style={[
            styles.title,
            completed && styles.completedText,
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>

        {/* Description (if present) */}
        {description ? (
          <Text
            style={[styles.description, completed && styles.completedText]}
            numberOfLines={2}
          >
            {description}
          </Text>
        ) : null}

        {/* Date/Time Badge */}
        {formattedDate && (
          <View style={styles.dateBadge}>
            <Ionicons
              name="notifications-outline"
              size={12}
              color={completed ? COLORS.textTertiary : COLORS.primary}
            />
            <Text
              style={[
                styles.dateText,
                completed && styles.completedDateText,
              ]}
            >
              {formattedDate}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {/* Edit Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onEdit}
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={18} color={COLORS.textTertiary} />
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onDelete}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.base,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  completedContainer: {
    borderLeftColor: COLORS.success,
    opacity: 0.7,
  },
  checkboxContainer: {
    paddingTop: 2,
    marginRight: SPACING.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxUnchecked: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
  },
  checkboxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: COLORS.textTertiary,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    lineHeight: 18,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: SPACING.xs,
  },
  dateText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  completedDateText: {
    color: COLORS.textTertiary,
  },
  actionsContainer: {
    flexDirection: 'column',
    gap: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskItem;

// minor update at 2026-05-16 16:01:24 - iteration 4

// minor update at 2026-05-16 18:05:23 - iteration 11

// minor update at 2026-05-16 18:06:22 - iteration 20

// minor update at 2026-05-16 18:10:05 - iteration 30

// minor update at 2026-05-16 18:10:25 - iteration 33
