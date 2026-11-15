"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";
import { sileo, Toaster } from "sileo";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Toaster
        position="top-center"
        theme="light"
        options={{
          duration: 3000,
        }}
      />

      {children}
      {/*<ToastContainer
        position="top-right"
        autoClose={4000}
        rtl
        newestOnTop
        closeOnClick
        pauseOnHover
      />*/}
    </Provider>
  );
}
