import { baseApi } from "@/features/api/baseApi";
import { DashboardResponse } from "../types/dasboars.types";

export interface RestaurantProfile {
  public_ordering_enabled: boolean;
  [key: string]: unknown;
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => ({
        url: "admin/dashboard/",
        method: "GET",
      }),
      providesTags: ["Product", "Category", "Order"],
    }),

    getRestaurantProfile: builder.query<RestaurantProfile, void>({
      query: () => ({
        url: "admin/restaurant_profile/",
        method: "GET",
      }),
    }),

    updatePublicOrdering: builder.mutation<RestaurantProfile, boolean>({
      query: (enabled) => ({
        url: "admin/restaurant_profile/",
        method: "PATCH",
        body: {
          public_ordering_enabled: enabled,
        },
      }),
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetRestaurantProfileQuery,
  useUpdatePublicOrderingMutation,
} = dashboardApi;
