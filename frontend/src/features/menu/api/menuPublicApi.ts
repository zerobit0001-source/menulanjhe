import { baseApi } from "@/features/api/baseApi";
import { CreateOrderRequest, CreateOrderResponse } from "../types/order.types";
import { PublicMenuResponse } from "../types/public-menu.types";

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
