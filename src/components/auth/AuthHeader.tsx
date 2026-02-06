import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { primary, ICON_SIZES } from "../../constants";
import { CurvedHeader } from "../ui";

interface AuthHeaderProps {
  subtitle: string;
}

export function AuthHeader({ subtitle }: AuthHeaderProps) {
  return (
    <CurvedHeader>
      <View className="w-20 h-20 bg-white rounded-full items-center justify-center mb-4 shadow-lg">
        <FontAwesome name="search" size={ICON_SIZES.lg} color={primary[500]} />
      </View>
      <Text className="text-white text-2xl font-bold">Lost & Found</Text>
      <Text className="text-white/70 text-base mt-2">{subtitle}</Text>
    </CurvedHeader>
  );
}

export default AuthHeader;
