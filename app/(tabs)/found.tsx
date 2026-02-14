import { View, Text, ScrollView, RefreshControl } from "react-native";

import { CurvedHeader } from "../../src/components/ui";
import { TAB_STRINGS, COMMON_STRINGS } from "../../src/constants/strings";
import { useReports } from "../../src/hooks/useReports";
import { ReportType } from "@lost-and-found/api";

export default function FoundScreen() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useReports(
    { type: ReportType.FOUND },
  );

  return (
    <View className="flex-1 bg-background">
      <CurvedHeader title={TAB_STRINGS.FOUND} size="sm" />

      <ScrollView
        className="flex-1 p-4"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {isLoading && (
          <Text className="text-text-muted">{COMMON_STRINGS.LOADING}</Text>
        )}

        {isError && (
          <Text className="text-error">
            {error?.message ?? COMMON_STRINGS.ERROR_GENERIC}
          </Text>
        )}

        {data && (
          <Text className="text-text font-mono text-xs">
            {JSON.stringify(data, null, 2)}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
