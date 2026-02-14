import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "../api";
import { ReportParams } from "../api/reports.api";

export const useReports = (params?: ReportParams) => {
  return useQuery({
    queryKey: ["reports", params],
    queryFn: async () => {
      const response = await reportsApi.getReports(params);
      return response.data;
    },
  });
};
