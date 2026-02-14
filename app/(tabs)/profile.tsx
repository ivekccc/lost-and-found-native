import { View, Text } from "react-native";

import { CurvedHeader } from "../../src/components/ui";
import { TAB_STRINGS } from "../../src/constants/strings";

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-background">
      <CurvedHeader size="sm">
        <Text className="text-2xl font-bold text-white">{TAB_STRINGS.PROFILE}</Text>
      </CurvedHeader>
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-text-muted">Profile coming soon</Text>
      </View>
    </View>
  );
}
