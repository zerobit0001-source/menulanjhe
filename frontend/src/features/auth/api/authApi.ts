import { baseApi } from "@/features/api/baseApi";

import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
  SelectTenantRequest,
  SelectTenantResponse,
} from "../types/auth.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
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
      SelectTenantResponse,
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
  useSelectTenantMutation,
} = authApi;