import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/api/v1/",
});

const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await rawBaseQuery(
          {
            url: "auth/refresh/",
            method: "POST",
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          api.dispatch(baseApi.util.invalidateTags(["Auth"]));
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();

      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithReauth,

  tagTypes: [
    "Auth",
    "Restaurant",
    "Branch",
    "Menu",
    "Category",
    "Product",
    "Table",
    "Order",
  ],

  endpoints: () => ({}),
});
