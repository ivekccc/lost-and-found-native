import "../global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthGuard } from "../src/hooks";
import { AuthProvider } from "../src/store/AuthContext";
import { MessageProvider } from "../src/store/MessageContext";
import { toastConfig } from "../src/components/toast";
import { FullScreenLoader } from "../src/components/ui";
import { ROUTES, LEGAL_STRINGS } from "../src/constants";

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isLoading } = useAuthGuard();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name={ROUTES.LOGIN} options={{ headerShown: false }} />
        <Stack.Screen name={ROUTES.REGISTER} options={{ headerShown: false }} />
        <Stack.Screen name={ROUTES.TABS} options={{ headerShown: false }} />
        <Stack.Screen
          name={ROUTES.TERMS}
          options={{ title: LEGAL_STRINGS.TERMS_TITLE }}
        />
        <Stack.Screen
          name={ROUTES.PRIVACY}
          options={{ title: LEGAL_STRINGS.PRIVACY_TITLE }}
        />
      </Stack>
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <MessageProvider>
        <RootLayoutNav />
      </MessageProvider>
    </AuthProvider>
  );
}
