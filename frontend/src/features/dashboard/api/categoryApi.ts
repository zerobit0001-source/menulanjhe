import { baseApi } from "@/features/api/baseApi";

import type {
  Category,
  CategoryListResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types/categories/categories.type";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<
      CategoryListResponse,
      {
        menu: string;
        page?: number;
      }
    >({
      query: ({ menu, page }) => ({
        url: "admin/categories/",
        method: "GET",
        params: {
          menu,
          ...(page ? { page } : {}),
        },
      }),
      providesTags: ["Category"],
    }),

    getCategory: builder.query<Category, string>({
      query: (id) => ({
        url: `admin/categories/${id}/`,
        method: "GET",
      }),

      providesTags: (_result, _error, id) => [
        { type: "Category", id },
      ],
    }),

    createCategory: builder.mutation<Category, CreateCategoryRequest>({
      query: (body) => ({
        url: "admin/categories/",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation<
      Category,
      {
        id: string;
        body: UpdateCategoryRequest;
      }
    >({
      query: ({ id, body }) => ({
        url: `admin/categories/${id}/`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        "Category",
        { type: "Category", id },
      ],
    }),

    toggleCategoryActive: builder.mutation<Category, string>({
      query: (id) => ({
        url: `admin/categories/${id}/toggle_active/`,
        method: "POST",
      }),

      invalidatesTags: (_result, _error, id) => [
        "Category",
        { type: "Category", id },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useToggleCategoryActiveMutation,
} = categoryApi;