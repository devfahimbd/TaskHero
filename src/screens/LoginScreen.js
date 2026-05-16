/**
 * Login Screen
 * ============
 * Email and password authentication screen.
 * Includes form validation, error handling, and loading states.
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
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Services & Context
import { useAuth } from '../context/AuthContext';
import { resetPassword } from '../services/authService';

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
import { AUTH_MESSAGES, SCREENS } from '../utils/constants';
import { validateEmail, validatePassword } from '../utils/validators';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  /**
   * Validate all form fields
   * @returns {boolean} Whether the form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle login form submission
   */
  const handleLogin = async () => {
    Keyboard.dismiss();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(email.trim().toLowerCase(), password);
      // Navigation happens automatically via AuthContext state change
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle password reset flow
   */
  const handleForgotPassword = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    try {
      await resetPassword(email.trim().toLowerCase());
      Alert.alert(
        'Password Reset',
        'A password reset link has been sent to your email address.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Reset Failed', error.message);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Signing you in..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Ionicons name="checkmark-done" size={40} color={COLORS.white} />
            </View>
            <Text style={styles.appName}>TaskeHero</Text>
            <Text style={styles.tagline}>Stay organized, stay productive</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Welcome Back</Text>
            <Text style={styles.sectionSubtitle}>
              Sign in to manage your tasks
            </Text>

            {/* Email Input */}
            <FormInput
              label="Email Address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.email}
              leftIcon="mail-outline"
            />

            {/* Password Input */}
            <FormInput
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              error={errors.password}
              leftIcon="lock-closed-outline"
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={() => setShowPassword(!showPassword)}
            />

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signupLink}>
              <Text style={styles.signupText}>Don&apos;t have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(SCREENS.SIGNUP)}
              >
                <Text style={styles.signupLinkText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: BORDER_RADIUS.xxl,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  appName: {
    fontSize: FONT_SIZES.title,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  tagline: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
  },
  formSection: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  forgotPasswordText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  loginButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
  },
  signupLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  signupText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
  },
  signupLinkText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});

export default LoginScreen;

// minor update at 2026-05-16 18:04:57 - iteration 7

// minor update at 2026-05-16 18:05:10 - iteration 9

// minor update at 2026-05-16 18:06:09 - iteration 18
