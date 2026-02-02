import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";

import { useAuth } from "../store/AuthContext";
import { PUBLIC_ROUTES, AUTH_ROUTES, ROUTES } from "../constants/routes";

export function useAuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const currentRoute = segments[0] as string;
    const isPublicRoute = PUBLIC_ROUTES.includes(currentRoute);
    const isAuthRoute = AUTH_ROUTES.includes(currentRoute);

    if (!isAuthenticated && !isPublicRoute) {
      router.replace(`/${ROUTES.LOGIN}`);
    } else if (isAuthenticated && isAuthRoute) {
      router.replace(`/${ROUTES.TABS}`);
    }
  }, [isAuthenticated, isLoading, segments, router]);

  return { isLoading, isAuthenticated };
}
