import { baseApi } from "@/features/api/baseApi";

type ResolveTableResponse = {
  ok: boolean;
  table_id: string;
  table_name: string;
  branch_id: string;
};

type CreateTableSessionRequest = {
  qr_token: string;
};

type CreateTableSessionResponse = {
  ok: boolean;
  session_token: string;
};

export const tableSessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resolveTable: builder.query<
      ResolveTableResponse,
      string
    >({
      query: (qrToken) => ({
        url: `public/tables/resolve/${qrToken}/`,
        method: "GET",
      }),
    }),

    createTableSession: builder.mutation<
      CreateTableSessionResponse,
      CreateTableSessionRequest
    >({
      query: (body) => ({
        url: "public/table_sessions/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyResolveTableQuery,
  useCreateTableSessionMutation,
} = tableSessionApi;
