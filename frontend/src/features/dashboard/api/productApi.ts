import { baseApi } from "@/features/api/baseApi";

import type {
  CreateProductRequest,
  Product,
  ProductListResponse,
  UpdateProductRequest,
} from "../types/products/products.type";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductListResponse,
      {
        page?: number;
        search?: string;
        category?: string;
        is_available?: boolean;
      } | void
    >({
      query: (params) => ({
        url: "admin/products/",
        method: "GET",
        params: {
          ...(params?.page && {
            page: params.page,
          }),

          ...(params?.search && {
            search: params.search,
          }),

          ...(params?.category && {
            category: params.category,
          }),

          ...(params?.is_available !== undefined && {
            is_available: params.is_available,
          }),
        },
      }),

      providesTags: ["Product"],
    }),

    createProduct: builder.mutation<Product, CreateProductRequest>({
      query: (body) => ({
        url: "admin/products/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      Product,
      {
        id: string;
        body: UpdateProductRequest;
      }
    >({
      query: ({ id, body }) => ({
        url: `admin/products/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    toggleProductActive: builder.mutation<Product, string>({
      query: (id) => ({
        url: `admin/products/${id}/toggle_active/`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useToggleProductActiveMutation,
} = productApi;
