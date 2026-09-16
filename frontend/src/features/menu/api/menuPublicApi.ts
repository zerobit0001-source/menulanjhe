import { baseApi } from "@/features/api/baseApi";
import { PublicMenuResponse } from "../types/menu.types";

export const publicMenuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicMenu: builder.query<PublicMenuResponse, string>({
      query: (slug) => ({
        url: `public/menus/${slug}/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPublicMenuQuery } = publicMenuApi;
