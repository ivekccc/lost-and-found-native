import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "../../src/components/expo";
import { Colors } from "../../src/constants/theme";
import { TAB_STRINGS } from "../../src/constants/strings";
import { ICON_SIZES } from "../../src/constants/sizes";
import { useColorScheme } from "../../src/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 70 + insets.bottom,
          paddingTop: 10,
          paddingBottom: insets.bottom + 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: TAB_STRINGS.HOME,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={ICON_SIZES.md} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lost"
        options={{
          title: TAB_STRINGS.LOST,
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="search-minus"
              size={ICON_SIZES.md}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: TAB_STRINGS.CREATE,
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="plus-circle"
              size={ICON_SIZES.md}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="found"
        options={{
          title: TAB_STRINGS.FOUND,
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="search-plus"
              size={ICON_SIZES.md}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: TAB_STRINGS.PROFILE,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={ICON_SIZES.md} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
