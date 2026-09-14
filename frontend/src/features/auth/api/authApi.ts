import { baseApi } from "@/features/api/baseApi";

import type {
  LoginRequest,
  MeResponse,
  SelectTenantRequest,
} from "../types/auth.types";

type LoginProxyResponse = {
  ok: boolean;
};

type SelectTenantProxyResponse = {
  ok: boolean;
  tenant_id: string;
  role: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginProxyResponse, LoginRequest>({
      query: (body) => ({
        url: "auth/login/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    me: builder.query<MeResponse, void>({
      query: () => ({
        url: "auth/me/",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    selectTenant: builder.mutation<
      SelectTenantProxyResponse,
      SelectTenantRequest
    >({
      query: (body) => ({
        url: "auth/select-tenant/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useMeQuery,
  useLazyMeQuery,
  useSelectTenantMutation,
} = authApi;
