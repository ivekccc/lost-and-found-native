import { View, Text } from "react-native";

import { CurvedHeader } from "../../src/components/ui";
import { TAB_STRINGS } from "../../src/constants/strings";

export default function FoundScreen() {
  return (
    <View className="flex-1 bg-background">
      <CurvedHeader size="sm">
        <Text className="text-2xl font-bold text-white">{TAB_STRINGS.FOUND}</Text>
      </CurvedHeader>
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-text-muted">Found items coming soon</Text>
      </View>
    </View>
  );
}
