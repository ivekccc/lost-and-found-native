export const ROUTES = {
  LOGIN: "login",
  REGISTER: "register",
  VERIFY: "verify",
  TABS: "(tabs)",
  TERMS: "terms",
  PRIVACY: "privacy",
} as const;

export const PUBLIC_ROUTES: readonly string[] = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.VERIFY,
  ROUTES.TERMS,
  ROUTES.PRIVACY,
];

export const AUTH_ROUTES: readonly string[] = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.VERIFY,
];

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
