/**
 * Form Validators
 * ===============
 * Reusable validation functions for forms.
 * Each validator returns an error message string if validation fails,
 * or an empty string if the input is valid.
 */

/**
 * Validate an email address format
 * @param {string} email - Email string to validate
 * @returns {string} Error message or empty string
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email is required.';
  }

  // Standard email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address.';
  }

  return '';
};

/**
 * Validate a password
 * @param {string} password - Password string to validate
 * @returns {string} Error message or empty string
 */
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required.';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  return '';
};

/**
 * Validate that a confirm password matches the original password
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {string} Error message or empty string
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password.';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return '';
};

/**
 * Validate a task title
 * @param {string} title - Task title to validate
 * @returns {string} Error message or empty string
 */
export const validateTaskTitle = (title) => {
  if (!title || !title.trim()) {
    return 'Task title is required.';
  }
  if (title.trim().length < 2) {
    return 'Title must be at least 2 characters.';
  }
  return '';
};

/**
 * Validate a date-time value
 * @param {string|Date|null} datetime - Date-time to validate
 * @returns {string} Error message or empty string
 */
export const validateDateTime = (datetime) => {
  if (datetime && new Date(datetime) <= new Date()) {
    return 'Please select a future date and time.';
  }
  return '';
};
