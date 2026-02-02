export const ROUTES = {
  LOGIN: "login",
  REGISTER: "register",
  TABS: "(tabs)",
  TERMS: "terms",
  PRIVACY: "privacy",
} as const;

export const PUBLIC_ROUTES: readonly string[] = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.TERMS,
  ROUTES.PRIVACY,
];

export const AUTH_ROUTES: readonly string[] = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
];

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
