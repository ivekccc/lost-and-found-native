export const AUTH_STRINGS = {
  REGISTER_HEADER_SUBTITLE: "Join us to find and report lost items!",
  LOGIN_HEADER_SUBTITLE: "Welcome back! Sign in to continue",
  FORGOT_PASSWORD: "Forgot Password?",
  EMAIL_PLACEHOLDER: "Email",
  PASSWORD_PLACEHOLDER: "Password",
  FIRST_NAME_PLACEHOLDER: "First Name",
  LAST_NAME_PLACEHOLDER: "Last Name",
  USERNAME_PLACEHOLDER: "Username",
  PHONE_PLACEHOLDER: "Phone Number (optional)",
  LOGIN_BUTTON: "Login",
  REGISTER_BUTTON: "Create Account",
  LOGOUT_BUTTON: "Logout",
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Invalid email format",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters",
  FIRST_NAME_REQUIRED: "First name is required",
  LAST_NAME_REQUIRED: "Last name is required",
  USERNAME_REQUIRED: "Username is required",
  USERNAME_MIN_LENGTH: "Username must be at least 3 characters",
  LOGIN_ERROR: "Login failed",
  REGISTER_ERROR: "Registration failed",
  GENERIC_ERROR: "An error occurred",
  TOKEN_SAVE_ERROR: "Failed to save authentication tokens",
  NO_ACCOUNT: "Don't have an account?",
  HAVE_ACCOUNT: "Already have an account?",
} as const;

export const VERIFY_STRINGS = {
  TITLE: "Verification Code",
  SUBTITLE_PREFIX: "We've sent a code to",
  ENTER_CODE: "Enter the 6-digit code",
  VERIFY_BUTTON: "Verify Code",
  DIDNT_RECEIVE: "Didn't receive the code?",
  RESEND_CODE: "Resend code",
  RESEND_CODE_IN: "Resend code in",
  BACK: "Back",
  CODE_REQUIRED: "Please enter the complete code",
  VERIFICATION_SUCCESS: "Registration successful",
} as const;

export const COMMON_STRINGS = {
  ERROR_TITLE: "Error",
  ERROR_GENERIC: "Something went wrong",
  SUCCESS_TITLE: "Success",
  LOADING: "Loading...",
  RETRY: "Retry",
  CANCEL: "Cancel",
  OK: "OK",
  OR: "OR",
} as const;

export const A11Y_STRINGS = {
  EMAIL_INPUT: "Enter your email address",
  PASSWORD_INPUT: "Enter your password",
  LOGIN_BUTTON: "Sign in to your account",
  GO_TO_REGISTER: "Register",
  FIRST_NAME_INPUT: "Enter your first name",
  LAST_NAME_INPUT: "Enter your last name",
  USERNAME_INPUT: "Choose a username",
  PHONE_INPUT: "Enter your phone number, optional",
  REGISTER_BUTTON: "Create your account",
  GO_TO_LOGIN: "Login",
  TERMS_CHECKBOX: "Accept terms of service and privacy policy",
  TERMS_LINK: "Open terms of service",
  PRIVACY_LINK: "Open privacy policy",
  VERIFY_CODE_INPUT: "Verification code input",
  VERIFY_BUTTON: "Verify code button",
  RESEND_CODE_BUTTON: "Resend verification code",
  BACK_BUTTON: "Go back",
} as const;

export const LEGAL_STRINGS = {
  TERMS_TITLE: "Terms of Service",
  PRIVACY_TITLE: "Privacy Policy",
  TERMS_CHECKBOX_PREFIX: "By registering, I agree to the ",
  TERMS_LINK: "Terms of Service",
  AND: " and ",
  PRIVACY_LINK: "Privacy Policy",
  TERMS_REQUIRED: "You must accept the terms to continue",
  LAST_UPDATED: "Last updated",
} as const;

export const TAB_STRINGS = {
  HOME: "Home",
  LOST: "Lost",
  CREATE: "Create",
  FOUND: "Found",
  PROFILE: "Profile",
} as const;

export const HOME_STRINGS = {
  TITLE: "Welcome!",
  SUBTITLE: "How can we help you today?",
} as const;
