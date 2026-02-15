import { View, Text, RefreshControl, FlatList } from "react-native";

import { CurvedHeader, ReportCard } from "../../src/components/ui";
import { TAB_STRINGS } from "../../src/constants/strings";
import { useReports } from "../../src/hooks/useReports";
import { ReportType } from "@lost-and-found/api";

export default function LostScreen() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useReports(
    { type: ReportType.LOST },
  );

  const handleReportPress = (reportId: number) => {
    console.log("Report pressed:", reportId);
  };

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center">
      <Text className="text-text-muted">No lost items reported yet.</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      <CurvedHeader title={TAB_STRINGS.LOST} size="sm" />

      <View className="flex-1 p-4">
        {isLoading && <Text className="text-text-muted">Loading...</Text>}

        {isError && error && (
          <Text className="text-error">Error: {error.message}</Text>
        )}

        {data && (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id!.toString()}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
            renderItem={({ item }) => (
              <ReportCard report={item} onPress={handleReportPress} />
            )}
            ListEmptyComponent={renderEmptyState}
          />
        )}
      </View>
    </View>
  );
}
