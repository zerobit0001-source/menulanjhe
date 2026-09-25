import { baseApi } from "@/features/api/baseApi";

import type {
  Menu,
  MenuListResponse,
  UpdateMenuRequest,
} from "@/features/dashboard/types/menu/menu.type";

export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query<MenuListResponse, { page?: number } | void>({
      query: (params) => ({
        url: "admin/menus/",
        method: "GET",
        params: params?.page ? { page: params.page } : undefined,
      }),
      providesTags: ["Menu"],
    }),

    getMenu: builder.query<Menu, string>({
      query: (id) => ({
        url: `admin/menus/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Menu", id }],
    }),

    updateMenu: builder.mutation<
      Menu,
      {
        id: string;
        body: UpdateMenuRequest;
      }
    >({
      query: ({ id, body }) => ({
        url: `admin/menus/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Menu",
        { type: "Menu", id },
      ],
    }),
  }),
});

export const { useGetMenusQuery, useGetMenuQuery, useUpdateMenuMutation } =
  menuApi;
