import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { CurvedHeader, ActionCard } from "../../src/components/ui";
import { HOME_STRINGS } from "../../src/constants/strings";

export default function HomeScreen() {
  const handleLostPress = () => {
    router.push("/lost");
  };

  const handleFoundPress = () => {
    router.push("/found");
  };

  return (
    <View className="flex-1 bg-background">
      <CurvedHeader
        icon="search"
        title={HOME_STRINGS.TITLE}
        subtitle={HOME_STRINGS.SUBTITLE}
      />
      <View className="flex-1 items-center" style={styles.cardsContainer}>
        <View className="w-[90%]" style={styles.cardWrapper}>
          <ActionCard
            icon="search-minus"
            title={HOME_STRINGS.LOST_TITLE}
            subtitle={HOME_STRINGS.LOST_SUBTITLE}
            variant="lost"
            onPress={handleLostPress}
          />
        </View>
        <View className="w-[90%]">
          <ActionCard
            icon="search-plus"
            title={HOME_STRINGS.FOUND_TITLE}
            subtitle={HOME_STRINGS.FOUND_SUBTITLE}
            variant="found"
            onPress={handleFoundPress}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    paddingTop: 64,
  },
  cardWrapper: {
    marginBottom: 24,
  },
});
