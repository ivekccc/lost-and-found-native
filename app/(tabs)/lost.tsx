import { View, Text } from "react-native";

import { CurvedHeader } from "../../src/components/ui";
import { TAB_STRINGS } from "../../src/constants/strings";

export default function LostScreen() {
  return (
    <View className="flex-1 bg-background">
      <CurvedHeader title={TAB_STRINGS.LOST} size="sm" />
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-text-muted">Lost items coming soon</Text>
      </View>
    </View>
  );
}
