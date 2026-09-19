import { baseApi } from "@/features/api/baseApi";

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

    createMenu: builder.mutation<Menu, CreateMenuRequest>({
      query: (body) => ({
        url: "admin/menus/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Menu"],
    }),

    updateMenu: builder.mutation<Menu, { id: string; body: UpdateMenuRequest }>(
      {
        query: ({ id, body }) => ({
          url: `admin/menus/${id}/`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["Menu"],
      },
    ),
  }),
});

export const {
  useGetMenusQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
} = menuApi;
