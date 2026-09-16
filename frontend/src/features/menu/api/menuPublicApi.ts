import { baseApi } from "@/features/api/baseApi";
import { PublicMenuResponse } from "../types/menu.types";
import { CreateOrderRequest, CreateOrderResponse } from "../types/order.types";

export const publicMenuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicMenu: builder.query<PublicMenuResponse, string>({
      query: (slug) => ({
        url: `public/menus/${slug}/`,
        method: "GET",
      }),
    }),
    createPublicOrder: builder.mutation<CreateOrderResponse,CreateOrderRequest>({
      query: (body) => ({
        url: "public/orders/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetPublicMenuQuery , useCreatePublicOrderMutation } = publicMenuApi;
