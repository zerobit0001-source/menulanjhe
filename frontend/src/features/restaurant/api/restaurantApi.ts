import { baseApi } from "@/features/api/baseApi";

import type {
  BranchListResponse,
  CreateBranchRequest,
  RestaurantProfileResponse,
  UpdateBranchRequest,
  UpdateRestaurantProfileRequest,
} from "../types/restaurant.types";

export const restaurantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurantProfile: builder.query<
      RestaurantProfileResponse,
      void
    >({
      query: () => ({
        url: "admin/restaurant_profile/",
        method: "GET",
      }),
      providesTags: ["Restaurant"],
    }),

    updateRestaurantProfile: builder.mutation<
      RestaurantProfileResponse,
      UpdateRestaurantProfileRequest
    >({
      query: (body) => ({
        url: "admin/restaurant_profile/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Restaurant"],
    }),

    getBranches: builder.query<
      BranchListResponse,
      { page?: number } | void
    >({
      query: (params) => ({
        url: "admin/branches/",
        method: "GET",
        params: params?.page
          ? {
              page: params.page,
            }
          : undefined,
      }),
      providesTags: ["Branch"],
    }),

    createBranch: builder.mutation<
      unknown,
      CreateBranchRequest
    >({
      query: (body) => ({
        url: "admin/branches/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Branch"],
    }),

    updateBranch: builder.mutation<
      unknown,
      {
        id: string;
        body: UpdateBranchRequest;
      }
    >({
      query: ({ id, body }) => ({
        url: `admin/branches/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Branch"],
    }),
  }),
});

export const {
  useGetRestaurantProfileQuery,
  useUpdateRestaurantProfileMutation,
  useGetBranchesQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
} = restaurantApi;