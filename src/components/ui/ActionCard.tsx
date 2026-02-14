import { Pressable, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { primary, semantic } from "../../constants/theme";
import { ICON_SIZES } from "../../constants/sizes";

type ActionCardVariant = "lost" | "found";

interface ActionCardProps {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  title: string;
  subtitle: string;
  onPress: () => void;
  variant?: ActionCardVariant;
}

const VARIANT_CONFIG: Record<
  ActionCardVariant,
  { iconBg: string; iconColor: string }
> = {
  lost: {
    iconBg: "bg-primary-100",
    iconColor: primary[500],
  },
  found: {
    iconBg: "bg-success/20",
    iconColor: semantic.success,
  },
};

export function ActionCard({
  icon,
  title,
  subtitle,
  onPress,
  variant = "lost",
}: ActionCardProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center bg-card rounded-xl p-4 border border-border"
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      <View
        className={`w-14 h-14 rounded-full items-center justify-center ${config.iconBg}`}
      >
        <FontAwesome name={icon} size={ICON_SIZES.md} color={config.iconColor} />
      </View>
      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold text-text">{title}</Text>
        <Text className="text-text-secondary mt-1">{subtitle}</Text>
      </View>
      <FontAwesome name="chevron-right" size={ICON_SIZES.sm} color="#9CA3AF" />
    </Pressable>
  );
}
