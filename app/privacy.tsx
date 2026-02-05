import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PRIVACY_POLICY } from "../src/content/legal";
import { LEGAL_STRINGS } from "../src/constants";

export default function PrivacyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 py-6"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-sm text-text-secondary mb-6">
          {LEGAL_STRINGS.LAST_UPDATED}: January 2025
        </Text>

        {PRIVACY_POLICY.map((section, index) => (
          <View key={index} className="mb-6">
            <Text className="text-lg font-semibold text-text mb-2">
              {section.title}
            </Text>
            <Text className="text-base text-text-secondary leading-6">
              {section.content}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
