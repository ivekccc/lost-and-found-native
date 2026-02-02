import { AUTH_STRINGS, LEGAL_STRINGS } from "./strings";

// ===========================================
// REGEX PATTERNS
// ===========================================

export const PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE: /^[+]?[\d\s-]{6,20}$/,
} as const;

// ===========================================
// VALIDATION RULES (React Hook Form)
// ===========================================

export const VALIDATION_RULES = {
  email: {
    required: AUTH_STRINGS.EMAIL_REQUIRED,
    pattern: {
      value: PATTERNS.EMAIL,
      message: AUTH_STRINGS.EMAIL_INVALID,
    },
  },

  password: {
    required: AUTH_STRINGS.PASSWORD_REQUIRED,
    minLength: {
      value: 6,
      message: AUTH_STRINGS.PASSWORD_MIN_LENGTH,
    },
  },

  firstName: {
    required: AUTH_STRINGS.FIRST_NAME_REQUIRED,
  },

  lastName: {
    required: AUTH_STRINGS.LAST_NAME_REQUIRED,
  },

  username: {
    required: AUTH_STRINGS.USERNAME_REQUIRED,
    minLength: {
      value: 3,
      message: AUTH_STRINGS.USERNAME_MIN_LENGTH,
    },
  },

  phoneNumber: {
    pattern: {
      value: PATTERNS.PHONE,
      message: "Invalid phone number format",
    },
  },

  termsAccepted: {
    required: LEGAL_STRINGS.TERMS_REQUIRED,
  },
} as const;
