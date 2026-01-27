// ===========================================
// AUTH STRINGS
// ===========================================

export const AUTH_STRINGS = {
  // Labels
  LOGIN_TITLE: "Login",
  REGISTER_TITLE: "Register",

  // Placeholders
  EMAIL_PLACEHOLDER: "Email",
  PASSWORD_PLACEHOLDER: "Password",
  FIRST_NAME_PLACEHOLDER: "First Name",
  LAST_NAME_PLACEHOLDER: "Last Name",
  USERNAME_PLACEHOLDER: "Username",
  PHONE_PLACEHOLDER: "Phone Number (optional)",

  // Buttons
  LOGIN_BUTTON: "Login",
  REGISTER_BUTTON: "Register",
  LOGOUT_BUTTON: "Logout",

  // Validation errors
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Invalid email format",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters",
  FIRST_NAME_REQUIRED: "First name is required",
  LAST_NAME_REQUIRED: "Last name is required",
  USERNAME_REQUIRED: "Username is required",
  USERNAME_MIN_LENGTH: "Username must be at least 3 characters",

  // API messages
  LOGIN_ERROR: "Login failed",
  REGISTER_ERROR: "Registration failed",
  GENERIC_ERROR: "An error occurred",

  // Links
  NO_ACCOUNT: "Don't have an account?",
  HAVE_ACCOUNT: "Already have an account?",
} as const;

// ===========================================
// COMMON STRINGS
// ===========================================

export const COMMON_STRINGS = {
  ERROR_TITLE: "Error",
  SUCCESS_TITLE: "Success",
  LOADING: "Loading...",
  RETRY: "Retry",
  CANCEL: "Cancel",
  OK: "OK",
} as const;
