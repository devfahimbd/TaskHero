/**
 * Edit Task Screen
 * ================
 * Allows users to modify an existing task's title, description,
 * and reminder date/time. Updates Firestore and reschedules notification.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from 'react-native-date-picker';

// Services & Context
import { useAuth } from '../context/AuthContext';
import { updateTask } from '../services/taskService';

// Components
import FormInput from '../components/FormInput';
import LoadingSpinner from '../components/LoadingSpinner';

// Theme & Constants
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from '../utils/theme';
import { TASK_MESSAGES } from '../utils/constants';
import { validateTaskTitle, validateDateTime } from '../utils/validators';

const EditTaskScreen = ({ route, navigation }) => {
  const { user } = useAuth();
  const { task } = route.params || {};

  // Form state initialized from existing task data
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [selectedDate, setSelectedDate] = useState(
    task?.datetime ? new Date(task.datetime) : new Date()
  );
  const [useReminder, setUseReminder] = useState(!!task?.datetime);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const isCompleted = task?.completed || false;

  /**
   * Validate form fields
   * @returns {boolean} Whether the form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    const titleError = validateTaskTitle(title);

    if (titleError) newErrors.title = titleError;

    if (useReminder) {
      const dateTimeError = validateDateTime(selectedDate);
      if (dateTimeError) newErrors.datetime = dateTimeError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle task update
   */
  const handleUpdateTask = async () => {
    Keyboard.dismiss();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const updatedData = {
        title,
        description,
        datetime: useReminder ? selectedDate.toISOString() : null,
      };

      await updateTask(user.uid, task.id, updatedData);

      Alert.alert('Success', TASK_MESSAGES.UPDATE_SUCCESS, [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Updating task..." />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={styles.keyboardAvoid}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Task</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Task Status Badge */}
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isCompleted
                  ? COLORS.successBackground
                  : COLORS.warningBackground,
              },
            ]}
          >
            <Ionicons
              name={isCompleted ? 'checkmark-circle' : 'clock-outline'}
              size={16}
              color={isCompleted ? COLORS.success : COLORS.warning}
            />
            <Text
              style={[
                styles.statusText,
                { color: isCompleted ? COLORS.success : COLORS.warning },
              ]}
            >
              {isCompleted ? 'Completed' : 'Pending'}
            </Text>
          </View>

          {/* Title Input (Required) */}
          <FormInput
            label="Task Title *"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
            }}
            placeholder="What needs to be done?"
            error={errors.title}
            leftIcon="create-outline"
          />

          {/* Description Input (Optional) */}
          <FormInput
            label="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            placeholder="Add some details..."
            multiline
            numberOfLines={3}
            leftIcon="document-text-outline"
            style={styles.descriptionInput}
          />

          {/* Reminder Toggle */}
          <View style={styles.reminderSection}>
            <View style={styles.reminderHeader}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.reminderLabel}>Set Reminder</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.toggle,
                useReminder ? styles.toggleActive : styles.toggleInactive,
              ]}
              onPress={() => setUseReminder(!useReminder)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.toggleKnob,
                  useReminder ? styles.toggleKnobActive : styles.toggleKnobInactive,
                ]}
              />
            </TouchableOpacity>
          </View>

          {/* Date & Time Picker (shown when reminder is enabled) */}
          {useReminder && (
            <View style={styles.dateTimePickerSection}>
              {/* Date Picker */}
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={COLORS.primary}
                />
                <View style={styles.dateTextContainer}>
                  <Text style={styles.dateLabel}>Date</Text>
                  <Text style={styles.dateValue}>
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={COLORS.textTertiary}
                />
              </TouchableOpacity>

              {/* Time Picker */}
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={COLORS.primary}
                />
                <View style={styles.dateTextContainer}>
                  <Text style={styles.dateLabel}>Time</Text>
                  <Text style={styles.dateValue}>
                    {selectedDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={COLORS.textTertiary}
                />
              </TouchableOpacity>

              {errors.datetime && (
                <Text style={styles.errorText}>{errors.datetime}</Text>
              )}
            </View>
          )}

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleUpdateTask}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark" size={22} color={COLORS.white} />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Picker Modal */}
      <DateTimePicker
        modal
        open={showDatePicker}
        date={selectedDate}
        mode="date"
        minimumDate={new Date()}
        onConfirm={(date) => {
          setShowDatePicker(false);
          setSelectedDate(date);
        }}
        onCancel={() => setShowDatePicker(false)}
        themeVariant="light"
      />

      {/* Time Picker Modal */}
      <DateTimePicker
        modal
        open={showTimePicker}
        date={selectedDate}
        mode="time"
        onConfirm={(date) => {
          setShowTimePicker(false);
          setSelectedDate(date);
        }}
        onCancel={() => setShowTimePicker(false)}
        themeVariant="light"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    marginBottom: SPACING.lg,
    gap: SPACING.xs,
  },
  statusText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  reminderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
    marginTop: SPACING.md,
    ...SHADOWS.sm,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  reminderLabel: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: BORDER_RADIUS.full,
    padding: 2,
  },
  toggleActive: {
    backgroundColor: COLORS.primary,
    justifyContent: 'flex-end',
  },
  toggleInactive: {
    backgroundColor: COLORS.border,
    justifyContent: 'flex-start',
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.white,
    ...SHADOWS.sm,
  },
  dateTimePickerSection: {
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
    ...SHADOWS.sm,
  },
  dateTextContainer: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  dateLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    marginBottom: 2,
  },
  dateValue: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.danger,
    marginTop: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xxl,
    gap: SPACING.sm,
    ...SHADOWS.md,
  },
  saveButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
  },
});

export default EditTaskScreen;

// minor update at 2026-05-16 18:04:16 - iteration 1

// minor update at 2026-05-16 18:07:40 - iteration 8

// minor update at 2026-05-16 18:08:40 - iteration 17

// minor update at 2026-05-16 18:09:26 - iteration 24

// minor update at 2026-05-16 18:10:32 - iteration 34

// minor update at 2026-05-16 18:10:38 - iteration 35

// minor update at 2026-05-16 18:13:19 - iteration 60

// minor update at 2026-05-16 18:17:43 - iteration 101

// minor update at 2026-05-16 18:18:29 - iteration 108

// minor update at 2026-05-16 18:21:31 - iteration 136

// minor update at 2026-05-16 18:23:56 - iteration 158

// minor update at 2026-05-16 18:27:37 - iteration 191
