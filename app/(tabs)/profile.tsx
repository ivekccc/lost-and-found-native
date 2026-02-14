import { View, Text } from "react-native";

import { CurvedHeader, Button } from "../../src/components/ui";
import { TAB_STRINGS, AUTH_STRINGS } from "../../src/constants/strings";
import { useMessage } from "../../src/store/MessageContext";
import { authService } from "../../src/services";

export default function ProfileScreen() {
  const { confirm } = useMessage();

  const handleLogout = async () => {
    const confirmed = await confirm({
      title: AUTH_STRINGS.LOGOUT_BUTTON,
      message: "Are you sure you want to logout?",
      confirmText: "Yes",
      cancelText: "No",
    });
    if (confirmed) {
      await authService.logout();
    }
  };

  return (
    <View className="flex-1 bg-background">
      <CurvedHeader title={TAB_STRINGS.PROFILE} size="sm" />
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-text-muted mb-8">Profile coming soon</Text>
        <Button title={AUTH_STRINGS.LOGOUT_BUTTON} onPress={handleLogout} variant="outline" />
      </View>
    </View>
  );
}
