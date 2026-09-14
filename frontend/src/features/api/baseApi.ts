import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/",
  }),

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
