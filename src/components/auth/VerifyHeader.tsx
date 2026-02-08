import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { CurvedHeader } from "../ui";
import { VERIFY_STRINGS, A11Y_STRINGS } from "../../constants";
import { primary } from "../../constants/theme";

interface VerifyHeaderProps {
  email: string;
}

export function VerifyHeader({ email }: VerifyHeaderProps) {
  return (
    <CurvedHeader size="sm">
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center mb-6"
        accessibilityLabel={A11Y_STRINGS.BACK_BUTTON}
      >
        <FontAwesome name="arrow-left" size={16} color="white" />
        <Text className="text-white ml-2 font-medium">
          {VERIFY_STRINGS.BACK}
        </Text>
      </TouchableOpacity>

      <View className="items-center">
        <View className="w-16 h-16 bg-white rounded-full items-center justify-center mb-4">
          <FontAwesome name="envelope" size={28} color={primary[500]} />
        </View>
        <Text className="text-white text-2xl font-bold mb-2">
          {VERIFY_STRINGS.TITLE}
        </Text>
        <Text className="text-white/80 text-center">
          {VERIFY_STRINGS.SUBTITLE_PREFIX}
        </Text>
        <Text className="text-white font-semibold">{email}</Text>
      </View>
    </CurvedHeader>
  );
}
