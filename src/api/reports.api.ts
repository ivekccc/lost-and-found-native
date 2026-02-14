import {
  ReportDetailsDTO,
  ReportListDTO,
  ReportType,
} from "@lost-and-found/api";
import http from "./http";

export interface ReportParams {
  type?: ReportType;
}

export const reportsApi = {
  getReports: (params?: ReportParams) =>
    http.get<ReportListDTO[]>("/reports", { params }),
  getReportById: (reportId: number) =>
    http.get<ReportDetailsDTO>(`/reports/${reportId}`),
};
