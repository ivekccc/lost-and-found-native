import { ActivityIndicator, View } from "react-native";

export function FullScreenLoader() {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}
