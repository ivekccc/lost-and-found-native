import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ComponentSize, primary, ICON_SIZES } from "../../constants";

interface CurvedHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentProps<typeof FontAwesome>["name"];
  size?: ComponentSize;
}

const SIZE_CLASSES: Record<ComponentSize, string> = {
  sm: "pt-10 pb-8 rounded-b-[30px]",
  lg: "pt-16 pb-12 rounded-b-[40px]",
};

export function CurvedHeader({
  title,
  subtitle,
  icon,
  size = "lg",
}: CurvedHeaderProps) {
  return (
    <View
      className={`bg-primary items-center ${SIZE_CLASSES[size]}`}
      accessibilityRole="header"
    >
      {icon && (
        <View className="w-20 h-20 bg-white rounded-full items-center justify-center mb-4 shadow-lg">
          <FontAwesome name={icon} size={ICON_SIZES.lg} color={primary[500]} />
        </View>
      )}
      <Text className="text-white text-2xl font-bold">{title}</Text>
      {subtitle && (
        <Text className="text-white/70 text-base mt-2">{subtitle}</Text>
      )}
    </View>
  );
}
