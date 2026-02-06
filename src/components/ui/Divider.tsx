import { View, Text } from "react-native";

interface DividerProps {
  text?: string;
}

export function Divider({ text }: DividerProps) {
  return (
    <View className="flex-row items-center my-6">
      <View className="flex-1 h-px bg-border" />
      {text && <Text className="mx-4 text-text-muted">{text}</Text>}
      <View className="flex-1 h-px bg-border" />
    </View>
  );
}
