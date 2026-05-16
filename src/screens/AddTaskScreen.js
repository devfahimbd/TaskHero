/**
 * Add Task Screen
 * ===============
 * Modal screen for creating a new task with title, description,
 * date, and time. Schedules a notification upon creation.
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
import { addTask } from '../services/taskService';

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

const AddTaskScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [useReminder, setUseReminder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
   * Handle task creation
   */
  const handleAddTask = async () => {
    Keyboard.dismiss();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const taskData = {
        title,
        description,
        datetime: useReminder ? selectedDate.toISOString() : null,
      };

      await addTask(user.uid, taskData);

      Alert.alert('Success', TASK_MESSAGES.ADD_SUCCESS, [
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
    return <LoadingSpinner message="Adding task..." />;
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
            <Ionicons name="close" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Task</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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

          {/* Add Task Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTask}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark" size={22} color={COLORS.white} />
            <Text style={styles.addButtonText}>Add Task</Text>
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
  toggleKnobActive: {
    // aligned right by parent justifyContent
  },
  toggleKnobInactive: {
    // aligned left by parent justifyContent
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
  addButton: {
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
  addButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
  },
});

export default AddTaskScreen;

// minor update at 2026-05-16 16:01:44 - iteration 7

// minor update at 2026-05-16 16:02:45 - iteration 16
