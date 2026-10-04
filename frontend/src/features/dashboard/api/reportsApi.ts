import { baseApi } from "@/features/api/baseApi";
import { ReportsPeriod } from "../types/reports/reports.types";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<DashboardReport, ReportsPeriod>({
      query: (period) => ({
        url: `admin/reports/?period=${period}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetReportsQuery } = reportsApi;
