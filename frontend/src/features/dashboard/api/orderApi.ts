import { baseApi } from "@/features/api/baseApi";

import type {
  Order,
  OrderListResponse,
  OrderStatus,
} from "../types/orders/orders.types";

type GetOrdersParams = {
  status?: OrderStatus;
  branch?: string;
  page?: number;
};

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrderListResponse, GetOrdersParams | void>({
      query: (params) => ({
        url: "admin/orders/",
        method: "GET",
        params: {
          ...(params?.status && {
            status: params.status,
          }),
          ...(params?.branch && {
            branch: params.branch,
          }),
          ...(params?.page && {
            page: params.page,
          }),
        },
      }),
      providesTags: ["Order"],
    }),

    confirmOrder: builder.mutation<Order, string>({
      query: (id) => ({
        url: `admin/orders/${id}/confirm/`,
        method: "POST",
      }),
      invalidatesTags: ["Order"],
    }),

    completeOrder: builder.mutation<Order, string>({
      query: (id) => ({
        url: `admin/orders/${id}/complete/`,
        method: "POST",
      }),
      invalidatesTags: ["Order"],
    }),

    cancelOrder: builder.mutation<Order, string>({
      query: (id) => ({
        url: `admin/orders/${id}/cancel/`,
        method: "POST",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useConfirmOrderMutation,
  useCompleteOrderMutation,
  useCancelOrderMutation,
} = orderApi;