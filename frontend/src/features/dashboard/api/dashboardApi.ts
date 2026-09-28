import { baseApi } from "@/features/api/baseApi";
import { DashboardResponse } from "../types/dasboars.types";


export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => ({
        url: "admin/dashboard/",
        method: "GET",
      }),
      providesTags: ["Product", "Category", "Order"],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
