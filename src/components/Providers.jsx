"use client";
import store from "@/lib/Store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
}
