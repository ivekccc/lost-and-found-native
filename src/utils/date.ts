import { REPORT_STRINGS } from "../constants";

export function formatDate(date: Date | string | undefined): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const now = new Date();
  const diffTime = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return REPORT_STRINGS.TODAY;
  if (diffDays === 1) return REPORT_STRINGS.YESTERDAY;
  if (diffDays < 7) return `${diffDays} ${REPORT_STRINGS.DAYS_AGO}`;
  return dateObj.toLocaleDateString();
}
