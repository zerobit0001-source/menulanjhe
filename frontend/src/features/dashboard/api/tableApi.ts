import { baseApi } from "@/features/api/baseApi";

import type {
  CreateTableRequest,
  Table,
  TableListResponse,
  UpdateTableRequest,
} from "../types/tables/tables.type";

export const tableApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query<TableListResponse, { page?: number } | void>({
      query: (params) => ({
        url: "admin/tables/",
        method: "GET",
        params: params?.page
          ? {
              page: params.page,
            }
          : undefined,
      }),

      providesTags: ["Table"],
    }),

    createTable: builder.mutation<Table, CreateTableRequest>({
      query: (body) => ({
        url: "admin/tables/",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Table"],
    }),

    updateTable: builder.mutation<
      Table,
      { id: string; body: UpdateTableRequest }
    >({
      query: ({ id, body }) => ({
        url: `admin/tables/${id}/`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["Table"],
    }),

    regenerateTableToken: builder.mutation<Table, string>({
      query: (id) => ({
        url: `admin/tables/${id}/regenerate_token/`,
        method: "POST",
      }),

      invalidatesTags: ["Table"],
    }),
    getTable: builder.query<Table, string>({
      query: (id) => ({
        url: `admin/tables/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Table", id }],
    }),
  }),
});

export const {
  useGetTablesQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useRegenerateTableTokenMutation,
  useGetTableQuery,
} = tableApi;
