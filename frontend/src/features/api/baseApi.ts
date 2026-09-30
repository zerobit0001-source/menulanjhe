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

  console.log("========== API REQUEST ==========");
  console.log("REQUEST:", args);

  let result = await rawBaseQuery(args, api, extraOptions);

  console.log("REQUEST STATUS:", result.error?.status ?? "SUCCESS");

  if (result.error?.status === 401) {
    console.log("========== 401 DETECTED ==========");

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        console.log("========== TRY REFRESH ==========");

        const refreshResult = await rawBaseQuery(
          {
            url: "auth/refresh/",
            method: "POST",
          },
          api,
          extraOptions,
        );

        console.log(
          "REFRESH STATUS:",
          refreshResult.error?.status ?? "SUCCESS",
        );

        console.log("REFRESH DATA:", refreshResult.data);

        if (refreshResult.data) {
          console.log("✅ REFRESH SUCCESS");

          result = await rawBaseQuery(args, api, extraOptions);

          console.log("RETRY STATUS:", result.error?.status ?? "SUCCESS");
        } else {
          console.log("❌ REFRESH FAILED");

          api.dispatch(baseApi.util.invalidateTags(["Auth"]));
        }
      } finally {
        release();
      }
    } else {
      console.log("⏳ REFRESH ALREADY IN PROGRESS");

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
