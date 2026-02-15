import {
  ICON_SIZES,
  lightTheme,
  primary,
  REPORT_STRINGS,
  semantic,
} from "@/src/constants";
import { formatDate } from "../../utils/date";
import { FontAwesome } from "@expo/vector-icons";
import { ReportListDTO, ReportStatus, ReportType } from "@lost-and-found/api";
import { Pressable, Text, View } from "react-native";

interface ReportCardProps {
  report: ReportListDTO;
  onPress: (reportId: number) => void;
}

const TYPE_CONFIG: Record<
  ReportType,
  { badgeBg: string; badgeText: string; iconBg: string; iconColor: string }
> = {
  [ReportType.LOST]: {
    badgeBg: "bg-primary-100",
    badgeText: "text-primary-700",
    iconBg: "bg-primary-100",
    iconColor: primary[500],
  },
  [ReportType.FOUND]: {
    badgeBg: "bg-success/20",
    badgeText: "text-success",
    iconBg: "bg-success/20",
    iconColor: semantic.success,
  },
};

const STATUS_CONFIG: Record<
  ReportStatus,
  { bg: string; text: string; label: string }
> = {
  [ReportStatus.ACTIVE]: {
    bg: "bg-success/20",
    text: "text-success",
    label: REPORT_STRINGS.STATUS_ACTIVE,
  },
  [ReportStatus.RESOLVED]: {
    bg: "bg-info/20",
    text: "text-info",
    label: REPORT_STRINGS.STATUS_RESOLVED,
  },
  [ReportStatus.EXPIRED]: {
    bg: "bg-text-muted/20",
    text: "text-text-muted",
    label: REPORT_STRINGS.STATUS_EXPIRED,
  },
  [ReportStatus.FLAGGED]: {
    bg: "bg-warning/20",
    text: "text-warning",
    label: REPORT_STRINGS.STATUS_FLAGGED,
  },
  [ReportStatus.DELETED]: {
    bg: "bg-error/20",
    text: "text-error",
    label: "Deleted",
  },
};

export function ReportCard({ report, onPress }: ReportCardProps) {
  const typeConfig = TYPE_CONFIG[report.type ?? ReportType.LOST];
  const statusConfig = STATUS_CONFIG[report.status ?? ReportStatus.ACTIVE];

  return (
    <Pressable
      onPress={() => onPress(report.id!)}
      className="bg-card rounded-xl p-4 border border-border mb-3"
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      accessibilityRole="button"
      accessibilityLabel={`${report.type} item: ${report.title}`}
    >
      <View className="flex-row items-start">
        <View className="flex-1 ml-3">
          <Text className="text-base font-semibold text-text">
            {report.title}
          </Text>
        </View>
        <View className={`px-2 py-1 rounded-full ${typeConfig.badgeBg}`}>
          <Text className={`text-xs font-medium ${typeConfig.badgeText}`}>
            {report.type === "LOST" ? "Lost" : "Found"}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center mt-3 pt-3 border-t border-border-light">
        <View className="flex-row items-center flex-1">
          <FontAwesome
            name="map-marker"
            size={ICON_SIZES.sm}
            color={lightTheme.textMuted}
          />
          <Text className="text-sm text-text-muted ml-1.5" numberOfLines={1}>
            {report.location || REPORT_STRINGS.NO_LOCATION}
          </Text>
        </View>

        <View className="flex-row items-center ml-3">
          <FontAwesome
            name="clock-o"
            size={ICON_SIZES.sm}
            color={lightTheme.textMuted}
          />
          <Text className="text-sm text-text-muted ml-1.5">
            {formatDate(report.createdAt)}
          </Text>
        </View>

        {report.status && report.status !== ReportStatus.ACTIVE && (
          <View className={`px-2 py-0.5 rounded-full ml-3 ${statusConfig.bg}`}>
            <Text className={`text-xs ${statusConfig.text}`}>
              {statusConfig.label}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
