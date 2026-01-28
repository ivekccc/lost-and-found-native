export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 4000,
} as const;

export const TOAST_POSITION = "top" as const;

export const TOAST_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
} as const;

export type ToastType = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];
