/**
 * Form Input Component
 * ====================
 * Reusable text input with:
 * - Label
 * - Left and right icon support
 * - Error message display
 * - Multi-line support for descriptions
 *
 * @param {Object} props
 * @param {string} props.label - Input field label
 * @param {string} props.value - Current input value
 * @param {Function} props.onChangeText - Text change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message to display
 * @param {string} props.leftIcon - Ionicons name for left icon
 * @param {string} props.rightIcon - Ionicons name for right icon
 * @param {Function} props.onRightIconPress - Right icon press handler
 * @param {boolean} props.secureTextEntry - Hide text (for passwords)
 * @param {boolean} props.multiline - Enable multi-line input
 * @param {number} props.numberOfLines - Number of lines for multi-line
 * @param {Object} props.style - Additional style overrides
 */

import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, BORDER_RADIUS, SHADOWS } from '../utils/theme';

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry = false,
  multiline = false,
  numberOfLines,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Label */}
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}

      {/* Input Wrapper */}
      <View
        style={[
          styles.inputWrapper,
          error && styles.inputWrapperError,
          multiline && styles.inputWrapperMultiline,
        ]}
      >
        {/* Left Icon */}
        {leftIcon && (
          <View style={[styles.iconContainer, multiline && styles.iconContainerMultiline]}>
            <Ionicons
              name={leftIcon}
              size={18}
              color={error ? COLORS.danger : COLORS.textTertiary}
            />
          </View>
        )}

        {/* Text Input */}
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textDisabled}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            activeOpacity={0.7}
          >
            <Ionicons
              name={rightIcon}
              size={18}
              color={COLORS.textTertiary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.base,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.base,
    minHeight: 50,
  },
  inputWrapperError: {
    borderColor: COLORS.danger,
  },
  inputWrapperMultiline: {
    alignItems: 'flex-start',
    paddingVertical: SPACING.base,
  },
  iconContainer: {
    marginRight: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerMultiline: {
    marginTop: SPACING.xs,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.sm,
  },
  inputMultiline: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
  rightIconContainer: {
    padding: SPACING.xs,
  },
  errorText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.danger,
    marginTop: SPACING.xs,
    marginLeft: SPACING.sm,
  },
});

export default FormInput;

// minor update at 2026-05-16 18:04:30 - iteration 3

// minor update at 2026-05-16 18:04:50 - iteration 6

// minor update at 2026-05-16 18:05:56 - iteration 16

// minor update at 2026-05-16 18:08:47 - iteration 18

// minor update at 2026-05-16 18:09:33 - iteration 25

// minor update at 2026-05-16 18:12:46 - iteration 55

// minor update at 2026-05-16 18:14:03 - iteration 67

// minor update at 2026-05-16 18:15:48 - iteration 83

// minor update at 2026-05-16 18:25:04 - iteration 168

// minor update at 2026-05-16 18:25:23 - iteration 171

// minor update at 2026-05-16 18:26:04 - iteration 177

// minor update at 2026-05-16 18:28:03 - iteration 195

// minor update at 2026-05-16 18:29:59 - iteration 212

// minor update at 2026-05-16 18:30:58 - iteration 221

// minor update at 2026-05-16 18:31:31 - iteration 226

// minor update at 2026-05-16 18:32:38 - iteration 236

// minor update at 2026-05-16 18:34:45 - iteration 255
