import { View, Text } from "react-native";

import { CurvedHeader } from "../../src/components/ui";
import { HOME_STRINGS } from "../../src/constants/strings";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background">
      <CurvedHeader
        icon="search"
        title={HOME_STRINGS.TITLE}
        subtitle={HOME_STRINGS.SUBTITLE}
      />
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-text-muted">Home content coming soon</Text>
      </View>
    </View>
  );
}
