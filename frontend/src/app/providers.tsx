"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        rtl
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </Provider>
  );
}
